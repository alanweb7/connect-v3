import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { UtilService } from '../../providers/util/util.service';
import { FormGroup, FormControl } from '@angular/forms';


/**
 * Generated class for the DebugPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-debug',
  templateUrl: 'debug.html',
})
export class DebugPage {

  public findchannel: FormGroup;
  public infoData;
  public terms;
  public response;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public util: UtilService,
    private platform: Platform,
  ) {

    this.findchannel = new FormGroup({

      channel: new FormControl('vitoria', []),
      url: new FormControl('https://kscode.com.br/ksc_2020/wp-json/code/search/?code_number=vitoria', []),
      method: new FormControl('get', []),
      data: new FormControl('{"bloco":1}', []),
      header: new FormControl('', []),

    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DebugPage');
  }

  onSubmit() {
    let terms = this.findchannel.value;
    let sendData = terms.data ? JSON.stringify(JSON.parse(terms.data)) : {};
    let header = terms.header ? JSON.parse(terms.header) : {};

    let infoData = {
      url: terms.url,
      method: terms.method,
      data: {data:sendData, info:'extra_info'},
      header: header,
    }

    this.infoData = JSON.stringify(infoData);
    this.terms = JSON.stringify(terms);
    
    console.log('Minha pesquisa', terms);
    console.log("Dados para envio: ", infoData);




    this.util.getApiconnect(infoData).then((response) => {

      console.log('Retorno: ', response);
      this.response = JSON.stringify(response);

    }).catch((e) => {
      console.log('Error: ', e);

    })

  }

}
