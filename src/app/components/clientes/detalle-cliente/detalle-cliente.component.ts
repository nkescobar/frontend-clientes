import { Component, OnInit, Input } from '@angular/core';
import { ClienteModel } from '../../../models/cliente';
import { FormBuilder } from '@angular/forms';
import { ClientesService } from '../services/clientes.service';
import { MessageService } from 'primeng/api';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { MENSAJES_GENERALES } from 'src/app/constants/validators';
import { environment } from 'src/environments/environment';
import { HttpEventType } from '@angular/common/http';
import { ModalService } from '../services/modal.service';
import { AuthService } from '../../usuarios/services/auth.service';

@Component({
  selector: 'app-detalle-cliente',
  templateUrl: './detalle-cliente.component.html',
  styleUrls: ['./detalle-cliente.component.scss']
})
export class DetalleClienteComponent implements OnInit {

  private urlBase = `${environment.apiUrl}clientes/uploads/img`;
  public progreso = 0;
  @Input() cliente: ClienteModel;
  private fotoSeleccionada: File;
  constructor(private fb: FormBuilder,
              private clientesService: ClientesService,
              private messageService: MessageService,
              private loaderService: NgxSpinnerService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private modalService: ModalService,
              public authService: AuthService
) { }

  ngOnInit() {
    if (this.cliente) {
      this.consultarCliente(this.cliente.id);
    } else {
      this.cargarCliente();
    }
  }

  private cargarCliente(): void {
    this.activatedRoute.params.subscribe(params => {
      const id = params.id;
      if (id) {
      this.consultarCliente(id);
      }
    });
  }

  private consultarCliente(id) {
    this.loaderService.hide();
    this.clientesService.getCliente(id).subscribe({
      next: (response) => {
          if (response) {
            console.log("TCL: CrearClientesComponent -> consultarCliente -> response", response)
            this.cliente = response.response;
            console.log("TCL: CrearClientesComponent -> consultarCliente ->   this.cliente",   this.cliente)
          }
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

  public subirFoto() {
    console.log("TCL: DetalleClienteComponent -> subirFoto -> this.fotoSeleccionada", this.fotoSeleccionada)
    this.progreso = 0;
    if (!this.fotoSeleccionada) {
      console.log("TCL: DetalleClienteComponent -> subirFoto -> this.fotoSeleccionada", this.fotoSeleccionada)
      Swal.fire({
        icon: 'error',
        title: 'Debe seleccionar una foto',
        showConfirmButton: false,
        timer: 1500
      });
      return;
    }
  //  this.loaderService.show();
    this.clientesService.subirForo(this.fotoSeleccionada, this.cliente.id).subscribe({
        next: (event) => {
          if (event.type === HttpEventType.UploadProgress) {
            this.progreso = Math.round((event.loaded / event.total) * 100);
          } else if (event.type === HttpEventType.Response) {
            const response: any = event.body;
            console.log("TCL: DetalleClienteComponent -> subirFoto -> response", response)
            this.cliente = response.response;
            this.fotoSeleccionada = null;
            this.modalService.setNotificarUpload(this.cliente);
            Swal.fire({
               icon: 'success',
               title: MENSAJES_GENERALES.GUARDADO_EXITOSO + ' ' + response.mensaje ,
               showConfirmButton: false,
               timer: 1500
             });
          }
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

  public seleccionarFoto(event) {
    this.fotoSeleccionada = event.target.files[0];

    if (this.fotoSeleccionada.type.indexOf('image') < 0) {
      Swal.fire({
        icon: 'error',
        title: 'Error al seleccionar imagen, el archivo debe ser del tipo imagen.',
        showConfirmButton: true,
      });
      this.fotoSeleccionada = null;
    }
    console.log("TCL: DetalleClienteComponent -> seleccionarFoto -> this.fotoSeleccionada ", this.fotoSeleccionada )
  }

  public obtenerRutaImagen() {
    return `${this.urlBase}/${this.cliente.foto}`;
  }


}
