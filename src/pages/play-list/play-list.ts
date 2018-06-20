import { VideoServiceProvider } from './../../providers/video-service/video-service';
import { UtilServiceProvider } from './../../providers/util-service/util-service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-play-list',
  templateUrl: 'play-list.html',
})
export class PlayListPage {

  idPlayList : any;
  nomePlayList: string;
  videos : any[] = [];
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private utilService : UtilServiceProvider,
    private videoService : VideoServiceProvider) {
    this.idPlayList = this.navParams.get('idPlayList');
    this.nomePlayList = this.navParams.get('nomePlayList');
  }


  ionViewDidLoad() {
    this.loadVideos(this.idPlayList);
  }

  loadVideos(idPlayList: any) {
    //Abri a tela de aguarde
    let loading = this.utilService.showLoading();
    loading.present();

    //Chamei a API
    this.videoService.listarPorPlayList(idPlayList).then((response) => {
      //Populo minhas lista de videos em um array
      this.videos = response.json();

      //Fecho a tela de aguarde
      loading.dismiss();

    }).catch((response) => {

      this.utilService.showMessageError(response);
    });
  }

  compartilharFacebook(video){
    window.open('https://www.facebook.com/sharer.php?u=' + video.url);
  }

  playVideo(video : any){
    this.navCtrl.push('PlayVideoPage', {url: video.url, nomeVideo : video.titulo});
  }

}
