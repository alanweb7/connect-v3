import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { Usuario } from './../../models/usuario.model';
import { SqliteHelperService } from '../sqlite-helper/sqlite-helper.service';
import { Platform } from 'ionic-angular';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';


@Injectable()

/*
  Generated class for the AdminToolsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AdminToolsDb {

  private db: SQLiteObject;
  private isFirstCall: boolean = true;


  constructor(
    public sqliteHelperService: SqliteHelperService,
    public platform: Platform,
    public sqlite: SQLite
  ) {

  }

  dropDatabase() {
    this.sqlite.deleteDatabase({ name: 'connect.db', location: 'default' });
  }

  public getDB() {
    return this.sqlite.create({
      name: 'connect.db',
      location: 'default'
    });
  }

  public createDatabase() {
    this.getDB()
      .then((db: SQLiteObject) => {
        this.createTables(db).then((resp) => {
          // this.insertDefaultItems(db);
        });

      })
      .catch(e => console.log(e));
  }


  private async createTables(db: SQLiteObject) {
    db.sqlBatch([
      ['CREATE TABLE IF NOT EXISTS users_push  (id integer primary key AUTOINCREMENT NOT NULL, player_id TEXT, meta_key TEXT, data TEXT)'],
      ['CREATE TABLE IF NOT EXISTS multi_data  (id integer primary key AUTOINCREMENT NOT NULL, name TEXT, data TEXT)'],
    ])
      .then((resp) => {
        console.log('tabelas criadas');
      })
      .catch(e => console.error('Erro ao criar as tabelas', e));
  }

  private insertDefaultItems(db: SQLiteObject) {
    db.executeSql('select COUNT(id) as qtd from users_push', [])
      .then((data: any) => {

        if (data.rows.item(0).qtd == 0) {
          db.sqlBatch([
            ['insert into users_push (player_id, meta_key, data) values (?,?,?)', ['player_id Onesignal', 'meta key da info', 'Dados Diversos']],
            ['insert into multi_data (name,data) values (?,?)', ['Nome do Usuário', 'Dados Diversos']],
          ])
            .then(() => console.log('Dados default incluídos com sucesso!'))
            .catch(e => console.error('Erro ao incluir os dados default', e));
        }
      })
      .catch(e => console.error('Erro ao consultar a qtd de radios', e));
  }


  // INSERIR DADOS NO BANCO

  public insert(user: User) {
    return this.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'insert into users_push (player_id, meta_key, data) values (?, ?, ?)';
        let data = [user.player_id, user.meta_key, user.data];

        let usersinDB = this.getAll();
        console.log('Usuários cadastrados neste banco: ', usersinDB);

        return db.executeSql(sql, data)
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }


  public update(user: User) {
    return this.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'update users_push set data = ? where player_id = ? AND meta_key = ?';
        let data = [user.data, user.player_id, user.meta_key];

        return db.executeSql(sql, data)
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }

  public remove(id: number) {
    return this.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'delete from products where id = ?';
        let data = [id];

        return db.executeSql(sql, data)
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }

  public get(id: number) {
    return this.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'select * from products where id = ?';
        let data = [id];

        return db.executeSql(sql, data)
          .then((data: any) => {
            if (data.rows.length > 0) {
              let item = data.rows.item(0);
              let user = new User();
              user.id = item.id;
              user.name = item.name;
              user.player_id = item.player_id;

              return user;
            }

            return null;
          })
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }

  public getAll(name: string = null) {
    return this.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'SELECT * FROM users_push';

        return db.executeSql(sql, [])
          .then((data: any) => {
            if (data.rows.length > 0) {
              let users: any[] = [];
              for (var i = 0; i < data.rows.length; i++) {
                var user = data.rows.item(i);
                users.push(user);
              }
              console.log('getAll usuários encontrados: ', users)
              return users;
            } else {
              return [];
            }
          })
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }

}

export class User {
  id: number;
  player_id: string;
  name: string;
  meta_key: string;
  data: string
}

@Injectable()
export class AdminToolsRest {

  constructor(
    public teste: AdminToolsDb,

  ) { }

  getApiRest($data) {

    console.log('Minha requisição API');
    let data = [
      {
        id: 1,
        nome: 'Alan Silva'
      },
      {
        id: 2,
        nome: 'Dione Silva'
      },
      {
        id: 3,
        nome: 'Dayane Silva'
      },
      {
        id: 4,
        nome: 'Davi Silva'
      },
    ];

    return data;

  }

}
