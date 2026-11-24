import { useState } from "react";

export const DEFAULT_PAGE_LIMIT = 12;

const FALLBACK_META = {
  total: 0,
  page: 1,
  limit: DEFAULT_PAGE_LIMIT,
  totalPages: 1,
  hasServerPagination: false,
};

function getHeader(headers, key) {
  if (typeof headers?.get === "function") {
    return headers.get(key);
  }

  return headers?.[key] ?? headers?.[key.toLowerCase()];
}

function toPositiveNumber(value, fallback) {
  const parsed = Number.parseInt(value, 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
}

export function readPagination(headers, fallback = FALLBACK_META) {
  const rawTotal = getHeader(headers, "X-Total-Count");
  const rawPage = getHeader(headers, "X-Page");
  const rawLimit = getHeader(headers, "X-Limit");
  const rawTotalPages = getHeader(headers, "X-Total-Pages");
  const hasServerPagination = [rawTotal, rawPage, rawLimit, rawTotalPages].some(
    (value) => value !== undefined && value !== null && value !== "",
  );

  return {
    total: toPositiveNumber(rawTotal, fallback.total ?? 0),
    page: toPositiveNumber(rawPage, fallback.page ?? 1),
    limit: toPositiveNumber(rawLimit, fallback.limit ?? DEFAULT_PAGE_LIMIT),
    totalPages: toPositiveNumber(
      rawTotalPages,
      fallback.totalPages ?? 1,
    ),
    hasServerPagination,
  };
}

export function paginatedResult(response, fallback = {}) {
  const page = fallback.page ?? 1;
  const limit = fallback.limit ?? DEFAULT_PAGE_LIMIT;
  const rows = Array.isArray(response?.data) ? response.data : [];
  const meta = readPagination(response?.headers, { page, limit });

  if (!meta.hasServerPagination) {
    const total = rows.length;
    const start = (page - 1) * limit;

    return {
      items: rows.slice(start, start + limit),
      meta: {
        total,
        page,
        limit,
        totalPages: Math.max(1, Math.ceil(total / limit)),
        hasServerPagination: false,
      },
    };
  }

  return { items: rows, meta };
}

export function paginatedUrl(path, params = {}, pagination = {}) {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      searchParams.set(key, String(value));
    }
  });

  searchParams.set("page", String(pagination.page ?? 1));
  searchParams.set("limit", String(pagination.limit ?? DEFAULT_PAGE_LIMIT));

  return `${path}?${searchParams.toString()}`;
}

export function useServerPagination() {
  const [page, setPage] = useState(1);

  return { page, setPage, limit: DEFAULT_PAGE_LIMIT };
}
