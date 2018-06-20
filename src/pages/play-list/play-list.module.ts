import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PlayListPage } from './play-list';

@NgModule({
  declarations: [
    PlayListPage,
  ],
  imports: [
    IonicPageModule.forChild(PlayListPage),
  ],
})
export class PlayListPageModule {}
