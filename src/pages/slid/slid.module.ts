import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SlidPage } from './slid';


@NgModule({
  declarations: [
    SlidPage,
  ],
  imports: [
    IonicPageModule.forChild(SlidPage),
  ],
})
export class SlidPageModule {}
