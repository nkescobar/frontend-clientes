import { Injectable, EventEmitter } from '@angular/core';
import { ClienteModel } from '../../../models/cliente';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  private notificarUpload: EventEmitter<ClienteModel> = new EventEmitter();

  constructor() { }

  public setNotificarUpload(data: ClienteModel) {
    this.notificarUpload.emit(data);
  }

  public getFNotificarUpload(): EventEmitter<ClienteModel> {
      return this.notificarUpload;
  }
}
