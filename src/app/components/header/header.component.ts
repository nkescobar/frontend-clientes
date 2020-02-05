import { Component, OnInit } from '@angular/core';
import { AuthService } from '../usuarios/services/auth.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(public authService: AuthService,
    private router: Router

    ) { }

  ngOnInit() {
  }

  public logout(): void {
    Swal.fire({
      icon: 'info',
      title: `Hola ${this.authService.usuario.nombre} has cerrado sesión con éxito.`,
      showConfirmButton: false,
      timer: 2000
    });
    this.authService.logout();
    this.router.navigate(['/login']);

  }

}
