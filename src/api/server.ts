export const serverBaseURL = "http://localhost:5555/api";

// Releases
export const createReleaseURl = `${serverBaseURL}/releases`;

// Uploads
export const uploadsURl = `${serverBaseURL}/uploads`;

// Genres
export const genresURl = `${serverBaseURL}/genres`;

//Users
export const usersURl = `${serverBaseURL}/users`;
export const getUserUrl = (id: string) => `${usersURl}/${id}`;
