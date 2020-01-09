import { Injectable } from '@angular/core';
import { ClienteModel } from '../../../models/cliente';
import { CLIENTES } from '../clientes.json';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {
  private urlBase = `${environment.apiUrl}clientes`;
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
  constructor(private http: HttpClient) { }

  getClientes(): Observable<ClienteModel[]> {
    // return of(CLIENTES);
    return this.http.get<ClienteModel[]>(this.urlBase);
  }

  crearCliente(cliente: ClienteModel): Observable<ClienteModel> {
    // return of(CLIENTES);
    return this.http.post<ClienteModel>(this.urlBase, cliente, {headers: this.httpHeaders});
  }

  getCliente(id): Observable<ClienteModel> {
    return this.http.get<ClienteModel>(`${this.urlBase}/${id}`);
  }

  actualizarCliente(cliente: ClienteModel): Observable<ClienteModel> {
    return this.http.put<ClienteModel>(`${this.urlBase}/${cliente.id}`, cliente, {headers: this.httpHeaders});
  }

  eliminarCliente(id: number): Observable<ClienteModel> {
    return this.http.delete<ClienteModel>(`${this.urlBase}/${id}`, {headers: this.httpHeaders});
  }
}
