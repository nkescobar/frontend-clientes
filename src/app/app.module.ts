import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { ClientesComponent } from './components/clientes/clientes.component';
import { HomeComponent } from './components/home/home.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CrearClientesComponent } from './components/clientes/crear-clientes/crear-clientes.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CalendarModule} from 'primeng/calendar';
import {InputTextModule} from 'primeng/inputtext';
import {FileUploadModule} from 'primeng/fileupload';
import { ToastModule } from 'primeng/toast';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import { MessageService } from 'primeng/api';
import { NgxSpinnerModule } from "ngx-spinner";
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/es-CO';
import { PaginatorComponent } from './components/paginator/paginator.component';
import { DetalleClienteComponent } from './components/clientes/detalle-cliente/detalle-cliente.component';
import {DialogModule} from 'primeng/dialog';
import {DropdownModule} from 'primeng/dropdown';
import { LoginComponent } from './components/usuarios/login/login.component';
import { ClientesService } from './components/clientes/services/clientes.service';
import { ContentTypeInterceptor } from './interceptors/content-type';
import { JwtInterceptor } from './interceptors/jwt-interceptor';
import { AuthInterceptor } from './interceptors/auth.interceptor';

registerLocaleData(localeFr, 'es-CO');

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ClientesComponent,
    HomeComponent,
    CrearClientesComponent,
    PaginatorComponent,
    DetalleClienteComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    CalendarModule,
    InputTextModule,
    ToastModule,
    MessageModule,
    MessagesModule,
    NgxSpinnerModule,
    FileUploadModule,
    DialogModule,
    DropdownModule
  ],
  providers: [MessageService,
    {provide: LOCALE_ID, useValue: 'es-CO' },
    ClientesService,
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
