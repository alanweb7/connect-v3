import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TextEditorPage } from './text-editor';
import { RichTextComponent } from '../../components/rich-text/rich-text';


@NgModule({
  declarations: [
    TextEditorPage,
    RichTextComponent
  ],
  imports: [
    IonicPageModule.forChild(TextEditorPage),
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class TextEditorPageModule {}
