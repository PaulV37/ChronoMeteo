import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

const apiUrl = 'https://www.infoclimat.fr/opendata/';
const apiToken = 't2pgtHSB0rFrVSukaoSPPUF01EA35TOYhgijrqD6xOAwMkre6uJhA';

@Injectable({
    providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  public get(url: string): Observable<any> {
    return this.http.get(apiUrl + url + apiToken).pipe(map(res => res));
  }
}