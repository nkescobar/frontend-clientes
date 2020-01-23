import { Injectable } from '@angular/core';
import { ClienteModel } from '../../../models/cliente';
import { Observable, of, throwError} from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpRequest, HttpEvent } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { catchError, tap, map } from 'rxjs/operators';
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

  getClientesPaginado(page: number , size: number): Observable<any> {
    // return of(CLIENTES);
    return this.http.get<any>(`${this.urlBase}/page/${page}/size/${size}`)
      .pipe(
        tap((response: any) => {
          (response.content as ClienteModel[]).forEach(cliente => {
            console.log("TCL: ClientesService -> constructor -> cliente", cliente);
          });
        }),
        map((response: any) => {
          (response.content as ClienteModel[]).map(cliente => {
            cliente.nombre = cliente.nombre.toUpperCase();
            return cliente;
          });
          return response;
        }
        )
      );
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

  subirForo(archivo: File, id): Observable<HttpEvent<{}>> {
    const formData = new FormData();
    formData.append('archivo', archivo);
    formData.append('id', id);

    const req = new HttpRequest('POST', `${this.urlBase}/upload`, formData, {
      reportProgress: true
    });

    return this.http.request(req);
  }

}
