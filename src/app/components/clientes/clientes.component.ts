import { Component, OnInit } from '@angular/core';
import { ClienteModel } from '../../models/cliente';
import { ClientesService } from './services/clientes.service';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageService } from 'primeng/api';
import { MENSAJES_GENERALES } from 'src/app/constants/validators';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ModalService } from './services/modal.service';
import { AuthService } from '../usuarios/services/auth.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss']
})
export class ClientesComponent implements OnInit {

  listaCientes: ClienteModel[] = [];
  private page = 0;
  private size =  4;
  public paginador: any;
  public esMostrarDetalle: boolean;
  public clienteSeleccionado: ClienteModel;
  private urlBase = `${environment.apiUrl}clientes/uploads/img`;

  constructor(private clientesService: ClientesService,
              private loaderService: NgxSpinnerService,
              private messageService: MessageService,
              private activatedRoute: ActivatedRoute,
              private modalService: ModalService,
              private route: Router,
              public authService: AuthService
    ) { }

  ngOnInit() {
   // this.cargarClientes();
    // this.cargarClientesPaginado();
    this.recuperarPageRuta();
    this.actualizarClienteSubscribe();
  }

  private recuperarPageRuta() {
    this.activatedRoute.params.subscribe(params => {
    console.log("TCL: recuperarPageRuta -> params", params)
    this.page = params.page;
    if (!this.page) {
        this.page = 0;
      }
    this.cargarClientesPaginado();
    });
  }

  private actualizarClienteSubscribe() {
    this.modalService.getFNotificarUpload().subscribe((cliente: ClienteModel) => {
      console.log("TCL: actualizarClienteSubscribe -> cliente", cliente)
      if (cliente) {
        this.listaCientes = this.listaCientes.map(clienteOriginal => {
          if (clienteOriginal.id === cliente.id) {
            clienteOriginal.foto = cliente.foto;
          }
          return clienteOriginal;
        });
      }
    });
  }

  public obtenerRutaImagen(cliente: ClienteModel) {
    return `${this.urlBase}/${cliente.foto}`;
  }

  public mostrarDetalle(cliente) {
    this.clienteSeleccionado = cliente;
    this.esMostrarDetalle = true;
  }

  public cerrarModalDetalle() {
    this.clienteSeleccionado = null;
    this.esMostrarDetalle = false;
  //  this.cargarClientesPaginado();
  }

  private cargarClientes(): void {
    this.loaderService.show();
    this.listaCientes = [];
    this.clientesService.getClientes()
    .subscribe({
      next: (response) => {
          if (response) {
            this.listaCientes = response;
            console.log("TCL: this.listaCientes", this.listaCientes)
            this.listaCientes.map(cliente => {
              cliente.nombre = cliente.nombre.toUpperCase();

             //  let datePipe = new DatePipe('es-CO');
              // cliente.createAt = datePipe.transform(cliente.createAt, 'EEEE dd, MMMM yyyy');
              return cliente;
            });
          }
      },
      error: (err) => {
          console.log('err', err);
          this.messageService.add({severity: 'error', summary: 'Información', detail: MENSAJES_GENERALES.ERROR_PETICION});
      },
      complete: () => {
        this.loaderService.hide();
      }});
  }

  private cargarClientesPaginado(): void {
    this.loaderService.show();
    this.listaCientes = [];
    console.log("TCL: this.page", this.page)

    this.clientesService.getClientesPaginado(this.page, this.size)
    .subscribe({
      next: (response) => {
           console.log("TCL: response", response)
           this.listaCientes = response.content;
           this.paginador = response;
      },
      error: (err) => {
          console.log('err', err);
          this.messageService.add({severity: 'error', summary: 'Información', detail: MENSAJES_GENERALES.ERROR_PETICION});
      },
      complete: () => {
        this.loaderService.hide();
      }});
  }

 public eliminarCliente(cliente: ClienteModel) {
    Swal.fire({
      title: 'Esta seguro',
      text: `¿Seguro que desea eliminar al cliente ${cliente.nombre} ${cliente.apellido}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'No, cancelar!',
    }).then((result) => {
      if (result.value) {
        this.eliminar(cliente);
      }
    });
  }

  private eliminar(cliente: ClienteModel) {
    this.loaderService.show();
    this.clientesService.eliminarCliente(cliente.id).subscribe({
      next: (response) => {
        console.log("TCL: eliminar -> response", response)
        Swal.fire(
              'Eliminado!',
               MENSAJES_GENERALES.ELIMINADO_EXITOSO,
              'success'
            );
        this.cargarClientesPaginado();
      },
      error: (err) => {
          console.log('err', err);
          this.messageService.add({severity: 'error', summary: 'Información', detail: MENSAJES_GENERALES.ERROR_PETICION});
      },
      complete: () => {
        this.loaderService.hide();
      }
    });

  }
}
