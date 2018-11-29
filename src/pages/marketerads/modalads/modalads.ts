import { Component } from '@angular/core';
import { NavController, LoadingController, ToastController, ViewController } from 'ionic-angular';
import { FileTransfer } from '@ionic-native/file-transfer';
import { Camera, CameraOptions } from '@ionic-native/camera';

@Component({
  selector: 'page-modalads',
  templateUrl: 'modalads.html'
})
export class ModalAdsPage {

  regType: any;
  imageURI:any;
  imageFileName:any;  

  constructor(public navCtrl: NavController,
    public viewCtrl: ViewController,
    private transfer: FileTransfer,
    private camera: Camera,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController
    ) {
    this.regType = "vendor"
  }

  // get image

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

  // get image


  dismiss() {
      this.viewCtrl.dismiss()
  }

  agree() {
      this.presentToast("Anda Menerima Pekerjaan ini")
      this.viewCtrl.dismiss()
  }

  reject() {
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
  

  

}
