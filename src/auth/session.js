let csrfToken = "";

export const setCsrfToken = (token) => {
  csrfToken = token || "";
};

export const getCsrfToken = () => csrfToken;

export const clearCsrfToken = () => {
  csrfToken = "";
};
