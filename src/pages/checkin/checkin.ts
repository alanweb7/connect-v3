import { FormBuilder, Validators } from '@angular/forms';
import { OneSignal } from '@ionic-native/onesignal';
import { AdminToolsDb } from './../../providers/admin-tools/admin-tools';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';

/**
 * Generated class for the CheckinPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-checkin',
  templateUrl: 'checkin.html',
})
export class CheckinPage {

     // configuracoes do hotspot
    public userHotspotForm: any;
    public emailHotspot: string;
    public passwordHotspot: string;
    public player_id: any;
    message = [];
    messageError: any = {};

    hotspotData = {
      isHotspotActive: false,
      isOnlyHotspot: false,
      isRegisterScreen: false,
      password: null,
      ssid: null
    };

    isConnected: boolean;
    hotSpotConnMens: string;
    hotspotActive: boolean;
    inConnect: boolean;
    activeForm: boolean = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private adminToolsdb: AdminToolsDb,
    private oneSignal: OneSignal,
    public platform: Platform,
    public formBuilder: FormBuilder,
  ) {

    this.setUserInDB();

    this.userHotspotForm = formBuilder.group({
      nome: ['', Validators.compose([Validators.minLength(4), Validators.maxLength(30),
      Validators.required])],
      email: ['', Validators.required],
      fone: ['', Validators.compose([Validators.minLength(6), Validators.maxLength(20),
      Validators.required])],
      idade: ['', ''],
      sexo: ['', ''],
    });


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CheckinPage');
  }

  async setUserInDB() {

    let user: any = await this.myPlayerIdOnesignal().then(async (player) => {
      let playeruser: any = {
        'player_id': this.player_id,
        'meta_key': 'Usuário Onesignal',
        'data': ''
      };
      return playeruser;
    });

    await this.adminToolsdb.insert(user);

  }

  async myPlayerIdOnesignal() {

    this.oneSignal.endInit();
    let player = await this.oneSignal.getIds().then((id) => {
      console.log(id.userId);
      console.log('OneSignal Player ID: ', id.userId);
    });

    this.player_id = player;

  }

}

export class User {

player_id: string

}
