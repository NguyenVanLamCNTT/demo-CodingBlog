import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams} from '@angular/common/http';
import {TokenCookieService} from '../auth/token-cookie.service';
import * as _ from 'lodash';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private httpClient: HttpClient,
    private  tokenCookieService: TokenCookieService
  ) { }
  // @ts-ignore
  public setHeaders(headers?: any): HttpHeaders {
    const token = 'Bearer ' + this.tokenCookieService.getToken();
    // tslint:disable-next-line:prefer-const
    let httpHeaders;
    if (token) {
      try {
        httpHeaders = new HttpHeaders(_.assign({
          'Content-Type': 'application/json; charset=utf-8',
          Authorization: token
        }, headers));
      }catch (error) {
        console.log(error);
      }
    }
    // @ts-ignore
    return httpHeaders;
  }
  public setHeadersFormData(headers?: any): HttpHeaders {
    const token = '';
    let httpHeaders;
    if (token){
      try {
        httpHeaders = new HttpHeaders(_.assign({
          'Content-Type': 'multipart/form-data',
          Authorization: token
        }, headers));
      } catch (error) {
        console.log(error);
      }
    }
    // @ts-ignore
    return httpHeaders;
  }
  public setUrlEncodeHeaders(headers?: any): HttpHeaders {
    const token = '';
    let httpHeaders;
    if (token) {
      try {
        httpHeaders = new HttpHeaders(_.assign({
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: token
        }, headers));
      } catch (error) {
        console.log(error);
      }
    }
    // @ts-ignore
    return httpHeaders;
  }
  // tslint:disable-next-line:typedef
  private errorHandler(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred: ', error.error.message);
    }
    else {
      return throwError(error);
    }
    return throwError('Something went wrong!');
  }
  public post(path: string, body: any, customHeader?: any): Observable<any>{
    return this.httpClient.post<any>(
      path, body,
      {
        headers: this.setHeaders(customHeader),
        withCredentials: false,
        observe: 'response'
      }
    ).pipe(
      catchError(this.errorHandler)
    );
  }
  public postFormData(path: string, body: any, customHeader?: any): Observable<any>{
    return this.httpClient.post<any>(
      path, body,
      {
        headers: this.setHeadersFormData(customHeader),
        withCredentials: false,
        observe: 'response'
      }
    ).pipe(
      catchError(this.errorHandler)
    );
  }
  public postUrlEncoded(path: string, body: any, customHeader?: any): Observable<any>{
    return this.httpClient.post<any>(
      path, body, {
        headers: this.setUrlEncodeHeaders(customHeader),
        withCredentials: false,
        observe: 'response'
      }
    ).pipe(
      catchError(this.errorHandler)
    );
  }
  public get(path: string, options?: any, params?: HttpParams): Observable<any>{
    return this.httpClient.get(
      path,
      {
        headers: this.setHeaders(options),
        params,
        withCredentials: false,
        observe: 'response'
      }
    ).pipe(
      catchError(this.errorHandler)
    );
  }
  public delete(path: string): Observable<any>{
    return this.httpClient.delete(
      path,
      {
        headers: this.setHeaders(),
        withCredentials: false,
        observe: 'response'
      }
    ).pipe(
      catchError(this.errorHandler)
    );
  }
}

