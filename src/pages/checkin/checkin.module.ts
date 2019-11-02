import { OneSignal } from '@ionic-native/onesignal';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CheckinPage } from './checkin';
import { BrMaskerModule } from 'brmasker-ionic-3';

@NgModule({
  declarations: [
    CheckinPage,
  ],
  imports: [
    BrMaskerModule,
    IonicPageModule.forChild(CheckinPage),
  ],
  providers:[
    OneSignal,
  ]
})
export class CheckinPageModule {}
