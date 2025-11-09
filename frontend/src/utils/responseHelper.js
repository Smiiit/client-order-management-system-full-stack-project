// src/utils/responseHelper.js

/**
 * Extract token from various response structures
 * Supports multiple backend response formats
 */
export const extractToken = (response) => {
  const data = response.data || response;

  // Try different possible token field names
  return (
    data.token ||
    data.accessToken ||
    data.access_token ||
    data.jwt ||
    data.data?.token ||
    data.data?.accessToken ||
    null
  );
};

/**
 * Extract user from various response structures
 * Supports multiple backend response formats
 */
export const extractUser = (response) => {
  const data = response.data || response;

  // Try different possible user field names
  return (
    data.user || data.data?.user || data.data || (data.id ? data : null) // If response itself has an id, it might be the user object
  );
};

/**
 * Parse and log API response for debugging
 */
export const debugResponse = (response, context = "") => {
  console.group(`🔍 API Response Debug${context ? ` - ${context}` : ""}`);
  console.log("Full Response:", response);
  console.log("Response Data:", response.data || response);
  console.log("Extracted Token:", extractToken(response));
  console.log("Extracted User:", extractUser(response));
  console.groupEnd();

  return response;
};

/**
 * Validate authentication response
 */
export const validateAuthResponse = (response) => {
  const token = extractToken(response);
  const user = extractUser(response);

  if (!token) {
    throw new Error(
      "No authentication token found in response. Please check your backend API response structure."
    );
  }

  if (!user) {
    console.warn(
      "⚠️ No user data found in response. Token will be stored but user data is missing."
    );
  }

  return { token, user };
};
