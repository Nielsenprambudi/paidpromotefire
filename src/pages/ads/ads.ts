import { Component } from '@angular/core';
import { AlertController, NavController, LoadingController, NavParams } from 'ionic-angular';
import { Camera } from '@ionic-native/camera';
import { AngularFirestore } from '@angular/fire/firestore';
import firebase from 'firebase';

@Component({
  selector: 'page-ads',
  templateUrl: 'ads.html'
})
export class AdsPage {

  idParams      : any;
  adsTitle      : '';
  adsDesc       : '';
  marketerType  : '';
  createAds : any;
  adsError  : any;
  bigImg = null;
  bigSize = '0';
  public myPhotosRef: any;
  public myPhoto: any;  

  constructor(public navCtrl: NavController,
    public alertCtrl: AlertController,
    public afs: AngularFirestore,
    public navParams: NavParams,
    private camera: Camera,
    public loadingCtrl: LoadingController
    ) {
      let userId = navParams.get('userId')
      let userParam = navParams.data.userid
      if (userId != undefined) {
        this.idParams = userId
      } else {
        this.idParams = userParam
      }
      console.log("user Id in ads", this.idParams)
      this.myPhotosRef = firebase.storage().ref('/uploadAds/');
  }

  // upload image
 
  selectPhoto(): void {
    this.camera.getPicture({
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: this.camera.DestinationType.DATA_URL,
      quality: 100,
      encodingType: this.camera.EncodingType.PNG,
    }).then(imageData => {

      // get image to throw into upload firebase
      this.myPhoto = imageData;
      // get image to throw into upload firebase

      // read the image as image
      let base64Data = 'data:image/jpeg;base64,' + imageData;
      this.bigImg = base64Data;
      this.bigSize = this.getImageSize(this.bigImg)
      // read the image as image
    }, error => {
      console.log("ERROR -> " + JSON.stringify(error));
    });
  }

  getImageSize(data_url) {
    // get size of image
    var head = 'data:image/jpeg;base64,';
    return ((data_url.length - head.length) * 3 / 4 / (1024*1024)).toFixed(4);
    // get size of image
  }

  // upload image



  // create ads

  submitAds() {
    this.createAds = this.afs.collection('ads');
    this.createAds.add({
      userId: this.idParams,
      adsTitle: this.adsTitle,
      adsDesc : this.adsDesc,
      marketerType: this.marketerType
    }, 
      error => this.adsError = error.message
    ).then(
      () => {
        this.myPhotosRef.child(this.idParams).child(this.adsTitle + '.png')
        .putString(this.myPhoto, 'base64', { contentType: 'image/png' })
        this.presentPrompt("Konfirmasi Berhasil", "Iklan berhasil terdaftar, apabila poin anda telah masuk maka iklan akan muncul tetapi apabila belum silahkan melakukan pembayaran atau menunggu konfirmasi dari administrator")        
      },
      () => {
        this.presentPrompt("Konfirmasi Gagal", "Iklan gagal terdaftar, silahkan periksa kembali jaringan internet anda atau hubungi administrator")
      }
    )

  }

  // create ads

  presentPrompt(titlePrompt, messagePrompt) {
    let nextStep = this.alertCtrl.create({
      title: titlePrompt,
      message: messagePrompt,
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            if (titlePrompt == "Konfirmasi Berhasil") {
              window.location.reload()
            }
            
          }
        }
      ]
    })
    nextStep.present()
  }
  

  

}
