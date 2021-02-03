import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { UserDTO } from '../entity/user.dto';
import { tap } from 'rxjs/operators'
import { HOST } from '../entity/config';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public LOCAL_STORAGE_KEY = 'jwt';
  private jwtHelper = new JwtHelperService();

  constructor(private http: HttpClient) { }

  login(payload: UserDTO): Observable<any> {
    return this.http.post(`${HOST}/user/login`, payload).pipe(tap(user => localStorage.setItem(this.LOCAL_STORAGE_KEY, `Bearer ${user.token}`)))
  }

  public isAuthenticated(): boolean {
    const token = localStorage.getItem(this.LOCAL_STORAGE_KEY);
    return !this.jwtHelper.isTokenExpired(token);
  }
}
