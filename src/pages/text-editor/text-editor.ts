import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ViewController } from 'ionic-angular';
import { FormControl, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { DomSanitizer } from '@angular/platform-browser';

/**
 * Generated class for the TextEditorPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-text-editor',
  templateUrl: 'text-editor.html',
})
export class TextEditorPage {
  textHtml;
  textWeb;
  item;
  cleanText;

  constructor(
    public navCtrl: NavController,
    public viewCtrl: ViewController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    private formBuilder: FormBuilder,
    private sanitizer: DomSanitizer
  ) {


    this.textHtml = this.navParams.get('textHtml');
    console.log('Texto recebido::', this.textHtml);
    this.textWeb = this.textHtml ? this.sanitizer.bypassSecurityTrustHtml(this.textHtml) : '';

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModalDetailPage');
  }

  ionViewWillLoad() {
    this.item = this.formBuilder.control('');
    this.cleanText = this.formBuilder.control('');
    this.cleanText.value = this.textHtml;
    this.item.value = this.textWeb;
  }

  save() {
   
    this.viewCtrl.dismiss({
      'dismissed': false,
      data: this.cleanText.value ? this.cleanText.value : this.textHtml
    });

  }

  onCloseModal() {
    this.viewCtrl.dismiss({ 'dismissed': true });
  }

}
