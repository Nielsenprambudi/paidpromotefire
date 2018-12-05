import { Component, NgZone } from '@angular/core';
import { AlertController, NavController, LoadingController, NavParams } from 'ionic-angular';
import { Camera } from '@ionic-native/camera';
import { AngularFirestore } from '@angular/fire/firestore';
import firebase from 'firebase';
import * as moment from 'moment';

@Component({
  selector: 'page-ads',
  templateUrl: 'ads.html'
})
export class AdsPage {

  idParams      : any;
  adsTitle      : '';
  adsDesc       : '';
  marketerType  : '';
  create = moment().format("DD MMM YYYY HH:mm:ss");
  update = moment().format("DD MMM YYYY HH:mm:ss");
  createAds : any;
  createEdit: any;
  theAds: any;
  adsError  : any;
  typeDisable : boolean;
  createable: boolean;
  editable: boolean;
  bigImg = null;
  bigSize = '0';
  public img: any;
  public myPhotosRef: any;
  public myPhoto: any;  

  constructor(public navCtrl: NavController,
    public zone: NgZone,
    public alertCtrl: AlertController,
    public afs: AngularFirestore,
    public navParams: NavParams,
    private camera: Camera,
    public loadingCtrl: LoadingController
    ) {
      let userId = navParams.get('userId');
      let adTitle = navParams.get('adTitle');
      let adCreate = navParams.get('adCreate');
      let userParam = navParams.data.userid;
      if (userId != undefined) {
        this.idParams = userId
      } else {
        this.idParams = userParam
      }
      if(adTitle != undefined && adCreate != undefined) {
        this.getAds(adTitle)
        this.typeDisable = true;
        this.createable = false;
        this.editable = true;
      } else {
        this.typeDisable = false;
        this.createable = true;
        this.editable = false;
      }
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
      this.uploadPhoto();
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

  uploadPhoto(): void {
    this.myPhotosRef.child(this.idParams).child(this.adsTitle + '.png')
      .putString(this.myPhoto, 'base64', { contentType: 'image/png' })
      // this.getImage()
      
  }

  getImage() {
    try{
      this.myPhotosRef.child(this.idParams).child(this.adsTitle + '.png').getDownloadURL().then((url) => {
        this.zone.run(() => {
          this.img = url
        })
      });
    }
    catch(e){
      console.log(e);
    } 
  }

  // upload image



  // create ads

  submitAds() {
    this.myPhotosRef.child(this.idParams).child(this.adsTitle + '.png').getDownloadURL().then((url) => {
      this.zone.run(() => {
        this.img = url
        this.createAds = this.afs.doc<any>('ads' + '/' + this.create);
        this.createAds.set({
          userId: this.idParams,
          adsTitle: this.adsTitle,
          adsDesc : this.adsDesc,
          adsImg: this.img,
          marketerType: this.marketerType,
          create: this.create,
          update: ""
        },
        error => this.adsError = error.message
        )
      })
      this.presentPrompt("Konfirmasi Berhasil", "Iklan berhasil terdaftar, apabila poin anda telah masuk maka iklan akan muncul tetapi apabila belum silahkan melakukan pembayaran atau menunggu konfirmasi dari administrator")  
    });
    
  }

  // create ads

  // edit ads

  editAds() {
    let ads = this.afs.doc<any>('ads' + '/' + this.createEdit);
    ads.update({
        adsTitle: this.adsTitle,
        adsDesc: this.adsDesc,
        update: this.update
    }).then(() => {
            this.presentPrompt("Konfirmasi Berhasil", "Iklan anda berhasil diperbaharui")
        }).catch(() => {
            this.presentPrompt("Gagal", "Silahkan cek kembali jaringan internet anda atau hubungi administrator")
        })
  }

  // edit ads



  //   get all title, desc, and photo of ads

  getAds(adTitle) {
    let ads = this.afs.collection('ads', ref => ref.where('adsTitle', '==', adTitle));
    let argument = ads.valueChanges();
    argument.subscribe(x => 
        x.map(
            y => {
                this.theAds = y;
                this.adsTitle = this.theAds.adsTitle;
                this.adsDesc = this.theAds.adsDesc;
                this.bigImg = this.theAds.adsImg;
                this.marketerType = this.theAds.marketerType;
                this.createEdit = this.theAds.create; 
                
            }
        )
    )


    
    
  }


  //   get all title, desc, and photo of ads

  

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
