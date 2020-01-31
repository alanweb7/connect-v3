import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MidiasPage } from './midias';

@NgModule({
  declarations: [
    MidiasPage,
  ],
  imports: [
    IonicPageModule.forChild(MidiasPage),
  ],
})
export class MidiasPageModule {}
