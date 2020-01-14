import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ERRORES_REGISTRAR_CLIENTE, MENSAJES_GENERALES } from '../../../constants/validators';
import { ClientesService } from '../services/clientes.service';
import { ClienteModel } from '../../../models/cliente';
import { MessageService } from 'primeng/api';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router, ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crear-clientes',
  templateUrl: './crear-clientes.component.html',
  styleUrls: ['./crear-clientes.component.scss']
})
export class CrearClientesComponent implements OnInit {
  public form: FormGroup;
  public titulo: string;
  public erroresDefs = ERRORES_REGISTRAR_CLIENTE;
  public cliente: ClienteModel;
  public esModoEditar: boolean;
  public errores: string[] = [];
  constructor(private fb: FormBuilder,
              private clientesService: ClientesService,
              private messageService: MessageService,
              private loaderService: NgxSpinnerService,
              private router: Router,
              private activatedRoute: ActivatedRoute
    ) { }

  ngOnInit() {
    this.titulo = 'Crear Cliente';
    this.inicializarFormulario();
    this.cargarCliente();
  }

  private inicializarFormulario(): void {
    this.form = this.fb.group({
      nombre: [null, [Validators.required]],
      apellido: [null, [Validators.required]],
      email: [null, [Validators.email]],
      createAt: [null]
    });
  }

  private cargarDatosCliente() {
    const fecha = moment(this.cliente.createAt, 'YYYY-MM-DD').utc().toDate();
    const createAt = this.cliente.createAt ?
    new Date(fecha.toString()) : null;
    this.getNombre.setValue(this.cliente.nombre);
    console.log("TCL: CrearClientesComponent -> cargarDatosCliente -> this.getNombre", this.getNombre.value)
    this.getApellido.setValue(this.cliente.apellido);
    this.getEmail.setValue(this.cliente.email);
    this.getCreateAt.setValue(createAt);
  }

  get getNombre() {return this.form.get('nombre'); }
  get getApellido() {return this.form.get('apellido'); }
  get getEmail() {return this.form.get('email'); }
  get getCreateAt() {return this.form.get('createAt'); }

  private cargarCliente(): void {
    this.activatedRoute.params.subscribe(params => {
      const id = params.id;
      if (id) {
      this.consultarCliente(id);
      }
    });
  }

  public almacenar() {
    this.form.markAllAsTouched();

    if (this.form.valid) {
      if (this.esModoEditar) {
        const cliente = this.obtenerObjetoEditar();
        this.titulo = 'Actualizar Cliente';
        this.actualizarCliente(cliente);
      } else {
        const cliente = this.obtenerObjetoAlmacenar();
        this.guardarCliente(cliente);
      }
    } else {
      this.messageService.add({severity: 'error', summary: 'Información', detail: MENSAJES_GENERALES.FORMULARIO_INVALIDO});
    }
  }

  private consultarCliente(id) {
    this.loaderService.hide();
    this.clientesService.getCliente(id).subscribe({
      next: (response) => {
          if (response) {
            console.log("TCL: CrearClientesComponent -> consultarCliente -> response", response)
            this.cliente = response.response;
            console.log("TCL: CrearClientesComponent -> consultarCliente ->   this.cliente",   this.cliente)
            this.esModoEditar = true;
            this.cargarDatosCliente();
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

  private guardarCliente(cliente: ClienteModel) {
    this.loaderService.show();
    this.errores = [];
    this.clientesService.crearCliente(cliente).subscribe({
      next: (response) => {
          if (response) {
            Swal.fire({
              icon: 'success',
              title: MENSAJES_GENERALES.GUARDADO_EXITOSO + ' ' + response.mensaje ,
              showConfirmButton: false,
              timer: 1500
            });
            this.router.navigate(['/clientes']);
          }
      },
      error: (err) => {
          console.log('err', err);
          this.errores = err.error.errors as string[];
          console.log("TCL: CrearClientesComponent -> guardarCliente -> this.errores", this.errores)
          this.messageService.add({severity: 'error', summary: 'Información', detail: MENSAJES_GENERALES.ERROR_PETICION});
      },
      complete: () => {
        this.loaderService.hide();
      }
    });
  }

  private actualizarCliente(cliente: ClienteModel) {
    this.loaderService.show();
    this.errores = [];
    this.clientesService.actualizarCliente(cliente).subscribe({
      next: (response) => {
          if (response) {
            Swal.fire({
              icon: 'success',
              title: MENSAJES_GENERALES.ACTUALIZADO_EXITOSO + ' ' + response.mensaje,
              showConfirmButton: false,
              timer: 1500
            });
            this.router.navigate(['/clientes']);
          }
      },
      error: (err) => {
          console.log('err', err);
          this.errores = err.error.errors as string[];
          this.messageService.add({severity: 'error', summary: 'Información', detail: MENSAJES_GENERALES.ERROR_PETICION});
      },
      complete: () => {
        this.loaderService.hide();
      }
    });
  }

  private obtenerObjetoAlmacenar(): ClienteModel {
    const cliente = new ClienteModel();
    cliente.nombre = this.getNombre.value;
    cliente.apellido = this.getApellido.value;
    cliente.email = this.getEmail.value;
    return cliente;
  }

  private obtenerObjetoEditar(): ClienteModel {
    const cliente = new ClienteModel();
    cliente.id = this.cliente.id;
    cliente.nombre = this.getNombre.value;
    cliente.apellido = this.getApellido.value;
    cliente.email = this.getEmail.value;
    return cliente;
  }
}
