import { UsuarioServiceProvider } from './../../providers/usuario-service/usuario-service';
import { VideoServiceProvider } from './../../providers/video-service/video-service';
import { UtilServiceProvider } from './../../providers/util-service/util-service';
import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { style } from '@angular/core/src/animation/dsl';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  videos: any[] = [];
  constructor(public navCtrl: NavController, private utilService: UtilServiceProvider, private videoService: VideoServiceProvider, private alertCtrl: AlertController, private usuarioService : UsuarioServiceProvider) {
  }

  buscarVideo(tag: string) {
    if (tag == null || tag.trim() == '') {
      return;
    }

    //chama a api e busca os videos
    this.loadVideos(tag);
  }

  loadVideos(tag: string) {
    // chamada da api
    let loading = this.utilService.showLoading();
    loading.present();

    this.videoService.listarPorTags(tag).then((response) => {
      this.videos = response.json();
      loading.dismiss();
    }).catch((response) => {
      this.utilService.showMessageError(response);
      loading.dismiss();
    });

  }

  AddVideo() {
    let token = localStorage.getItem('YouLearnToken');
    if (token != null) {
      //já esta autenticado na api e libera o cadastro de video
      this.navCtrl.push('VideoPage');
    }
    else {
      let prompt = this.alertCtrl.create({
        title: 'Login',
        message: 'Informe seus dados para logar no sistema',
        cssClass: 'alertcss',
        inputs: [
          {
            name: 'email',
            placeholder: 'E-mail',
            type: 'email',
            value: localStorage.getItem('usuario.email')
          },
          {
            name: 'senha',
            placeholder: 'Senha',
            type: 'password'
          }
        ],
        buttons: [
          {
            text: 'Novo usuário',
            cssClass: 'buttoncss',
            handler: () => {
              this.navCtrl.push('AddUsuarioPage');
            }
          },
          {
            text: 'Entrar',
            cssClass: 'buttoncss',
            handler: (data) => {
              this.autenticarUsuario(data);
            }
          }
        ]
      });

      prompt.present();
    }
  }

  autenticarUsuario(request: any) {
    //Abre a tela de aguarde
    let loading = this.utilService.showLoading('Aguarde...');
    loading.present();

    this.usuarioService.autenticar(request)
      .then((response) => {
        let autenticado: boolean = response.json().authenticated;

        if (autenticado == false) {
          this.utilService.showToast("E-mail ou senha inválidos!")
          loading.dismiss();
          return;
        }

        let token: string = response.json().accessToken;
        let primeiroNome: string = response.json().primeiroNome;

        //salva no local storage
        localStorage.setItem('YouLearnToken', token);

        loading.dismiss();

        let confirm = this.alertCtrl.create({
          title: 'Olá ' + primeiroNome,
          message: 'Deseja adicionar um novo vídeo?',
          buttons: [
            {
              text: 'Não',
              handler: () => { }
            },
            {
              text: 'Sim',
              handler: () => {
                this.navCtrl.push('VideoPage');
              }
            },
          ]
        });

        confirm.present();

      })
      .catch((response) => {
        loading.dismiss();
        this.utilService.showMessageError(response);
      });
  }

}
