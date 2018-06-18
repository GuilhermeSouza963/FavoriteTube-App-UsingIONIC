import { LoadingController, ToastController, AlertController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the UtilServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UtilServiceProvider {

  constructor(
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
  ) {
  }

  public obterHostDaApi(): string {
    return "http://localhost:49325/";
  }

  public showLoading(message: string = "Processando..."): any {
    let loading = this.loadingCtrl.create({
      content: message
    });

    return loading;
  }

  public showToast(message: string, position: string = 'top'): any {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000,
      position: position
    });

    toast.present();
  }

  public showAlert(message: string, title: string = "Atenção") {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: message,
      buttons: ['OK']
    });
    alert.present();
  }

  public showAlertCallBack(message: string, title: string = "Atenção", callback) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: message,
      buttons: [{
        text: 'OK',
        handler: callback
      }]
    });
    alert.present();
  }

  public isJson(json: string): boolean {
    try {
      JSON.parse(json);
    } catch (e) {
      return false;
    }

    return true;
  }

  public efetuarLogoff() {
    localStorage.clear();
  }

  showMessageError(response: Response) {
  
    //console.log('response=', response);
    //console.log('status=', response.status);
    
    if (response.status == 0) {
      this.showAlert("Serviço indisponível!");
    }
    else if (response.status == 401) {
      this.showAlertCallBack("Autorização expirada, é necessário que se autentique novamente.", null, function () {
        localStorage.clear();
        //window.location.reload();
      });
    }
    else if (response.status == 415) {
      this.showToast('Desculpe, serviço indisponível, tento novamente mais tarde!');
    }
    else {

      let json: any = response.json();

      if (typeof json.error_description != 'undefined') {
          this.showToast(json.error_description);
      }
      else if (typeof json.errors != 'undefined') {
        for (let erro in json.errors) // for acts as a foreach  
        {
          let message = json.errors[erro].message;

          this.showToast(message);

        }
      }
      else {
        this.showToast("Operação falhou!");
      }
    }
  }

  removerAcentos(str) {
    let com_acento = "ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖØÙÚÛÜÝŔÞßàáâãäåæçèéêëìíîïðñòóôõöøùúûüýþÿŕ";
    let sem_acento = "AAAAAAACEEEEIIIIDNOOOOOOUUUUYRsBaaaaaaaceeeeiiiionoooooouuuuybyr";
    let novastr="";
    for(let i=0; i<str.length; i++) {
      let troca=false;
      for (let a=0; a<com_acento.length; a++) {
        if (str.substr(i,1)==com_acento.substr(a,1)) {
          novastr+=sem_acento.substr(a,1);
          troca=true;
          break;
        }
      }
      if (troca==false) {
        novastr+=str.substr(i,1);
      }
    }
    return novastr;
  }	

}
