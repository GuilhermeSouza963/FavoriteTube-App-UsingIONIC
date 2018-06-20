import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AdicionarPlayListPage } from './adicionar-play-list';

@NgModule({
  declarations: [
    AdicionarPlayListPage,
  ],
  imports: [
    IonicPageModule.forChild(AdicionarPlayListPage),
  ],
})
export class AdicionarPlayListPageModule {}
