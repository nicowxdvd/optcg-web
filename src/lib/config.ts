const apiUrl = process.env.NEXT_PUBLIC_API_URL;

if (!apiUrl)
  throw new Error("Falta la variable de entorno NEXT_PUBLIC_API_URL");

export const API_URL = apiUrl;
