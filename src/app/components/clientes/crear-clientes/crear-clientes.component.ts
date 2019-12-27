import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-crear-clientes',
  templateUrl: './crear-clientes.component.html',
  styleUrls: ['./crear-clientes.component.scss']
})
export class CrearClientesComponent implements OnInit {
  public form: FormGroup;

  constructor(private fb: FormBuilder
    ) { }

  ngOnInit() {
    this.inicializarFormulario();
  }

  private inicializarFormulario(): void {
    this.form = this.fb.group({
      nombre: [null, [Validators.required]],
      apellido: [null, [Validators.required]],
      email: [null, [Validators.email]],
      createAt: [null, [Validators.required]]
    });
  }


}
