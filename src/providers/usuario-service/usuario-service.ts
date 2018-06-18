import { Headers, Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { UtilServiceProvider } from '../util-service/util-service';

/*
  Generated class for the UsuarioServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UsuarioServiceProvider {

  constructor(public http: Http, public utilService: UtilServiceProvider,
  ) { }

  autenticar(request : any) : Promise<Response>{
    let host = this.utilService.obterHostDaApi();
    
    let headers : any = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(host + 'api/v1/Usuario/Autenticar', request, headers).toPromise();
  }

  adicionar(form: any): Promise<Response> {
    
    let host = this.utilService.obterHostDaApi();

    let headers : any = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(host + 'api/v1/Usuario/Adicionar',  form, { headers: headers }).toPromise();
  }

}
