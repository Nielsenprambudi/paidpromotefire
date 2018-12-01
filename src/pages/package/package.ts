import { Component } from '@angular/core';
import { ModalController, NavController, AlertController, NavParams } from 'ionic-angular';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AddUserService } from './../../services/adduser.service';
import { AuthService } from './../../services/auth.service';
import { Observable } from 'rxjs-compat';


@Component({
  selector: 'page-package',
  templateUrl: 'package.html'
})
export class PackagePage {

  idParams: any;
  createPackage: any;
  packItem: AngularFirestoreCollection<any>;
  items: Observable<any[]>;
  

  constructor(public navCtrl: NavController,
    public modalCtrl: ModalController, 
    public alertCtrl: AlertController,
    public navParams: NavParams, 
    public afs: AngularFirestore,
    private addUserService: AddUserService,
    private auth: AuthService,) {
      let userId = navParams.get('userId')
      this.idParams = userId
      console.log("user Id in package", this.idParams)
      this.packItem = this.afs.collection('package', ref => ref.orderBy('point'));
      this.items = this.packItem.valueChanges();
      console.log(this.items)
          
  }
  

  submitPackage(packageid) {
    console.log(packageid)
    this.createPackage = this.afs.collection('transaction')
    this.createPackage.add({
      userId: this.idParams,
      packageId: packageid,
      status: "Pending"
    }).then(
      () => {
        this.presentPrompt("Konfirmasi Pending", "Transaksi telah tersimpan, silahkan kembali ke halaman profile untuk unggah bukti pembayaran anda")
      },
      () => {
        this.presentPrompt("Gagal", "Silahkan cek kembali jaringan internet anda atau hubungi administrator")
      }
    )
  }

  presentPrompt(titlePrompt, messagePrompt) {
    let nextStep = this.alertCtrl.create({
      title: titlePrompt,
      message: messagePrompt,
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            window.location.reload()
          }
        }
      ]
    })
    nextStep.present()
  }

}
