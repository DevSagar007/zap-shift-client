# Taste

## Communication

- When reporting a bug, wants the assistant to look at the actual data/UI being rendered and act on it directly (make the fix), rather than deliver a long theory of the root cause and end with a "which option do you want?" question. Confidence: 0.55

## Data Fetching

- Prefers filtering data server-side via backend query params (e.g. `status`, `district`, `workStatus`) instead of fetching all records and filtering in the client. Confidence: 0.7
- Wants API calls written as the exact inline query-string call they specify (e.g. `axiosSecure.get(\`/parcels/riders?riderEmail=${user.email}&deliveryStatus=rider-assigned\`)`) rather than refactored into an axios `params` object; when pushing back, point out the mismatch (endpoint/status string) and ask instead of silently changing their call. Confidence: 0.6
