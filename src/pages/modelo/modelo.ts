import { Chooser } from '@ionic-native/chooser';
import { Component, SecurityContext } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { FormControl, FormBuilder, FormGroup } from "@angular/forms";

import { ModalController, ViewController } from 'ionic-angular';
import { DomSanitizer } from '@angular/platform-browser';


/**
 * Generated class for the ModeloPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-modelo',
  templateUrl: 'modelo.html',
})
export class ModeloPage {

  items: any = [];
  itemExpandHeight: number = 100;

  textModelo = "Outras informações relevantes como endereço e tudo mais. Podemos colocar várias linhas aqui";
  textHtml;
  dataTextEditor;
  textEscaped;
  htmlOrig;
  menu_midias;
  barMidias;

  audioContent = true;
  activeForm = true;
  iconCurrent = 'ios-arrow-dropdown'; //ios-arrow-dropup
  styleListOpen;
  styleListClosed;

  meus_codes = [
    { code: 'vitoria', id: 1, views: 100 },
    { code: 'otrher', id: 2, views: 100 }
  ];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private chooser: Chooser,
    private formBuilder: FormBuilder,
    public modalCtrl: ModalController,
    private sanitizer: DomSanitizer,
    private platform: Platform,
  ) {


    this.platform.ready().then(() => {
      // dados do novo menu
      // this.tools.dismissAll();
      let menuNames = {
        descricao: 'Descrição',
        imagem: 'Imagens',
        doc: 'Documentos',
        contato: 'Contatos',
        hotspot: 'HOTSOT',
        link: 'link',
        video: 'Videos',
        audio: 'AUDIO',
      };


    });
  }
}
