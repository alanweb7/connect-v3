import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MenuCodePage } from './menu-code';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from "@angular/common/http";

import { ExpandableComponent } from "../../components/expandable/expandable";

@NgModule({
  declarations: [
    MenuCodePage,
    ExpandableComponent
  ],
  providers: [

  ],
  imports: [
    IonicPageModule.forChild(MenuCodePage),
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MenuCodePageModule { }
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
