import { Headers, Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { UtilServiceProvider } from '../util-service/util-service';

/*
  Generated class for the CanalServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CanalServiceProvider {

  constructor(public http: Http, public utilService: UtilServiceProvider,) {
  }

  listar(): Promise<Response> {
    let host = this.utilService.obterHostDaApi();

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + localStorage.getItem('YouLearnToken'));

    return this.http.get(host + 'api/v1/Canal/ListarCanal/', { headers: headers }).toPromise();
  }

  adicionar(nome: string, urlLogo: string): Promise<Response> {

    let host = this.utilService.obterHostDaApi();

    let headers : any = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + localStorage.getItem('YouLearnToken'));

    return this.http.post(host + 'api/v1/Canal/Adicionar/',  {nome: nome, urlLogo : urlLogo}, { headers: headers }).toPromise();
  }

  excluir(id : any): Promise<Response> {
    
    let host = this.utilService.obterHostDaApi();

    let headers : any = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + localStorage.getItem('YouLearnToken'));

    return this.http.delete(host + 'api/v1/Canal/Excluir/' + id, { headers: headers }).toPromise();
  }

}
