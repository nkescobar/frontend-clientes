import { Component, OnInit } from '@angular/core';
import { ClienteModel } from '../../models/cliente';
import { ClientesService } from './services/clientes.service';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageService } from 'primeng/api';
import { MENSAJES_GENERALES } from 'src/app/constants/validators';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss']
})
export class ClientesComponent implements OnInit {

  listaCientes: ClienteModel[] = [];
  constructor(private clientesService: ClientesService,
              private loaderService: NgxSpinnerService,
              private messageService: MessageService,
    ) { }

  ngOnInit() {
    this.cargarClientes();
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
            this.cargarClientes();
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
