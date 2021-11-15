import { ErrorResponse, IError, mapToErrorResponse } from "./error";

export class HttpClient {
  private static apiUrl = "http://localhost:8080";

  public async get<T>(url: string): Promise<T> {
    return this.send(url, "GET", undefined);
  }

  public async post<T>(url: string, data: any): Promise<T> {
    return this.send(url, "POST", data);
  }

  public async put<T>(url: string, data: any): Promise<T> {
    return this.send(url, "PUT", data);
  }

  public async delete<T>(url: string): Promise<T> {
    return this.send(url, "PUT", undefined);
  }

  public async send<T>(
    url: string,
    method: "POST" | "PUT" | "GET" | "DELETE",
    data?: any
  ): Promise<T> {
    url = this.prepareUrl(url);
    const headers = new Headers();

    headers.append("Content-Type", "application/json");

    try {
      const response = await fetch(url, {
        method,
        body: data ? JSON.stringify(data) : undefined,
        headers,
        credentials: "include",
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

  private async handleResponse<T>(response: Response): Promise<T> {
    const data: T | IError = await response.json();

    if (response.ok) {
      return data as T;
    }

    throw new ErrorResponse(data as IError);
  }
}

export const httpClient = new HttpClient();
