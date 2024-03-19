import axiosInstance from './Interceptor';
import  { AxiosRequestConfig, AxiosResponse } from 'axios';

export async function get<T>(url: string, headers: AxiosRequestConfig['headers'] = {}): Promise<AxiosResponse<T>> {
  return await axiosInstance.get<T>(url, { headers });
}

export async function post<T>(url: string, body: any, headers: AxiosRequestConfig['headers'] = {}): Promise<AxiosResponse<T>> {
  return await axiosInstance.post<T>(url, body, { headers });
}

export async function put<T>(url: string, body: any, headers: AxiosRequestConfig['headers'] = {}): Promise<AxiosResponse<T>> {
  return await axiosInstance.put<T>(url, body, { headers });
}

export async function patch<T>(url: string, body: any, headers: AxiosRequestConfig['headers'] = {}): Promise<AxiosResponse<T>> {
  return await axiosInstance.patch<T>(url, body, { headers });
}

export async function deleteApi<T>(url: string, body: any, headers: AxiosRequestConfig['headers'] = {}): Promise<AxiosResponse<T>> {
  return await axiosInstance.delete<T>(url, { data: body, headers });
}
