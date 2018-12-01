import { Component } from '@angular/core';
import { NavController, AlertController, NavParams } from 'ionic-angular';

import { HomePage } from './../home/home';
import { AngularFirestore } from '@angular/fire/firestore';
import { AddUserService } from './../../services/adduser.service';
import { AuthService } from './../../services/auth.service';

@Component({
  selector: 'page-updatebio',
  templateUrl: 'updatebio.html'
})
export class UpdateBiodataPage {

  idParams: any;
  userData: any;
  updateUser: any;
  updateError: any;
  name      : any;
  email     : any;
  address   : any;
  city      : any;
  phoneNumb : any;
  regType   : any;
  username  : any;
  password  : any;

  

  constructor(public navCtrl: NavController,
    public navParams: NavParams, 
    public afs: AngularFirestore,
    private addUserService: AddUserService,
    private auth: AuthService,
    public alertCtrl: AlertController
    ) {
        let userId = navParams.get('userId')
        this.idParams = userId
        console.log("user Id in update biodata", this.idParams)
        this.getBiodata(this.idParams)
  }

//   get first biodata to see the value

  getBiodata(id) {
    this.userData = this.afs.collection<any>('users').doc(id);
    this.userData.get().subscribe(x => {
      if(x.exists) {
            let type = x.data()
            this.name = type.name;
            this.address = type.address;
            this.city = type.city;
            this.phoneNumb = type.phoneNumb;
            this.email = type.email;
            this.regType = type.regType;
            this.username = type.username;
            this.password = type.password;
            console.log("document data:", this.name);
          } else {
            console.log("no such document")
          }
    })
  }

//   get first biodata to see the value


// update biodata

  updateBio() {
    this.updateUser = this.afs.doc<any>('users' + '/' + this.idParams)
    this.updateUser.update({
        name: this.name,
        address: this.address,
        city: this.city,
        username: this.username
    },
      error => this.updateError = error.message
    ).then(
      () => {
        this.presentPrompt("Konfirmasi Berhasil", "Biodata sukses diperbaharui")
      },
      () => {
        this.presentPrompt("Konfirmasi Gagal", "Biodata gagal diperbaharui mohon cek kembali jaringan internet atau hubungi administrator")
      }
    )
    
  }

// update biodata

  presentPrompt(titlePrompt, messagePrompt) {
    let nextStep = this.alertCtrl.create({
      title: titlePrompt,
      message: messagePrompt,
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            if(titlePrompt == "Konfirmasi Berhasil"){
              window.location.reload()
            }
          }
        }
      ]
    })
    nextStep.present()
  }
  

}
