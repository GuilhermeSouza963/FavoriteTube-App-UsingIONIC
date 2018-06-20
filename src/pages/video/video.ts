import { VideoServiceProvider } from './../../providers/video-service/video-service';
import { PlayListServiceProvider } from './../../providers/play-list-service/play-list-service';
import { CanalServiceProvider } from './../../providers/canal-service/canal-service';
import { UtilServiceProvider } from './../../providers/util-service/util-service';
import { Component } from '@angular/core';
import { IonicPage, NavController, ModalController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

/**
 * Generated class for the VideoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-video',
  templateUrl: 'video.html',
})
export class VideoPage {
  form: FormGroup;
  canais: any[] = [];
  playlists: any[] = [];

  constructor(public navCtrl: NavController,
    private fb: FormBuilder,
    private utilService: UtilServiceProvider,
    private modalCtrl: ModalController,
    private canalService: CanalServiceProvider,
    private playListService: PlayListServiceProvider,
    private videoService: VideoServiceProvider) {

    this.form = this.fb.group({
      titulo: ['', Validators.compose([
        Validators.minLength(1),
        Validators.maxLength(100),
        Validators.required
      ])],
      descricao: ['', Validators.compose([
        Validators.minLength(1),
        Validators.maxLength(255),
        Validators.required
      ])],
      idVideoYoutube: ['', Validators.compose([
        Validators.minLength(1),
        Validators.maxLength(30),
        Validators.required
      ])],
      tags: ['', Validators.compose([
        Validators.minLength(1),
        Validators.maxLength(150),
        Validators.required
      ])],

      idCanal: ['', Validators.compose([
        Validators.required
      ])],

      idPlaylist: ['', Validators.compose([

      ])],

      OrdemPlayList: ['', Validators.compose([


      ])],
    });
  }

  ionViewDidLoad() {
    this.loadCanal();
    this.loadPlayList();
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

  loadPlayList() {
    //Abre tela de aguarde
    let loading = this.utilService.showLoading();
    loading.present();

    this.playListService.listar().then((response) => {
      this.playlists = response.json();

      //Fecha a tela de aguarde
      loading.dismiss();

    }).catch((response) => {

      loading.dismiss();

      this.utilService.showMessageError(response);

    });
  }

  salvar() {
    console.log(this.form.value);
    //Abre tela de aguarde
    let loading = this.utilService.showLoading();
    loading.present();

    this.videoService.adicionar(this.form.value).then((response) => {
      //Fecha a tela de aguarde
      loading.dismiss();

      this.utilService.showAlert("Operação realizada com sucesso!");
      this.navCtrl.pop();

    }).catch((response) => {
      loading.dismiss();
      this.utilService.showMessageError(response);
    });

  }

  cancelar() {
    this.navCtrl.pop();
  }

  showAddCanal() {
    let modal = this.modalCtrl.create('AdicionarCanalPage');

    modal.onDidDismiss(data => {
      this.loadCanal();
    });

    modal.present();
  }

  showAddPlayList() {
    let modal = this.modalCtrl.create('AdicionarPlayListPage');

    // evento que fecha o modal e prenche o canais
    modal.onDidDismiss(data => {
      this.loadPlayList();
    });

    modal.present();
  }


}
