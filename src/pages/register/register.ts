import { HomePage } from './../home/home';
import { AngularFirestore } from '@angular/fire/firestore';
import { AddUserService } from './../../services/adduser.service';
import { AuthService } from './../../services/auth.service';
import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import firebase from 'firebase';

@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class RegisterPage {

  public recaptchaVerifier : firebase.auth.RecaptchaVerifier;
  signupError: string;
  verifyCode: any;
  applicationVerify: any;
  userID    : any;
  createUser: any;
  name      : '';
  email     : '';
  address   : '';
  city      : '';
  phoneNumb : '';
  regType   : '';
  username  : '';
  password  : '';

  ionViewDidLoad() {
    this.recaptchaVerifier = new firebase.auth.RecaptchaVerifier("recaptcha-container");
  } 

  constructor(public navCtrl: NavController, 
    public afs: AngularFirestore,
    private addUserService: AddUserService,
    private auth: AuthService,
    public alertCtrl: AlertController
    ) {
      this.recaptchaVerifier
  }

  // submit register
  register() {
    let credentials = {
        userID: this.userID,
        name: this.name,
        email: this.email,
        address: this.address,
        city: this.city,
        phoneNumb: "+62" + this.phoneNumb,
        regType: this.regType,
        username: this.username,
        password: this.password
    }

    console.log(credentials)

    this.auth.signUp(credentials).then(
      () => {
        this.userID = this.auth.getID()
        this.createUser = this.afs.doc<any>('users' + '/' + this.userID)
        this.createUser.set({
          userID: this.userID,
          name: credentials.name,
          email: credentials.email,
          address: credentials.address,
          city: credentials.city,
          phoneNumb:  credentials.phoneNumb,
          regType: credentials.regType,
          username: credentials.username,
          password: credentials.password
        })
        this.registerBegin(credentials.phoneNumb, this.userID, credentials.regType)
        
        
      },
      error => this.signupError = error.message
    )
  }

  registerBegin(phoneNumb, userid, regtype) {
    let tell = phoneNumb
    console.log(this.recaptchaVerifier)

    let credentials = {
      phoneNumber : tell,
      applicationVerify: this.recaptchaVerifier
    }

    firebase.auth().signInWithPhoneNumber(credentials.phoneNumber, credentials.applicationVerify).then(
      confirmationResult => {
        let prompt = this.alertCtrl.create({
          title: 'Verifikasi',
          message: 'Masukkan Kode Verifikasi Anda',
          inputs: [
            {
              name: 'verificationCode',
              placeholder: 'Kode Verifikasi',
            },
          ],
          buttons: [
            {
              text: 'Cancel',
              handler: data => {
                console.log("cancel")
                // this.waitConfirm('Kode Salah', 'Kode yang Anda Masukkan Salah' )
              }
            },
            {
              text: 'Submit',
              handler: data => {
                confirmationResult.confirm(data.verificationCode)
                .then( () =>
                  this.waitConfirm('Confirmation', 'Now you can login as our member', userid, regtype)
                ).catch(function (error){
                  console.log(error)
                })
                
              }
            }
          ]
        })
        prompt.present()
      }
    )
    .catch(function (error){
      alert('SMS Not Sent Check again your phone number')
      console.error('SMS Not Sent', error)
    })

  }

  waitConfirm(titlePrompt, messagePrompt, userid, regtype) {
    if (titlePrompt == 'Confirmation') {
      let confirm = this.alertCtrl.create({
        title: titlePrompt,
        message: messagePrompt,
        buttons: [
          {
            text: 'Ok',
            handler: data => {
              // this.navCtrl.push(LoginPage);
              this.navCtrl.push(HomePage, {
                userId: userid,
                type: regtype
              })
            }
          }
        ]
      })
    
      confirm.present()
    }
    else {
      let confirm = this.alertCtrl.create({
        title: titlePrompt,
        message: messagePrompt,
        buttons: [
          {
            text: 'Cancel',
            handler: data => {
              this.register();
            }
          }
        ]
      })
    
      confirm.present()
    }
  }
  // submit register

  // back to login
  login() {
    this.navCtrl.push(LoginPage)
  }
  // back to login

}
