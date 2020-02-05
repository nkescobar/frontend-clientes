import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ERRORES_LOGIN, MENSAJES_GENERALES } from '../../../constants/validators';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageService } from 'primeng/api';
import { UsuarioModel } from '../../../models/usuario';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  titulo: string;
  usuario: UsuarioModel;
  public form: FormGroup;
  public erroresDefs = ERRORES_LOGIN;


  constructor(private fb: FormBuilder,
              private messageService: MessageService,
              private loaderService: NgxSpinnerService,
              private authService: AuthService,
              private router: Router
              ) {
    this.titulo = 'Por favor Sign In!';
  }

  ngOnInit() {
    if (this.authService.isAuthenticated()) {
      Swal.fire({
        icon: 'info',
        title: `Hola ${this.authService.usuario.nombre} ya estas autenticado.`,
        showConfirmButton: false,
        timer: 2000
      });
      this.router.navigate(['/clientes']);
    }
    this.inicializarFormulario();
  }

  private inicializarFormulario(): void {
    this.form = this.fb.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]]
    });
  }

  get getUsername() {return this.form.get('username'); }
  get getPassword() {return this.form.get('password'); }


  public login(): void {
    this.form.markAllAsTouched();

    if (this.form.valid) {
      const usuario = this.obtenerUsuario();
      this.peticionLogin(usuario);
    } else {
      this.messageService.add({severity: 'error', summary: 'Información', detail: MENSAJES_GENERALES.FORMULARIO_INVALIDO});
    }
  }

  private obtenerUsuario(): UsuarioModel {
    const usuario = new UsuarioModel();
    usuario.username = this.getUsername.value;
    usuario.password = this.getPassword.value;
    return usuario;
  }

  private peticionLogin(usuario: UsuarioModel): void {
    this.loaderService.show();
    this.authService.login(usuario).subscribe(
      {
        next: (response) => {
          console.log('TCL: LoginComponent -> getgetPassword -> response', response);
          Swal.fire({
            icon: 'success',
            title: `Bienvenido ${response.nombre_usuario} ${response.apellido_usuario}
            Has iniciado sesion con exito!.`,
            showConfirmButton: false,
            timer: 1500
          });
          this.authService.guardarToken(response.access_token);
          this.authService.guardarUsuario(response.access_token);

          this.router.navigate(['/clientes']);        },
        error: (err) => {
          console.log('err', err);

          if (err.status === 400) {
            Swal.fire({
              icon: 'error',
              title: `Usuario o clave incorrecta.`,
              showConfirmButton: false,
              timer: 1500
            });
           } else {
            this.messageService.add({severity: 'error', summary: 'Información', detail: MENSAJES_GENERALES.ERROR_PETICION});

           }
        },
        complete: () => {
          this.loaderService.hide();
        }
      }
    );
  }

}
