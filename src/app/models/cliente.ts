import { RegionModel } from './region';
export class ClienteModel {
    id: number;
    nombre: string;
    apellido: string;
    createAt: string;
    email: string;
    foto: string;
    region?: RegionModel;
}
