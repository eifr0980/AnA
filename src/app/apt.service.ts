import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of, observable, Subject } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { DOCUMENT } from '@angular/common';
import { Apt } from './apt';
import { AuthService } from './auth/auth.service';
import { FormArray } from '@angular/forms';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};
const httpOptionsAuth = new HttpHeaders();

@Injectable({
  providedIn: 'root'
})
export class AptService {

  private aptsUrl: string = 'api/apt';
  //  private aptsUrl = 'http://localhost:3000/api/apt';


  private appState = new Subject<string>();
  private appState$ = this.appState.asObservable();
  private link: HTMLLinkElement;
  constructor(
    private http: HttpClient,
    private authService: AuthService,
    @Inject(DOCUMENT) private doc
  ) {
    this.link = this.doc.createElement('link');
    this.link.setAttribute('rel', 'canonical');
    this.doc.head.appendChild(this.link);
  }


  /** GET apts from the server */
  getApts(): Observable<Apt[]> {
    return this.http.get<Apt[]>(this.aptsUrl)
      .pipe(
        tap(_ => this.log('fetched apts')),
        catchError(this.handleError('getApts', []))
      );
  }

  /** GET apts from the server */
  searchApts(formArray: FormArray): Observable<Apt[]> {
    //  const sql = `WHERE city = ${formArray[0].location} AND rooms = ${formArray[1].rooms} AND sqrMtr = ${formArray[1].sqrMtr} AND price = ${formArray[2].price} AND parking = ${formArray[2].parking ? 1 : 0} AND storage = ${formArray[2].storage ? 1 : 0}`;
    const params = {
      params: {
        city: formArray[0].location,
        rooms: formArray[1].rooms,
        sqrMtr: formArray[1].sqrMtr,
        price: formArray[2].price,
        storage: (formArray[2].storage ? 1 : 0).toString(),
        parking: (formArray[2].parking ? 1 : 0).toString()
      }
    };
    //  console.log(sql);
    return this.http.get<Apt[]>(this.aptsUrl, params)
      .pipe(
        tap(_ => this.log('fetched apts')),
        catchError(this.handleError('getApts', []))
      );
  }

  /** GET hero by id. Will 404 if id not found */
  getApt(id: number): Observable<Apt> {
    const url = `${this.aptsUrl}/${id}`;
    return this.http.get<Apt>(url).pipe(
      tap(_ => this.log(`fetched apt id=${id}`)),
      catchError(this.handleError<Apt>(`getApt id=${id}`))
    );
  }

  //////// Save methods //////////

  /** POST: add a new apt to the server */
  addApt(data: FormData) {
    const auth = 'Bearer ' + this.authService.getToken().split('"')[1];
    const httpOptionsAuth = {
      headers: new HttpHeaders({
        'Authorization': auth
      }),
      reportProgress: true,
      obsesrve: 'events'
    };

    const url = `${this.aptsUrl}/create`;
    return this.http.post(url, data, httpOptionsAuth);
  }

  /** DELETE: delete the apt from the server */
  deleteApt(apt: Apt | number) {
    const auth = 'Bearer ' + this.authService.getToken().split('"')[1];
    const httpOptionsAuth = {
      headers: new HttpHeaders({
        'Authorization': auth
      }),
      reportProgress: true,
      obsesrve: 'events'
    };
    const id = typeof apt === 'number' ? apt : apt.id;
    const url = `${this.aptsUrl}/${id}`;
    return this.http.delete(url, httpOptionsAuth);
  }

  /** DELETE: delete multiple apts from the server 
  deleteApts(apt: Apt[] | number[]) {
    const auth = 'Bearer ' + this.authService.getToken().split('"')[1];
    const httpOptionsAuth = {
      headers: new HttpHeaders({
        'Authorization': auth
      }),
      reportProgress: true,
      obsesrve: 'events'
    };
     apt.forEach(apt => {
      const id = typeof apt === 'number' ? apt : apt.id;
      const url = `${this.aptsUrl}/${id}`;
      this.http.delete(url, httpOptionsAuth)
      .subscribe(res => console.log(res));
    })
  }*/

  /** PUT: update the hero on the server 
  updateHero (hero: Hero): Observable<any> {
    return this.http.put(this.heroesUrl, hero, httpOptions).pipe(
      tap(_ => this.log(`updated hero id=${hero.id}`)),
      catchError(this.handleError<any>('updateHero'))
    );
  } */


  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  private log(message: string) {
    console.log(message);
  }

  /* Manage state of app (homepage/detailsPage) */

  public updateStringSubject(newStringVar: string) {
    this.appState.next(newStringVar);
  }

  getAppState() {
    return this.appState$;
  }

  stateDetail(): void {
    this.updateStringSubject('detail');
  }

  stateHomepage() {
    this.updateStringSubject('homepage');
  }

  createLinkForCanonicalURL(url?: string) {
    let canURL = url == undefined ? this.doc.URL : 'https://aa-realestate.co.il/' + url;
   
    this.link.setAttribute('href', canURL);
  }

 
}
