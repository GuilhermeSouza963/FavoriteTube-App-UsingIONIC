import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DomSanitizer } from '@angular/platform-browser';

/**
 * Generated class for the PlayVideoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-play-video',
  templateUrl: 'play-video.html',
})
export class PlayVideoPage {
  urlSecurity : any;
  nomeVideo: any;
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,    
    private domSanitizer : DomSanitizer) {
    let url = this.navParams.get('url');  
    this.nomeVideo = this.navParams.get('nomeVideo')
    this.urlSecurity = this.domSanitizer.bypassSecurityTrustResourceUrl(url);
  }

  ionViewDidLoad() {
  }

}
