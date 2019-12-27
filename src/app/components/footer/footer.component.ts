import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  public autor: any;
  constructor() { }

  ngOnInit() {
    this.autor = {
      nombre: 'Nasly Katherine',
      apellido: 'Escobar Ortiz'
    };
  }

}
