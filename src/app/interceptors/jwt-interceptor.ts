import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../components/usuarios/services/auth.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

    constructor(private authService: AuthService) {
     }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = this.authService.token;
        if (token) {
            const authReq = req.clone( {
                headers: req.headers.set('Authorization', `Bearer ${token}` )
            });
            return next.handle(authReq);

            /*req = req.clone({
                setHeaders: {
                    Authorization: `Bearer ${token}`
                }
            });*/
        }

        return next.handle(req);
    }
}
