import { ErrorResponse, IError, mapToErrorResponse } from "./error";
import { IParams } from "./types";

type ContentType = "application/json" | "multipart/form-data";

export class HttpClient {
  private static apiUrl = "http://localhost:8080";

  public async get<T>(url: string, params?: IParams): Promise<T> {
    return this.send(url, "GET", undefined, undefined, params);
  }

  public async post<T>(
    url: string,
    data: any,
    contentType = "application/json" as ContentType
  ): Promise<T> {
    return this.send(url, "POST", data, contentType);
  }

  public async put<T>(
    url: string,
    data: any,
    contentType = "application/json" as ContentType
  ): Promise<T> {
    return this.send(url, "PUT", data, contentType);
  }

  public async delete<T>(url: string): Promise<T> {
    return this.send(url, "PUT", undefined);
  }

  public async send<T>(
    url: string,
    method: "POST" | "PUT" | "GET" | "DELETE",
    data?: any,
    contentType = "application/json" as ContentType,
    params?: IParams
  ): Promise<T> {
    url = this.prepareUrl(url);
    if (params) {
      const urlParams = this.mapParams(params);
      if (urlParams.length > 0) {
        url += `?${urlParams.join("&")}`;
      }
    }

    const headers = new Headers();

    if (contentType === "application/json") {
      headers.append("Content-Type", "application/json");
    }

    const body = this.getBody(contentType, data);

    try {
      const response = await fetch(url, {
        method,
        body,
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

  private getBody(contentType: ContentType, data?: any) {
    if (!data) {
      return undefined;
    }
    if (contentType === "application/json") {
      return JSON.stringify(data);
    }
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (value instanceof Blob) {
        formData.append(key, value);
      } else {
        formData.append(key, value as string);
      }
    });
    return formData;
  }

  private async handleResponse<T>(response: Response): Promise<T> {
    const data: T | IError = await response.json();

    if (response.ok) {
      return data as T;
    }

    throw new ErrorResponse(data as IError);
  }

  private mapParams(params: any) {
    return Object.entries(params)
      .map(([key, v]) => {
        const value = v as string;
        if (!value || typeof value === "object") {
          return undefined;
        }

        return `${encodeURI(key)}=${encodeURI(value)}`;
      })
      .filter((e) => !!e);
  }
}

export const httpClient = new HttpClient();
