import { ErrorResponse, IError, mapToErrorResponse } from "./error";

export class HttpClient {
  private static apiUrl = "http://localhost:8080";

  constructor(private username: string, private password: string) {}

  public async get<T>(
    url: string,
    requireAuthorization: boolean = true
  ): Promise<T> {
    return this.send(url, "GET", undefined, requireAuthorization);
  }

  public async post<T>(
    url: string,
    data: any,
    requireAuthorization: boolean = true
  ): Promise<T> {
    return this.send(url, "POST", data, requireAuthorization);
  }

  public async put<T>(
    url: string,
    data: any,
    requireAuthorization: boolean = true
  ): Promise<T> {
    return this.send(url, "PUT", data, requireAuthorization);
  }

  public async delete<T>(
    url: string,
    requireAuthorization: boolean = true
  ): Promise<T> {
    return this.send(url, "PUT", undefined, requireAuthorization);
  }

  public async send<T>(
    url: string,
    method: "POST" | "PUT" | "GET" | "DELETE",
    data?: any,
    requireAuthorization: boolean = true
  ): Promise<T> {
    url = this.prepareUrl(url);
    const headers = requireAuthorization
      ? this.authorizationHeaders()
      : new Headers();

    headers.append("Content-Type", "application/json");

    try {
      const response = await fetch(url, {
        method,
        body: data ? JSON.stringify(data) : undefined,
        headers,
      });
      return await this.handleResponse(response);
    } catch (e) {
      if (e instanceof ErrorResponse) {
        throw e;
      }
      throw mapToErrorResponse(e, url);
    }
  }

  private prepareUrl(url: string) {
    return HttpClient.apiUrl + url;
  }

  private authorizationHeaders() {
    if (this.username.length === 0 || this.password.length === 0) {
      throw new Error("User not logged in!");
    }

    const headers = new Headers();
    headers.append("Authorization", ``);

    return headers;
  }

  private async handleResponse<T>(response: Response): Promise<T> {
    const data: T | IError = await response.json();

    if (response.ok) {
      return data as T;
    }

    throw new ErrorResponse(data as IError);
  }
}
