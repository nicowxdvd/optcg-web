import { API_URL } from "./config";

export class ApiError extends Error {
  status : number;
  body   : unknown;



  constructor(status: number, body: unknown) {
    super(`Error ${status} en la API`);
    this.name   = "ApiError";
    this.status = status;
    this.body   = body;
  }
}



type RequestOptions = Omit<RequestInit, "body" | "headers"> & {
  body?    : unknown;
  headers? : Record<string, string>;
};



async function parseBody(res: Response): Promise<unknown> {
  const text = await res.text();
  if (!text) return undefined;
  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}



async function request<T>(path: string, { body, headers, ...init }: RequestOptions = {}): Promise<T> {
  const hasBody = body !== undefined;

  const res = await fetch(`${API_URL}${path}`, {
    ...init,
    headers: {
      Accept: "application/json", ...(hasBody && { "Content-Type": "application/json" }),...headers,
    },
    body: hasBody ? JSON.stringify(body) : undefined,
  });

  const data = await parseBody(res);
  if (!res.ok) 
    throw new ApiError(res.status, data);

  return data as T;
}


export const api = {
  get    : <T>(path: string, options?: RequestOptions) => request<T>(path, { ...options, method: "GET" }),
  post   : <T>(path: string, body?: unknown, options?: RequestOptions) => request<T>(path, { ...options, method: "POST", body }),
  put    : <T>(path: string, body?: unknown, options?: RequestOptions) => request<T>(path, { ...options, method: "PUT", body }),
  delete : <T>(path: string, options?: RequestOptions) => request<T>(path, { ...options, method: "DELETE" }),
};