import { UpdateBiodataPage } from './../../updatebiodata/updatebio';
import { Component, NgZone } from '@angular/core';
import { NavController, AlertController, LoadingController, ToastController, ViewController, NavParams} from 'ionic-angular';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import * as moment from 'moment';
import firebase from 'firebase';

@Component({
  selector: 'page-modalvendorads',
  templateUrl: 'modalvendorads.html'
})
export class ModalVendorAdsPage {

  theAds: any;
  docId: any;
  userId: any;
  regAds: any;
  createAds: any;
  adsTitle: any;
  changeAdsTitle: any;
  adsDesc: any;
  changeAdsDesc: any;
  img: any;
  update = moment().format("DD MMM YYYY HHmmss");
  public myPhotoAdsRef: any;
    

  constructor(public navCtrl: NavController,
    public alertCtrl: AlertController,
    public viewCtrl: ViewController,
    public zone : NgZone,
    public navParams: NavParams, 
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public afs: AngularFirestore,
    ) {
    this.regAds = this.navParams.get("adTitle");
    this.userId = this.navParams.get("userId");
    this.createAds = this.navParams.get("adCreate");
    this.myPhotoAdsRef = firebase.storage().ref('/uploadAds/');
    this.getAds()
  }

  


  dismiss() {
      this.viewCtrl.dismiss()
  }

//   get all title, desc, and photo of ads

  getAds() {
    let ads = this.afs.collection('ads', ref => ref.where('adsTitle', '==', this.regAds));
    let argument = ads.valueChanges();
    argument.subscribe(x => 
        x.map(
            y => {
                this.theAds = y;
                this.adsTitle = this.theAds.adsTitle;
                this.adsDesc = this.theAds.adsDesc;
                this.img = this.theAds.adsImg;
                
            }
        )
    )


    
    
  }


  //   get all title, desc, and photo of ads

  editAds() {
    let updateAds = this.alertCtrl.create({
        title: "Ubah Iklan",
        message: "Ubah judul dan deskripsi mengenai iklan anda",
        inputs: [
            {
                name: 'adstitle',
                placeholder: 'Judul Iklan' + this.adsTitle,
                value: this.changeAdsTitle
            },
            {
                name: 'adsdesc',
                placeholder: 'Deskripsi Iklan' + this.adsDesc,
                value: this.changeAdsDesc
            }
        ],
        buttons: [
            {
                text: 'Batal',
                handler: data => {
                    console.log("cancel")
                }
            },
            {
                text: 'Submit',
                handler: data => {
                    let ads = this.afs.doc<any>('ads' + '/' + this.createAds);
                    ads.update({
                        adsTitle: this.changeAdsTitle,
                        adsDesc: this.changeAdsDesc,
                        update: this.update
                    }).then(() => {
                            this.presentPrompt("Konfirmasi Berhasil", "Iklan anda berhasil diperbaharui")
                        }).catch(() => {
                            this.presentPrompt("Gagal", "Silahkan cek kembali jaringan internet anda atau hubungi administrator")
                        })
                }
            }

        ]
    })
    
    
    updateAds.present();
    

  }

  deleteAds() {
      this.presentToast("Anda Menolak Pekerjaan ini")
      this.viewCtrl.dismiss()
  }

  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'bottom'
    });
  
    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });
  
    toast.present();
  }

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
