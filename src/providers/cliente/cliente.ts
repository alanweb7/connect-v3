import { HTTP } from '@ionic-native/http';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ClienteProvider {
  //CHAMADA DA URL PRINCIPAL DA API
  private API_URL = 'https://kscode.com.br/ksc_2020/wp-json/admin/v1/users/login/'
  private CLIENTE_URL = 'https://kscode.com.br/ksc_2020/wp-json/admin/v1/users/codes?'
  private CUPOM_URL = 'https://kscode.com.br/ksc_2020/wp-json/admin/v1/users/cupom'
  constructor(
    public http: Http,
    public httpn: HTTP
  ) {

  }

  async UpdateAccount(first_name: String, last_name: String, avatar: String, user_email: String, nome_empresa: String, segmento_empresa: String, user_cep: String, estado_empresa: String, cidade_empresa: String, token: String, lang: String){
    let url = this.CLIENTE_URL;
    var data = {
      first_name: first_name,
      last_name: last_name,
      user_email: user_email,
      avatar: avatar,
      nome_empresa: nome_empresa,
      segmento_empresa: segmento_empresa,
      user_cep: user_cep,
      estado_empresa: estado_empresa,
      cidade_empresa: cidade_empresa,
      bloco: 9,
      token: token,
      lang: lang
    };

    let result = await this.httpn.post(url, data, {}).then((res) => {
      console.log('resultado dos contatos notificacao-push.ts: ', res);
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

    // return this.http.post(this.CLIENTE_URL, data).map((resp: Response) => resp.json());

  }
  async setPicture(picture: any, id: String){
    let url = this.API_URL + 'clients/picture';
    var data = {
      id: id,
      picture: picture
    };

    let result = await this.httpn.post(url, data, {}).then((res) => {
      console.log('setpicture cliente.ts: ', res);
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
    // return this.http.post(this.API_URL + 'clients/picture', data).map((resp: Response) => resp.json())
  }


  async login(username: String, password: String, lang: String) {
    let url = this.API_URL;
    let data = {
      username: username,
      password: password,
      lang: lang
    };
    let result = await this.httpn.post(url, data, {}).then((res) => {
      console.log('resultado do login: ', res);
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
  }

  async getinfConta(token: String){
    let url = this.CLIENTE_URL + 'token=' + token + '&bloco=9';
    let result = await this.httpn.get(url, {}, {}).then((res) => {
      console.log('resultado client.ts: ', res);
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

  async getSegmento(){
    let url = 'https://kscode.com.br/ksc_2020/wp-json/admin/v1/users/codes?segments=all';
    let result = await this.httpn.get(url, {}, {}).then((res) => {
      console.log('getSegmento cliente.ts: ', res);
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
  async forgotpass(email: String){
    let url = this.API_URL + 'clients/forgotpass';
    var data = {
      email: email
    };
    let result = await this.httpn.post(url, data, {}).then((res) => {
      console.log('resultado dos contatos notificacao-push.ts: ', res);
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
    // return this.http.post(this.API_URL + 'clients/forgotpass', data).map((resp: Response) => resp.json());
  }
  /////cupom
  getCupom(token: String) {
    let url = this.CUPOM_URL + "?token=" + token;
    return this.http.get(url).map((resp: Response) => resp.json());

  }
  getCupom_Date(token: String, data_init: String, data_fim: String) {
    let url = this.CUPOM_URL + "?data1=" + data_init + "&data2=" + data_fim + "&info=userby&token=" + token;
    return this.http.get(url).map((resp: Response) => resp.json());

  }
  async setConta(lang: String, token: String, action: String, banco: String, tp_conta: String, agencia: String, n_conta: String, titular: String, cpf: String) {
    let url = this.CUPOM_URL;
    var data = {
      token: token,
      action: action,
      banco: banco,
      tp_conta: tp_conta,
      agencia: agencia,
      n_conta: n_conta,
      titular: titular,
      cpf: cpf,
      lang: lang
    };

    let result = await this.httpn.post(url, data, {}).then((res) => {
      console.log('resultado dos contatos notificacao-push.ts: ', res);
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
    // return this.http.post(this.CUPOM_URL, data).map((resp: Response) => resp.json());
  }
}
