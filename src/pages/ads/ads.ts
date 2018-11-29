import { PackagePage } from './../package/package';
import { Component } from '@angular/core';
import { AlertController, NavController, LoadingController, ToastController } from 'ionic-angular';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { Camera, CameraOptions } from '@ionic-native/camera';

@Component({
  selector: 'page-ads',
  templateUrl: 'ads.html'
})
export class AdsPage {

  regType: any;
  marketerType: any;
  imageURI:any;
  imageFileName:any;  

  constructor(public navCtrl: NavController,
    public alertCtrl: AlertController,
    private transfer: FileTransfer,
    private camera: Camera,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController
    ) {
    this.regType = "vendor"
  }

  // upload image

  getImage() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    }
  
    this.camera.getPicture(options).then((imageData) => {
      this.presentToast(imageData);
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

  submitAds() {
    this.presentPrompt()
  }

  presentPrompt() {
    let nextStep = this.alertCtrl.create({
      title: 'Konfirmasi',
      message: 'Lanjutkan ke tahap pemilihan paket ?',
      buttons: [
        {
          text: 'Batal',
          handler: data => {
            console.log('Batal')
          }
        },
        {
          text: 'Ok',
          handler: data => {
            this.navCtrl.setRoot(PackagePage)
          }
        }
      ]
    })
    nextStep.present()
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
  

  

}