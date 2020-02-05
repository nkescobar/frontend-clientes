import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { UsuarioModel } from '../../../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private urlBase = `${environment.url}oauth/token`;
  private _usuario: UsuarioModel;
  private _token: string;
  
  constructor(private http: HttpClient, private router: Router) { }

  public get usuario(): UsuarioModel {
    if (this._usuario  != null) {
      return this._usuario;
    } else if (!this._usuario && sessionStorage.getItem('usuario')) {
      this._usuario = JSON.parse(sessionStorage.getItem('usuario')) as UsuarioModel;
      return this._usuario;
    }
    return new UsuarioModel();
  }

  public get token(): string {
    if (this._token  != null) {
      return this._token;
    } else if (!this._token && sessionStorage.getItem('token')) {
      this._token = sessionStorage.getItem('token');
      return this._token;
    }
    return null;
  }

 login(usuario: UsuarioModel): Observable<any> {
    const credenciales = btoa('angularapp' + ':' + '12345');
    const httpHeaders = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded',
                                         'Authorization': 'Basic ' + credenciales});

    const params = new URLSearchParams();
    params.set('grant_type', 'password');
    params.set('username', usuario.username);
    params.set('password', usuario.password);

    return this.http.post(`${this.urlBase}`, params.toString(), {headers: httpHeaders});
  }

  guardarUsuario(accessToken: string): void {
    this._usuario = new UsuarioModel();
    const payload = this.obtenerDatosToken(accessToken);
    this._usuario.id = payload.id_usuario;
    this._usuario.nombre = payload.nombre_usuario;
    this._usuario.username = payload.user_name;
    this._usuario.apellido = payload.apellido_usuario;
    this._usuario.email = payload.email_usuario;
    this._usuario.roles  = payload.authorities;
    sessionStorage.setItem('usuario', JSON.stringify(this._usuario));
  }

  guardarToken(accessToken: string): void {
    this._token = accessToken;
    sessionStorage.setItem('token', this._token);
  }

  obtenerDatosToken(accessToken: string): any {
    if (accessToken != null) {
      return JSON.parse(atob(accessToken.split('.')[1]));
    }
    return null;
  }

  isAuthenticated(): boolean {
    const payload = this.obtenerDatosToken(this.token);
    if (payload !== null && payload.user_name && payload.user_name.length > 0) {
      return true;
    }
    return false;
  }

  logout(): void {
    this._usuario = null;
    this._token = null;
    sessionStorage.clear();
  }

  hasRole(role: string): boolean {
    if (this.usuario.roles.includes(role)) {
      return true;
    }
    return false;
  }


 }
