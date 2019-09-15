import { HTTP } from '@ionic-native/http';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Loading, LoadingController } from 'ionic-angular';
import { Base64 } from '@ionic-native/base64';
import { File } from '@ionic-native/file';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';

@Injectable()
export class UtilService {
  loading: Loading;
  APP_URL_PAIS = 'https://kscode.com.br/ksc_2020/wp-json/admin/v1/users/codes?countries=all'
  constructor(public http: Http,
    public loadingCtrl: LoadingController,
    private base64: Base64,
    public file: File,
    public httpn: HTTP
  ) {
    console.log('Hello UtilProvider Provider');
  }

  async getPaisALL() {
    let url = this.APP_URL_PAIS;
    let result = await this.httpn.get(url, {}, {}).then((res) => {
      console.log('resultado da pesquisa: ', res);
      let response = JSON.parse(res.data);
      return response;
    }).catch((err: any) => {
      let erroStatus = err.status;
      let response = {
        'error': 'ocorreu_um_erro',
        'status': erroStatus,
      };
      console.log('Erro em getAll:: ', err);
      console.log('result em getAll:: ', result);
      return response;
    });
    return result;
    // return this.http.get(url).map((resp:Response)=> resp.json());
  }
  createNewFileName(oldFileName: String): String {
    let extension: string = oldFileName.substr(oldFileName.lastIndexOf('.')); // .png, .jpg
    return new Date().getTime() + extension; // 1264546456.jpg
  }
  getExtension(file: String): String {
    let extension: string = file.substr(file.lastIndexOf('.')); // .png, .jpg
    return extension; // .jpg
  }
  converterBase64(file): Promise<String> {

    let base64Image = this.base64.encodeFile(file).then(base64File => base64File)
      .catch((error: Error) => console.log(`Error updating ${name} movie!`, error));
    return <Promise<String>>base64Image;
  }

  showLoading(msg) {
    this.loading = this.loadingCtrl.create({
      content: msg,
      cssClass: "loadingInterna"
    });
    this.loading.present();
  }
  async getCEP(cep){
    let url = '  https://api.postmon.com.br/v1/cep/' + cep;
    let result = await this.httpn.get(url, {}, {}).then((res) => {
      console.log('resultado do code.ts MENU CODE: ', res);
      let response = JSON.parse(res.data);
      return response;
    }).catch((err: any) => {
      let erroStatus = err.status;
      let response = {
        'error': 'ocorreu_um_erro',
        'status': erroStatus,
      };
      console.log('Erro em getAll:: ', err);
      console.log('result em getAll:: ', result);
      return response;
    });
    return result;
    // return this.http.get(url).map((resp: Response) => resp.json());
  }

}
