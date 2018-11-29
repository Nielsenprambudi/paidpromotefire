import { Component, ViewChild } from '@angular/core';
import { App, Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AuthService } from './../services/auth.service';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import firebase from 'firebase';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';

@Component({
  templateUrl: 'app.html'
})

export class MyApp {

  @ViewChild('nav') nav: Nav;

  rootPage:any = LoginPage;
  
  userid: any;
  regtype: any;


  private platform;
  private app;

  


  constructor(platform: Platform, app: App, statusBar: StatusBar, splashScreen: SplashScreen,
    public auth: AuthService,
    public afs: AngularFirestore) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
    this.platform = platform;
    this.app = app;
    this.regtype
    this.initializeApp();
  }

  initializeApp() {
    this.auth.afAuth.authState.subscribe(user => {
      if(user) {
        console.log(user.uid)
        this.userid = user.uid;
        const type = this.afs.collection<any>('users').doc(this.userid);
          type.get().subscribe(x => {
            if(x.exists) {
                  let type = x.data()
                  this.regtype = type.regType
                  this.nav.setRoot(HomePage, {
                    userId: this.userid,
                    type: this.regtype
                  })
                  // console.log("document data:", type.regType);
                } else {
                  console.log("no such document")
                }
          })
        
      } else {
        this.nav.setRoot(LoginPage);
      }
    },
      () => {
        this.nav.setRoot(LoginPage);
      }
    );
  }
}

