import { HttpHeaders } from '@angular/common/http';

export class localStorageService {
  static getToken() {
    let userInfo = JSON.parse(localStorage.getItem('user_Info'));
    const headers = new HttpHeaders({
      Authorization: `Bearer ${userInfo}`
    });
    return headers;
  }
}
