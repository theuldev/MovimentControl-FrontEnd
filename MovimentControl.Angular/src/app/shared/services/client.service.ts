import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Client } from 'src/app/shared/models/Client';
import { User } from '../models/User';
import { localStorageService } from './localstorage.service';
import { UrlSerializer } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  constructor(private http: HttpClient) {}

  urlBase = `${environment.UrlMain}movimentcontrol`;
  login(username: string, password: string) {
    var form = new FormData();

    var url =
      this.urlBase + '/login?username=' + username + '&password=' + password;
    return this.http.post(url,form);
  }
  login2fa(user: User,id : any) {
    var headers = localStorageService.getToken();
    user.loggedTime = new Date(Date.now())
    debugger;
    return this.http.post(`${this.urlBase}/login2fa/${id}`, user, {
      headers: headers
    });
  }

  get(): Observable<Client[]> {
    var headers = localStorageService.getToken();
    return this.http.get<Client[]>(`${this.urlBase}`, { headers: headers });
  }
  getById(id: any) {
    var headers = localStorageService.getToken();
    return this.http.get<Client[]>(`${this.urlBase}/${id}`, {
      headers: headers,
    });
  }

  post(client: Client) {
    var headers = localStorageService.getToken();
    return this.http.post(`${this.urlBase}`, client, { headers: headers });
  }
  put(id: number, client: Client) {
    var headers = localStorageService.getToken();
    return this.http.put(`${this.urlBase}/${id}`, client, { headers: headers });
  }
  delete(id: number) {
    var headers = localStorageService.getToken();
    return this.http.delete(`${this.urlBase}/${id}`, { headers: headers });
  }
}
