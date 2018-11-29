import { VendorProfilePage } from './../vendorprofile/vendorprofile';
import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';

@Component({
  selector: 'page-package',
  templateUrl: 'package.html'
})
export class PackagePage {

  regType: any;

  constructor(public navCtrl: NavController, public alertCtrl: AlertController) {
    this.regType = "vendor"
  }
  

  submitPackageMini() {
    alert("you have mini package")
    this.presentPrompt();
  }

  submitPackageMedium() {
    alert("you have medium package")
    this.presentPrompt();
  }

  submitPackageMax() {
    alert("you have max package")
    this.presentPrompt();
  }

  presentPrompt() {
    let nextStep = this.alertCtrl.create({
      title: 'Konfirmasi',
      message: 'Lanjutkan ke tahap unggah bukti transfer ?',
      buttons: [
        {
          text: 'Nanti',
          handler: data => {
            console.log('Batal')
          }
        },
        {
          text: 'Ok',
          handler: data => {
            this.navCtrl.setRoot(VendorProfilePage)
          }
        }
      ]
    })
    nextStep.present()
  }

}
