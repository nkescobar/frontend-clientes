import { Injectable } from '@angular/core';
import { ClienteModel } from '../../../models/cliente';
import { CLIENTES } from '../clientes.json';
import { Observable, of, throwError} from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ModeloRespuestaModel } from 'src/app/models/respuesta';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {
  private urlBase = `${environment.apiUrl}clientes`;
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
  constructor(private http: HttpClient, private router: Router) { }

  private handleError(error: HttpErrorResponse) {
    console.log("TCL: ClientesService -> handleError -> error", error)
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.log('Ocurrio un error:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
        console.log( `Backend code ${error.status}, ` + `Cuerpo del mensaje: ${error.error}`)
        if (error.status === 400) {
          return throwError(error);
        }
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: error.error.mensaje,
          });

    }
    // return an observable with a user-facing error message
    return throwError(
      'Algo malo sucedió; por favor, inténtelo de nuevo más tarde.'
    );
  }

  getClientes(): Observable<ClienteModel[]> {
    // return of(CLIENTES);
    return this.http.get<ClienteModel[]>(this.urlBase);
  }

  crearCliente(cliente: ClienteModel): Observable<ModeloRespuestaModel> {
    // return of(CLIENTES);
    return this.http.post<ModeloRespuestaModel>(this.urlBase, cliente, {headers: this.httpHeaders})
    .pipe(catchError( this.handleError));
  }

  getCliente(id): Observable<ModeloRespuestaModel> {
    return this.http.get<ModeloRespuestaModel>(`${this.urlBase}/${id}`)
    .pipe(catchError( this.handleError));
    }

  actualizarCliente(cliente: ClienteModel): Observable<ModeloRespuestaModel> {
    return this.http.put<ModeloRespuestaModel>(`${this.urlBase}/${cliente.id}`, cliente, {headers: this.httpHeaders})
    .pipe(catchError( this.handleError));
  }

  eliminarCliente(id: number): Observable<ModeloRespuestaModel> {
    return this.http.delete<ModeloRespuestaModel>(`${this.urlBase}/${id}`, {headers: this.httpHeaders})
    .pipe(catchError( this.handleError));
  }
}
