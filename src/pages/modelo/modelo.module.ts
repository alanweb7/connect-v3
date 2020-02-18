import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModeloPage } from './modelo';
import { ExpandableComponent } from "../../components/expandable/expandable";


@NgModule({
  declarations: [
    ModeloPage,
    ExpandableComponent
    ],
  imports: [
    IonicPageModule.forChild(ModeloPage),
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class ModeloPageModule {}
