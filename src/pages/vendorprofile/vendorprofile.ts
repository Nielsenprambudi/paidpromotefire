import { PackagePage } from './../package/package';
import { AdsPage } from './../ads/ads';
import { Component } from '@angular/core';
import { AlertController, NavController, LoadingController, ToastController, NavParams } from 'ionic-angular';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

@Component({
  selector: 'page-vendorprofile',
  templateUrl: 'vendorprofile.html'
})
export class VendorProfilePage {

  userIdent: any;
  regType: any;
  imageURI:any;
  imageFileName:any; 
  name: string;
  address: string;
  city: string;
  phoneNumb: any;

  constructor(public navCtrl: NavController,
    public afs: AngularFirestore,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    private transfer: FileTransfer,
    private camera: Camera,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController) {
      this.userIdent = navParams.data
      this.getBiodata(this.userIdent)
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
            // console.log("document data:", type.regType);
          } else {
            console.log("no such document")
          }
    })
  }


  // get Biodata

  // upload image

  getImage() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    }
  
    this.camera.getPicture(options).then((imageData) => {
      this.imageURI = imageData;
    }, (err) => {
      console.log(err);
      this.presentToast(err);
    });
  }

  uploadFile() {
    let loader = this.loadingCtrl.create({
      content: "Uploading..."
    });
    loader.present();
    const fileTransfer: FileTransferObject = this.transfer.create();
  
    let options: FileUploadOptions = {
      fileKey: 'ionicfile',
      fileName: 'ionicfile',
      chunkedMode: false,
      mimeType: "image/jpeg",
      headers: {}
    }
  
    fileTransfer.upload(this.imageURI, 'http://192.168.0.7:8080/api/uploadImage', options)
      .then((data) => {
      console.log(data+" Uploaded Successfully");
      this.imageFileName = "http://192.168.0.7:8080/static/images/ionicfile.jpg"
      loader.dismiss();
      this.presentToast("Image uploaded successfully");
    }, (err) => {
      console.log(err);
      loader.dismiss();
      this.presentToast(err);
    });
  }

  // upload image

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

  backToAds() {
    this.navCtrl.push(AdsPage)
  }

  backToPackage() {
    this.navCtrl.push(PackagePage)
  }

  logOut() {
    window.location.reload();
  }

}
