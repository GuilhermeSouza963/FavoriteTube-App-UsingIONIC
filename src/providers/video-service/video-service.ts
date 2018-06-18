import { UtilServiceProvider } from './../util-service/util-service';
import { Headers, Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the VideoServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class VideoServiceProvider {

  constructor(public http: Http, public utilService: UtilServiceProvider,
  ) { }
  
  listarPorTags(tags: string): Promise<Response> {
    
    let host = this.utilService.obterHostDaApi();

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.http.get(host + 'api/v1/Video/Listar/' + tags, { headers: headers }).toPromise();
  }

  listarPorPlayList(idPlayList: string): Promise<Response> {
    let host = this.utilService.obterHostDaApi();

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.http.get(host + 'api/v1/Video/Listar/' + idPlayList, { headers: headers }).toPromise();
  }

  adicionar(request: any): Promise<Response> {

    let host = this.utilService.obterHostDaApi();

    let headers : any = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + localStorage.getItem('YouLearnToken'));

    return this.http.post(host + 'api/v1/Video/Adicionar/',  request, { headers: headers }).toPromise();
  }

}
