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
  textHtml;
  dataTextEditor;
  textEscaped;
  htmlOrig;
  menu_midias;
  barMidias;

  audioContent = true;
  activeForm = true;

  meus_codes = [
    {code: 'vitoria', id: 1, views: 100},
    {code: 'otrher', id: 2, views: 100}
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

      this.barMidias = [
        { name: 'audio', icon: 'tools-audio', isActived: this.audioContent, action: 'audio' },
        { name: 'doc', icon: 'tools-doc', isActived: true, action: 'doc' },
        { name: 'hotspot', icon: 'tools-wifi', isActived: this.activeForm, action: 'hotspot' }
      ];
      
      let filterTools = [];
      for (let index = 0; index < this.barMidias.length; index++) {
        const element = this.barMidias[index];
        console.log('Está ativo: ', element.isActived);
        if(element.isActived){
          filterTools.push(element);
        }
      }

      this.barMidias = filterTools;

      this.menu_midias = [
        { name: menuNames.descricao, icon: 'list-box', icon_color: '#ffffff', bg_color: '#7044ff', action: 'descricao' },
        { name: menuNames.imagem, icon: 'camera', icon_color: '#ffffff', bg_color: '#d649c7', action: 'imagem' },
        { name: menuNames.doc, icon: 'clipboard', icon_color: '#ffffff', bg_color: '#ffdf44', action: 'doc' },
        { name: menuNames.contato, icon: 'contact', icon_color: '#ffffff', bg_color: '#ffb000', action: 'contato' },
        { name: menuNames.hotspot, icon: 'md-wifi', icon_color: '#ffffff', bg_color: '#52f100', action: 'hotspot' },
        { name: menuNames.link, icon: 'link', icon_color: '#ffffff', bg_color: '#24d6ea', action: 'link' },
        { name: menuNames.video, icon: 'videocam', icon_color: '#ffffff', bg_color: 'red', action: 'video' },
        { name: menuNames.audio, icon: 'mic', icon_color: '#ffffff', bg_color: '#ffd50a', action: 'audio' },

      ];



    })


  }

  presentProfileModal() {
    let profileModal = this.modalCtrl.create('TextEditorPage', { textHtml: this.dataTextEditor ? this.dataTextEditor : '' });
    profileModal.onDidDismiss(data => {
      console.log('Dados retornados do modal: ', data);


      if (!data.dismissed) {
        let html = data.data;
        // manter formato do HTML
        this.textHtml = this.sanitizer.bypassSecurityTrustHtml(html);
        this.dataTextEditor = data.data;
      }
      return;
    });
    profileModal.present();
  }

  getAction(action) {
    console.log('Ação clicada!: ', action);

    switch (action) {
      case 'audio':

        break;
      case 'doc':

        break;

      default:
        break;
    }
  }

  presentMidiaModal(action) {
    let infoData = {
      area: action
    };

    let profileModal = this.modalCtrl.create('MidiasPage', { infoData: infoData });
    profileModal.onDidDismiss(data => {
      console.log('Dados retornados do modal: ', data);

      if (!data.dismissed) {
        let html = 'Dados recebidos do modal';
      }
      return;
    });
    profileModal.present();
  }


  // ionViewWillLoad() {
  //   this.item = this.formBuilder.control('');
  // }

  escapeHtml() {

    this.htmlOrig = '<div><h2 style="text-align:center"> Olá Sou um texto!</h2></div>';
    let htmlEsc = this.htmlOrig;
    let text: any = {};

    this.textEscaped = this.encode(htmlEsc);
    text = this.sanitizer.bypassSecurityTrustUrl(htmlEsc);
    console.log('HTML Escapado: ', this.sanitizer.bypassSecurityTrustHtml(htmlEsc));
    console.log('URL Escapado: ', this.sanitizer.bypassSecurityTrustUrl(htmlEsc));
    console.log('Array Escapado: ', text.changingThisBreaksApplicationSecurity);
    console.log('Array Escapado: ', text.changingThisBreaksApplicationSecurity);
    console.log('JSON  Escapado: ', JSON.stringify(htmlEsc));
    console.log('Funcao escapar: ', this.encode(htmlEsc));
  }

  encode(str) {
    let buf = [];

    for (let i = str.length - 1; i >= 0; i--) {
      buf.unshift(['&#', str[i].charCodeAt(), ';'].join(''));
    }

    return buf.join('');
  }

  decode(str) {
    return str.replace(/&#(\d+);/g, function (match, dec) {
      return String.fromCharCode(dec);
    });
  }



}
