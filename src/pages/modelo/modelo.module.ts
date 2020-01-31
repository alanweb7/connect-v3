import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModeloPage } from './modelo';


@NgModule({
  declarations: [
    ModeloPage,
    ],
  imports: [
    IonicPageModule.forChild(ModeloPage),
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class ModeloPageModule {}
