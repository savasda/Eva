import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import { LOCAL_STORAGE_KEY } from 'src/app/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem(LOCAL_STORAGE_KEY);
    let headers = req.headers;
    if (token){
      headers = headers.set('Authorization', `${token}`);
    }
    headers = headers.set('Cache-Control', 'no-cache, no-store, must-revalidate' )
      .set('X-Requested-With', 'XMLHttpRequest')
      .set('Expires', '0')
      .set('Pragma', 'no-cache');
    if (!headers.keys().includes('Content-Type')) {
      headers = headers.set('Content-Type', 'application/json');
    } else if (headers.get('Content-Type') === 'multipart/form-data') {
      headers = headers.delete('Content-Type');
    }
    const request = req.clone({ headers });
    return next.handle(request);
  }


}
