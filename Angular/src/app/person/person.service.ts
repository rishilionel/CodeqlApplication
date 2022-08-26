import { Injectable } from "@angular/core";
import { Person } from "./person";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class PersonService {
  endpoint = "http://localhost:3000";
  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
    }),
  };

  constructor(private httpClient: HttpClient) {}

  getPersonById(id: any): Observable<any> {
    return this.httpClient
      .get(`${this.endpoint}/person/${id}`)
      .pipe(catchError(this.errorHandler));
  }

  getPerson(): Observable<any> {
    return this.httpClient
      .get(`${this.endpoint}/person`)
      .pipe(catchError(this.errorHandler));
  }

  addPerson(data: Person): Observable<any> {
    return this.httpClient
      .post(`${this.endpoint}/person`, JSON.stringify(data), this.httpOptions)
      .pipe(catchError(this.errorHandler));
  }

  editPerson(id: any, data: Person): Observable<any> {
    return this.httpClient
      .put(
        `${this.endpoint}/person/${id}`,
        JSON.stringify(data),
        this.httpOptions
      )
      .pipe(catchError(this.errorHandler));
  }

  deletePerson(id: number): Observable<any> {
    return this.httpClient
      .delete(`${this.endpoint}/person/${id}`, this.httpOptions)
      .pipe(catchError(this.errorHandler));
  }

  // Error handling
  errorHandler(error: HttpErrorResponse) {
    let errorMessage = "";
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}
