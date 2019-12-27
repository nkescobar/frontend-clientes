import { Component, OnInit } from '@angular/core';
import { ClienteModel } from '../../models/cliente';
import { ClientesService } from './services/clientes.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss']
})
export class ClientesComponent implements OnInit {

  listaCientes: ClienteModel[] = [];
  constructor(private clientesService: ClientesService) { }

  ngOnInit() {
    this.cargarClientes();
  }

  private cargarClientes(): void {
    this.clientesService.getClientes()
    .subscribe(data => {
    console.log("TCL: ClientesComponent -> constructor -> data", data)
      this.listaCientes = data;
    }, error => {
      console.error(error);
    });
  }

}
