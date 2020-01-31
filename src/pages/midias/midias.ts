import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ViewController } from 'ionic-angular';

/**
 * Generated class for the MidiasPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-midias',
  templateUrl: 'midias.html',
})
export class MidiasPage {

  infoData:any = {};
  headerStyle;
  title_page;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public viewCtrl: ViewController
    ) {

      this.infoData = this.navParams.get('infoData');
      console.log('Dados recebidos no modal: ', this.infoData);

      if(this.infoData.area == 'audio'){

        this.headerStyle = {
          'background': 'url(../../assets/imgs/back_audio.png)'
        }

        this.title_page = 'Galeria de Áudios';
        
      }
      else if(this.infoData.area == 'doc'){

        this.headerStyle = {
          'background': 'url(../../assets/imgs/back_doc.png)'
        }
        this.title_page = 'Galeria de Documentos';
        
      }
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MidiasPage');
  }

  onCloseModal() {
    let data = { 'foo': 'bar' };
    this.viewCtrl.dismiss(data);
  }

}
