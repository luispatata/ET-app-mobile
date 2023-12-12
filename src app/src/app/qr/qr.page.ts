import { Component, OnInit } from '@angular/core';

import { BarcodeScanner } from '@capacitor-community/barcode-scanner';



@Component({

  selector: 'app-qr',

  templateUrl: './qr.page.html',

  styleUrls: ['./qr.page.scss'],

})

export class QRPage implements OnInit {



  resultado:any



  constructor() { }



  ngOnInit() {

  }



  async escanear () {

    await BarcodeScanner.checkPermission({ force: true });

    BarcodeScanner.hideBackground();

    const result = await BarcodeScanner.startScan();

    if (result.hasContent) {

      this.resultado = result.content;

    }

  }



  async detener() {

    BarcodeScanner.showBackground();

    BarcodeScanner.stopScan();

  };



}