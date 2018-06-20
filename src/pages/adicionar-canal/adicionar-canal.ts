import { CanalServiceProvider } from './../../providers/canal-service/canal-service';
import { UtilServiceProvider } from './../../providers/util-service/util-service';
import { Component } from '@angular/core';
import { IonicPage, ViewController, AlertController } from 'ionic-angular';

/**
 * Generated class for the AdicionarCanalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-adicionar-canal',
  templateUrl: 'adicionar-canal.html',
})
export class AdicionarCanalPage {
  canais: any[] = [];
  constructor(private viewController : ViewController, 
    private utilService: UtilServiceProvider,
    private canalService: CanalServiceProvider,
    private alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    this.loadCanal();
  }

  loadCanal() {

    //Abre tela de aguarde
    let loading = this.utilService.showLoading();
    loading.present();

    this.canalService.listar().then((response) => {
      this.canais = response.json();

      //Fecha a tela de aguarde
      loading.dismiss();

    }).catch((response) => {

      loading.dismiss();

      this.utilService.showMessageError(response);

    });
  }

  closeModal(){
    this.viewController.dismiss();
  }

  adicionar() {
    let prompt = this.alertCtrl.create({
      title: 'Adicionar canal',
      message: "Informe os dados do canal",
      inputs: [
        {
          name: 'nome',
          placeholder: 'Nome do canal',
          type: 'text'
        },
        {
          name: 'urlLogo',
          type: 'text',
          placeholder: 'http://logo.jpg'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          handler: () => {

          }
        },
        {
          text: 'Salvar',
          handler: data => {
            //Abre tela de aguarde
            let loading = this.utilService.showLoading();
            loading.present();

            this.canalService.adicionar(data.nome, data.urlLogo).then((response) => {
              //Fecha a tela de aguarde
              loading.dismiss();

              this.loadCanal();

            }).catch((response) => {

              loading.dismiss();

              this.utilService.showMessageError(response);

            });
          }
        }
      ]
    });

    prompt.present();
  }

  excluir(canal: any){
    
    //Abre tela de aguarde
    let loading = this.utilService.showLoading();
    loading.present();
    this.canalService.excluir(canal.idCanal).then((response) => {

      this.loadCanal();

      //Fecha a tela de aguarde
      loading.dismiss();

    }).catch((response) => {

      loading.dismiss();

      this.utilService.showMessageError(response);

    });
  }

}
