import { Camera } from '@ionic-native/camera';
import { LoginPage } from './../login/login';
import { PackagePage } from './../package/package';
import { AdsPage } from './../ads/ads';
import { Component, NgZone} from '@angular/core';
import { ModalController, AlertController, NavController, LoadingController, ToastController, NavParams} from 'ionic-angular';
import { AuthService } from './../../services/auth.service';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs-compat';
import { UpdateBiodataPage } from './../updatebiodata/updatebio';
import firebase from 'firebase';
import * as moment from 'moment';
import { async } from 'rxjs/internal/scheduler/async';

@Component({
  selector: 'page-vendorprofile',
  templateUrl: 'vendorprofile.html'
})
export class VendorProfilePage {
  userIdent: any;
  regType: any;
  name: string;
  address: string;
  city: string;
  phoneNumb: any;
  getpoint: any;
  thispoint: any;
  getName: any;
  public img: string;
  bigImg = null;
  bigSize = '0';
  create = moment().format("DD MMM YYYY HHmmss");
  packAds: AngularFirestoreCollection<any>;
  ads: Observable<any[]>;
  public myPhotosRef: any;
  public myPhotoAdsRef: any;
  public myPhoto: any;

  constructor(public navCtrl: NavController,
    public zone: NgZone,
    public modalCtrl: ModalController,
    public afs: AngularFirestore,
    public auth: AuthService,
    public camera: Camera,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController) {
      this.userIdent = navParams.data;
      this.getBiodata(this.userIdent);
      this.getPackagePoint(this.userIdent);
      this.getpoint = 0;
      this.myPhotosRef = firebase.storage().ref('/uploadPay/');
      this.myPhotoAdsRef = firebase.storage().ref('/uploadAds/');
      this.packAds = this.afs.collection('ads', ref => ref.where('userId', '==', this.userIdent.userid).orderBy('create', 'asc'));
      this.ads = this.packAds.valueChanges();
      
  }

  

  // get Biodata
  
  getBiodata(profile) {
    const type = this.afs.collection<any>('users').doc(profile.userid);
    type.get().subscribe(x => {
      if(x.exists) {
            let type = x.data()
            this.name = type.name;
            this.address = type.address;
            this.city = type.city;
            this.phoneNumb = type.phoneNumb;
          } else {
            console.log("no such document")
          }
    })
  }

  // get Biodata

  // get point

  getPackagePoint(profile) {
    const packId = this.afs.collection<any>('transaction').doc(profile.userid);
    packId.get().subscribe(x => {
      if(x.exists) {
        let pack = x.data();
        if(pack.status != "Pending") {
          const id = this.afs.collection('package', ref => ref.where('packageId', '==', pack.packageId))
          const packageItem = id.valueChanges()
          packageItem.subscribe(y => 
            y.map(
                z => 
                {
                  this.thispoint = z
                  this.getpoint = this.thispoint.point;
                }
              )
          )
        }
      }
    })
  }

  // get point

  // update Biodata

  updateBio() {
    this.navCtrl.push(UpdateBiodataPage, {userId : this.userIdent.userid})
  }

  // update Biodata

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
 
  uploadPhoto(): void {
    this.myPhotosRef.child(this.userIdent.userid).child(this.create + '.png')
      .putString(this.myPhoto, 'base64', { contentType: 'image/png' })
      .then(() => {
        this.presentPrompt("Konfirmasi", "Bukti pembayaran berhasil di upload, harap menunggu dalam waktu kurang lebih 24 jam")
      },
      () => {
        this.presentPrompt("Gagal", "Bukti pembayaran tidak berhasil di upload, harap periksa kembali jaringan internet anda atau hubungi administrator")
      }
      );
  }

  // upload image

  // ads detil

  adsDetil(userAds, createAds) {
    this.navCtrl.push(AdsPage, {
      adTitle : userAds,
      adCreate : createAds,
      userId: this.userIdent.userid
    })
  }

  // ads detil

  // ads delete

  adsDelete(createAds) {
    let ads = this.afs.doc<any>('ads' + '/' + createAds);
    ads.delete().then(() => {
        this.presentPrompt("Konfirmasi Berhasil", "Data anda berhasil dihapus")
    }).catch(() => {
      this.presentPrompt("Gagal", "Data anda gagal dihapus, silahkan cek kembali jaringan internet anda atau hubungi administrator")
    })

    
  }

  // ads delete

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

  backToAds() {
    this.navCtrl.push(AdsPage, {userId : this.userIdent.userid})
  }

  backToPackage() {
    this.navCtrl.push(PackagePage, {userId : this.userIdent.userid})
  }

  logOut() {
    this.auth.logOut()
    this.navCtrl.setRoot(LoginPage)
  }

}
