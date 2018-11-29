import { AddUserService } from './../../services/adduser.service';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { RegisterPage } from '../register/register';
import { HomePage } from '../home/home';
import { Http } from '@angular/http';
import { AuthService } from '../../services/auth.service';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  user: any;
  email: '';
  password: '';
  userId: any;
  type: any;
  userCollection: any;
  loginError: any;

  constructor(public navCtrl: NavController, 
     public afs: AngularFirestore,
     public aus: AddUserService,
     private auth: AuthService, 
     public http: Http,
     public fb: Facebook) {
      this.signin()
      
  }



  // to homepage

  signin() {
    let dataUsername = this.email;
    let dataPassword = this.password;
    console.log(dataUsername)
    console.log(dataPassword)


    if(!dataUsername) {
      return;
    }

    let credentials = {
      email: dataUsername,
      password: dataPassword
    }

    this.auth.signInWithEmail(credentials)
      .then(
        () => {
          this.userId = this.auth.getID()
          console.log(this.userId)
          const type = this.afs.collection<any>('users').doc(this.userId);
          type.get().subscribe(x => {
            if(x.exists) {
                  let type = x.data()
                  this.navCtrl.setRoot(HomePage, {
                    userId: this.userId,
                    type: type.regType
                  })
                  // console.log("document data:", type.regType);
                } else {
                  console.log("no such document")
                }
          })
        },
        error => this.loginError = error.message
      )
  }

  

  loginFB(){
    // Login with permissions
    this.fb.login(['public_profile', 'user_photos', 'email', 'user_birthday'])
    .then( (res: FacebookLoginResponse) => {

        // The connection was successful
        if(res.status == "connected") {

            // Get user ID and Token
            var fb_id = res.authResponse.userID;
            var fb_token = res.authResponse.accessToken;

            // Get user infos from the API
            this.fb.api("/me?fields=name,gender,birthday,email", []).then((user) => {

                // Get the connected user details
                var gender    = user.gender;
                var birthday  = user.birthday;
                var name      = user.name;
                var email     = user.email;

                console.log("=== USER INFOS ===");
                alert("Gender : " + gender);
                console.log("Birthday : " + birthday);
                console.log("Name : " + name);
                console.log("Email : " + email);

                // => Open user session and redirect to the next page

            });

        } 
        // An error occurred while loging-in
        else {

            console.log("An error occurred...");

        }

    })
    .catch((e) => {
        console.log('Error logging into Facebook', e);
    });
  }

  // to homepage


  // to register

  register() {
      this.navCtrl.push(RegisterPage)
  }

  // to register

}
