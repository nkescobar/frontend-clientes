import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { AuthService } from '../components/usuarios/services/auth.service';
import Swal from 'sweetalert2';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private authService: AuthService,
                private router: Router) {
     }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(
            catchError(error => {
                if (error.status === 401) {
                    if (this.authService.isAuthenticated()) {
                      this.authService.logout();
                    }
                    this.router.navigate(['/login']);
                  }
                if (error.status === 403) {
                    Swal.fire({
                      icon: 'warning',
                      title: 'Acceso denegado',
                      text: `Hola ${this.authService.usuario.username} No tienes acceso a este recurso!.`,
                    });
                    this.router.navigate(['/clientes']);
                  }
                return throwError(error);
            })
        );
    }
}
