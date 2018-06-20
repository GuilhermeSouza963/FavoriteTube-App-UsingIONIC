import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { UtilServiceProvider } from '../providers/util-service/util-service';
import { VideoServiceProvider } from '../providers/video-service/video-service';
import { HttpModule } from '@angular/http';
import { UsuarioServiceProvider } from '../providers/usuario-service/usuario-service';
import { CanalServiceProvider } from '../providers/canal-service/canal-service';
import { PlayListServiceProvider } from '../providers/play-list-service/play-list-service';

@NgModule({
  declarations: [
    MyApp,
    HomePage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UtilServiceProvider,
    VideoServiceProvider,
    UsuarioServiceProvider,
    CanalServiceProvider,
    PlayListServiceProvider,
    VideoServiceProvider
  ]
})
export class AppModule {}
