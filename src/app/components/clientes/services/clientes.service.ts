import { Injectable } from '@angular/core';
import { ClienteModel } from '../../../models/cliente';
import { CLIENTES } from '../clientes.json';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {
  private urlBase = `${environment.apiUrl}clientes`;
  constructor(private http: HttpClient) { }

  getClientes(): Observable<ClienteModel[]> {
    // return of(CLIENTES);
    return this.http.get<ClienteModel[]>(this.urlBase);
  }
}
