import { Component, OnInit } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { AlertController, NavController, Platform } from '@ionic/angular';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  user =""
  clave =""
  conexion: any

  constructor(
    private sqlite: SQLite, 
    private platform:Platform,
    private nav: NavController,
    private alert: AlertController) { }
  
  ngOnInit() {
    this.platform.ready().then(()=>{
      this.sqlite.create({
        name: 'data.db',
        location: 'default'
      })
        .then((db: SQLiteObject) => {
          this.conexion = db
          db.executeSql(
            'create table usuario(user VARCHAR(20) PRIMARY KEY, clave VARCHAR(12), nombre VARCHAR(32))', [])
            .then(() => console.log('Executed SQL'))
            .catch(e => console.log(e));
        })
        .catch(e => console.log(e));
    })
  }
login(){
  this.conexion.executeSql(
    'select * from usuario where user = ? and clave = ?',[this.user, this.clave])
    .then((resultados:any) => {
      if(resultados.rows.length > 0){
        let nombre = resultados.rows.item(0).nombre
        this.alerta("bienvenido "+ nombre,
         () => {
          localStorage.setItem("usuario", nombre)
         this.nav.navigateForward(['/home'])
        })
       }else{
        this.alerta("datos incorrectos!",()=>{})
       }
    })
    .catch((e: any) => console.log(e));

}
async alerta(texto:string, action:()=>void) {
  const alert = await this.alert.create({
    header: 'Aviso',
    subHeader: 'Important message',
    message: texto,
    buttons: [{
      text: "OK", handler: action
    }],
  });

  await alert.present();
}
}
