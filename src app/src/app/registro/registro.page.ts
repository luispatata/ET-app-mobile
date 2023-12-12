import { Component } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { AlertController, Platform } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage {
  nombre = '';
  user = '';
  clave = '';
  conexion: any;

  constructor(
    private sqlite: SQLite,
    private platform: Platform,
    private alert: AlertController,
    private router: Router
  ) {}

  

  registrar() {
    if (this.conexion) { // Verifica si la conexión está establecida
      if (this.nombre.length < 3){
        this.mostrarAlerta('El nombre no puede quedar vacio')
      }
       else if (this.user.length < 5) {
        this.mostrarAlerta('El nombre de usuario debe tener al menos 5 caracteres.');
      } else if (!this.clave.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)) {
        this.mostrarAlerta('La contraseña debe tener al menos 8 caracteres e incluir al menos una mayúscula, una minúscula, un carácter especial y un número.');
      } else {
        this.conexion.executeSql('insert into usuario values (?,?,?)', [this.user, this.clave, this.nombre])
          .then(() => {
            this.mostrarAlerta('Usuario agregado!');
            this.router.navigate(['/login']);
          })
          .catch((e: any) => console.log(e));
      }
    } else {
      // Manejar el caso en que la conexión no se ha establecido correctamente
      this.mostrarAlerta('Error en la conexión a la base de datos');
    }
  }
  async mostrarAlerta(texto: string) {
    const alert = await this.alert.create({
      header: 'Aviso',
      subHeader: 'Mensaje importante',
      message: texto,
      buttons: ['OK'],
    });

    await alert.present();
  }
  ngOnInit() {
    this.platform.ready().then(() => {
      this.sqlite.create({
        name: 'data.db',
        location: 'default'
      })
      .then((db: SQLiteObject) => {
        this.conexion = db;
      })
      .catch(e => console.log(e));
    });
  }
}
