import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AdicionarCanalPage } from './adicionar-canal';

@NgModule({
  declarations: [
    AdicionarCanalPage,
  ],
  imports: [
    IonicPageModule.forChild(AdicionarCanalPage),
  ],
})
export class AdicionarCanalPageModule {}
