import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule, Modal } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Facebook } from '@ionic-native/facebook';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { AdsPage } from '../pages/ads/ads';
import { PackagePage } from '../pages/package/package';
import { VendorProfilePage } from '../pages/vendorprofile/vendorprofile';
import { MarketerProfilePage } from './../pages/marketerprofile/marketerprofile';
import { MarketerAdsPage } from './../pages/marketerads/marketerads';
import { ModalAdsPage } from './../pages/marketerads/modalads/modalads';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { Camera } from '@ionic-native/camera';
import { HttpModule } from '@angular/http';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { firebaseConfig } from '../config';
import { AuthService } from './../services/auth.service';
import { AddUserService } from './../services/adduser.service';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    RegisterPage,
    AdsPage,
    PackagePage,
    VendorProfilePage,
    MarketerAdsPage,
    MarketerProfilePage,
    ModalAdsPage,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    AngularFireModule.initializeApp(firebaseConfig.fire),
    AngularFirestoreModule,
    AngularFireAuthModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    RegisterPage,
    AdsPage,
    PackagePage,
    VendorProfilePage,
    MarketerAdsPage,
    MarketerProfilePage,
    ModalAdsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Facebook,
    FileTransfer,
    FileTransferObject,
    File,
    Camera,
    AngularFireAuth,
    AngularFireDatabase,
    AuthService,
    AddUserService
  ]
})
export class AppModule {}
