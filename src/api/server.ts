export const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

// Auth
export const isAuthUrl = (address: string) => {
  return `${apiBaseUrl}/auth/isAuthenticated/${address}`;
};
export const nonceUrl = `${apiBaseUrl}/auth/nonce`;
export const signInUrl = `${apiBaseUrl}/auth/sign-in`;

// Releases
export const createReleaseURl = `${apiBaseUrl}/releases`;

// Uploads
export const uploadsURl = `${apiBaseUrl}/uploads`;

// Genres
export const genresURl = `${apiBaseUrl}/genres`;

//Users
export const usersURl = `${apiBaseUrl}/users`;
export const getUserUrl = (id: string) => `${usersURl}/${id}`;
