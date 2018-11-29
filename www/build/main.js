webpackJsonp([0],{

/***/ 164:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return VendorProfilePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__package_package__ = __webpack_require__(95);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ads_ads__ = __webpack_require__(165);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_file_transfer__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_camera__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_fire_firestore__ = __webpack_require__(46);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var VendorProfilePage = /** @class */ (function () {
    function VendorProfilePage(navCtrl, afs, navParams, alertCtrl, transfer, camera, loadingCtrl, toastCtrl) {
        this.navCtrl = navCtrl;
        this.afs = afs;
        this.navParams = navParams;
        this.alertCtrl = alertCtrl;
        this.transfer = transfer;
        this.camera = camera;
        this.loadingCtrl = loadingCtrl;
        this.toastCtrl = toastCtrl;
        this.userIdent = navParams.data;
        this.getBiodata(this.userIdent);
    }
    // get Biodata
    VendorProfilePage.prototype.getBiodata = function (profile) {
        var _this = this;
        var type = this.afs.collection('users').doc(profile.userid);
        type.get().subscribe(function (x) {
            if (x.exists) {
                var type_1 = x.data();
                _this.name = type_1.name;
                _this.address = type_1.address;
                _this.city = type_1.city;
                _this.phoneNumb = type_1.phoneNumb;
                // console.log("document data:", type.regType);
            }
            else {
                console.log("no such document");
            }
        });
    };
    // get Biodata
    // upload image
    VendorProfilePage.prototype.getImage = function () {
        var _this = this;
        var options = {
            quality: 100,
            destinationType: this.camera.DestinationType.FILE_URI,
            sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
        };
        this.camera.getPicture(options).then(function (imageData) {
            _this.imageURI = imageData;
        }, function (err) {
            console.log(err);
            _this.presentToast(err);
        });
    };
    VendorProfilePage.prototype.uploadFile = function () {
        var _this = this;
        var loader = this.loadingCtrl.create({
            content: "Uploading..."
        });
        loader.present();
        var fileTransfer = this.transfer.create();
        var options = {
            fileKey: 'ionicfile',
            fileName: 'ionicfile',
            chunkedMode: false,
            mimeType: "image/jpeg",
            headers: {}
        };
        fileTransfer.upload(this.imageURI, 'http://192.168.0.7:8080/api/uploadImage', options)
            .then(function (data) {
            console.log(data + " Uploaded Successfully");
            _this.imageFileName = "http://192.168.0.7:8080/static/images/ionicfile.jpg";
            loader.dismiss();
            _this.presentToast("Image uploaded successfully");
        }, function (err) {
            console.log(err);
            loader.dismiss();
            _this.presentToast(err);
        });
    };
    // upload image
    VendorProfilePage.prototype.presentToast = function (msg) {
        var toast = this.toastCtrl.create({
            message: msg,
            duration: 3000,
            position: 'bottom'
        });
        toast.onDidDismiss(function () {
            console.log('Dismissed toast');
        });
        toast.present();
    };
    VendorProfilePage.prototype.backToAds = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_1__ads_ads__["a" /* AdsPage */]);
    };
    VendorProfilePage.prototype.backToPackage = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_0__package_package__["a" /* PackagePage */]);
    };
    VendorProfilePage.prototype.logOut = function () {
        window.location.reload();
    };
    VendorProfilePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["m" /* Component */])({
            selector: 'page-vendorprofile',template:/*ion-inline-start:"C:\Users\Chris\source\Workspaces\paidpromotefirebase2\src\pages\vendorprofile\vendorprofile.html"*/'<ion-header>\n    <ion-navbar>\n      <ion-title>\n        Profil Vendor\n      </ion-title>\n    </ion-navbar>\n  </ion-header>\n\n<ion-content padding>\n\n  <!-- biodata -->\n  <ion-card >\n    <ion-card-header>\n      Biodata\n    </ion-card-header>\n    <ion-item>\n      Nama\n      <ion-note item-end>\n        {{name}}\n      </ion-note>\n    </ion-item>\n    <ion-item>\n      Alamat\n      <ion-note item-end>\n        {{address}}\n      </ion-note>\n    </ion-item>\n    <ion-item>\n      Kota\n      <ion-note item-end>\n        {{city}}\n      </ion-note>\n    </ion-item>\n    <ion-item>\n      Kontak\n      <ion-note item-end>\n        {{phoneNumb}}\n      </ion-note>\n    </ion-item>\n    <div padding>\n      <button ion-button block>Ubah Biodata</button>\n    </div>\n  </ion-card>\n  <!-- biodata -->\n\n  <!-- ads history -->\n  <ion-card >\n    <ion-card-header>\n      Daftar Iklan Terpasang\n    </ion-card-header>\n    <ion-card>\n      <ion-card-content>\n        Promo 20% penjualan besi\n      </ion-card-content>\n    </ion-card>\n    <ion-card>\n      <ion-card-content>\n        Promo 20% penjualan besi\n      </ion-card-content>\n    </ion-card>\n    <div padding>\n      <button (click)="backToAds()" ion-button block>Tambah Iklan</button>\n    </div>\n  </ion-card>\n  <!-- ads history -->\n\n  <!-- package -->\n  <ion-card >\n    <ion-card-header>\n      Sisa Paket\n    </ion-card-header>\n    <div padding>\n      <h2><b>Sisa 200 poin</b></h2>\n    </div>\n    <div padding>\n      <button (click)="backToPackage()" ion-button block>Tambah poin</button>\n    </div>\n  </ion-card>\n  <!-- package -->\n\n  <!-- upload -->\n  <ion-card >\n    <ion-card-header>\n      Unggah Bukti Transfer\n    </ion-card-header>\n    <div padding>\n      <ion-item>\n        <p>{{ imageURI }}</p>\n        <button ion-button color="secondary" (click)="getImage()">Get Image</button>\n      </ion-item>\n      <ion-item>\n        <h4>Image Preview</h4>\n        <img src="{{imageFileName}}" *ngIf="imageFileName" alt="Ionic File" width="300" />\n      </ion-item>\n    </div>\n    <div padding>\n      <button ion-button block (click)="uploadFile()">Upload</button>\n    </div>\n  </ion-card>\n  <!-- upload -->\n\n  <!-- Log Out -->\n  <ion-card >\n      <button (click)="logOut()" ion-button block>Log Out</button>\n  </ion-card>\n  <!-- Log Out -->\n\n</ion-content>\n'/*ion-inline-end:"C:\Users\Chris\source\Workspaces\paidpromotefirebase2\src\pages\vendorprofile\vendorprofile.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3_ionic_angular__["i" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_6__angular_fire_firestore__["a" /* AngularFirestore */],
            __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["j" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["a" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_4__ionic_native_file_transfer__["a" /* FileTransfer */],
            __WEBPACK_IMPORTED_MODULE_5__ionic_native_camera__["a" /* Camera */],
            __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["f" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["l" /* ToastController */]])
    ], VendorProfilePage);
    return VendorProfilePage;
}());

//# sourceMappingURL=vendorprofile.js.map

/***/ }),

/***/ 165:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AdsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__package_package__ = __webpack_require__(95);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_file_transfer__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_camera__ = __webpack_require__(56);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var AdsPage = /** @class */ (function () {
    function AdsPage(navCtrl, alertCtrl, transfer, camera, loadingCtrl, toastCtrl) {
        this.navCtrl = navCtrl;
        this.alertCtrl = alertCtrl;
        this.transfer = transfer;
        this.camera = camera;
        this.loadingCtrl = loadingCtrl;
        this.toastCtrl = toastCtrl;
        this.regType = "vendor";
    }
    // upload image
    AdsPage.prototype.getImage = function () {
        var _this = this;
        var options = {
            quality: 100,
            destinationType: this.camera.DestinationType.FILE_URI,
            sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
        };
        this.camera.getPicture(options).then(function (imageData) {
            _this.presentToast(imageData);
            _this.imageURI = imageData;
        }, function (err) {
            console.log(err);
            _this.presentToast(err);
        });
    };
    AdsPage.prototype.uploadFile = function () {
        var _this = this;
        var loader = this.loadingCtrl.create({
            content: "Uploading..."
        });
        loader.present();
        var fileTransfer = this.transfer.create();
        var options = {
            fileKey: 'ionicfile',
            fileName: 'ionicfile',
            chunkedMode: false,
            mimeType: "image/jpeg",
            headers: {}
        };
        fileTransfer.upload(this.imageURI, 'http://192.168.0.7:8080/api/uploadImage', options)
            .then(function (data) {
            console.log(data + " Uploaded Successfully");
            _this.imageFileName = "http://192.168.0.7:8080/static/images/ionicfile.jpg";
            loader.dismiss();
            _this.presentToast("Image uploaded successfully");
        }, function (err) {
            console.log(err);
            loader.dismiss();
            _this.presentToast(err);
        });
    };
    // upload image
    AdsPage.prototype.submitAds = function () {
        this.presentPrompt();
    };
    AdsPage.prototype.presentPrompt = function () {
        var _this = this;
        var nextStep = this.alertCtrl.create({
            title: 'Konfirmasi',
            message: 'Lanjutkan ke tahap pemilihan paket ?',
            buttons: [
                {
                    text: 'Batal',
                    handler: function (data) {
                        console.log('Batal');
                    }
                },
                {
                    text: 'Ok',
                    handler: function (data) {
                        _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_0__package_package__["a" /* PackagePage */]);
                    }
                }
            ]
        });
        nextStep.present();
    };
    AdsPage.prototype.presentToast = function (msg) {
        var toast = this.toastCtrl.create({
            message: msg,
            duration: 3000,
            position: 'bottom'
        });
        toast.onDidDismiss(function () {
            console.log('Dismissed toast');
        });
        toast.present();
    };
    AdsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["m" /* Component */])({
            selector: 'page-ads',template:/*ion-inline-start:"C:\Users\Chris\source\Workspaces\paidpromotefirebase2\src\pages\ads\ads.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>\n      Pasang Iklan\n    </ion-title>\n  </ion-navbar>\n</ion-header>\n\n\n<ion-content padding>\n\n  <ion-item>\n      <ion-label floating>Judul</ion-label>\n      <ion-input style="border-bottom: 1px solid #488aff" type="text"></ion-input> \n  </ion-item>\n\n  <ion-item>\n    <ion-item>\n      <p>{{imageURI}}</p>\n      <button ion-button color="secondary" (click)="getImage()">Get Image</button>\n    </ion-item>\n    <ion-item>\n      <h4>Image Preview</h4>\n      <img src="{{imageFileName}}" *ngIf="imageFileName" alt="Ionic File" width="300" />\n    </ion-item>\n    <!-- <ion-item>\n      <button ion-button (click)="uploadFile()">Upload</button>\n    </ion-item> -->\n  </ion-item>\n\n  <ion-item>\n    <ion-label floating>Deskripsi</ion-label>\n    <ion-textarea style="border-bottom: 1px solid #488aff" type="text"></ion-textarea> \n  </ion-item>\n\n  <ion-item>\n    <ion-label floating>Kategori Marketer :</ion-label>\n    <ion-select [(ngModel)]="marketerType">\n        <ion-option value="surabaya">Area Surabaya</ion-option>\n        <ion-option value="jakarta">Area Jakarta</ion-option>\n    </ion-select>\n  </ion-item>\n\n\n  <div padding>\n    <button (click)="submitAds()" ion-button block>Submit</button>\n  </div>\n\n\n\n</ion-content>\n'/*ion-inline-end:"C:\Users\Chris\source\Workspaces\paidpromotefirebase2\src\pages\ads\ads.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["i" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["a" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_native_file_transfer__["a" /* FileTransfer */],
            __WEBPACK_IMPORTED_MODULE_4__ionic_native_camera__["a" /* Camera */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["f" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["l" /* ToastController */]])
    ], AdsPage);
    return AdsPage;
}());

//# sourceMappingURL=ads.js.map

/***/ }),

/***/ 166:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MarketerAdsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__modalads_modalads__ = __webpack_require__(299);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_file_transfer__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_camera__ = __webpack_require__(56);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var MarketerAdsPage = /** @class */ (function () {
    function MarketerAdsPage(navCtrl, modalCtrl, transfer, camera, loadingCtrl, toastCtrl) {
        this.navCtrl = navCtrl;
        this.modalCtrl = modalCtrl;
        this.transfer = transfer;
        this.camera = camera;
        this.loadingCtrl = loadingCtrl;
        this.toastCtrl = toastCtrl;
        this.regType = "vendor";
    }
    // get image
    MarketerAdsPage.prototype.getImage = function () {
        var _this = this;
        var options = {
            quality: 100,
            destinationType: this.camera.DestinationType.FILE_URI,
            sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
        };
        this.camera.getPicture(options).then(function (imageData) {
            _this.imageURI = imageData;
        }, function (err) {
            console.log(err);
            _this.presentToast(err);
        });
    };
    // get image
    MarketerAdsPage.prototype.adsDetail = function () {
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_0__modalads_modalads__["a" /* ModalAdsPage */]);
        modal.present();
    };
    MarketerAdsPage.prototype.presentToast = function (msg) {
        var toast = this.toastCtrl.create({
            message: msg,
            duration: 3000,
            position: 'bottom'
        });
        toast.onDidDismiss(function () {
            console.log('Dismissed toast');
        });
        toast.present();
    };
    MarketerAdsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["m" /* Component */])({
            selector: 'page-marketerads',template:/*ion-inline-start:"C:\Users\Chris\source\Workspaces\paidpromotefirebase2\src\pages\marketerads\marketerads.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>\n      Pilih Iklan\n    </ion-title>\n  </ion-navbar>\n</ion-header>\n\n\n<ion-content padding>\n\n  <ion-list>\n    <ion-item-sliding>\n      <ion-item>\n        <ion-avatar item-start>\n          <img src="assets/imgs/venkman.jpg"/>\n        </ion-avatar>\n        <h2>Iklan 1</h2>\n        <p>Geser ke kiri untuk melihat detil pekerjaan</p>\n      </ion-item>\n      <ion-item-options>\n          <button (click)="adsDetail()" ion-button color="primary">\n            Detil\n          </button>\n          <!-- <button ion-button color="secondary">\n            <ion-icon name="checkmark"></ion-icon>\n          </button>\n          <button ion-button color="danger">\n            <ion-icon name="close"></ion-icon>\n          </button> -->\n        </ion-item-options>\n    </ion-item-sliding>\n\n    <ion-item-sliding>\n      <ion-item>\n        <ion-avatar item-start>\n          <img src="assets/imgs/winston.jpg"/>\n        </ion-avatar>\n        <h2>Iklan 2</h2>\n        <p>Geser ke kiri untuk melihat detil pekerjaan</p>\n      </ion-item>\n      <ion-item-options>\n          <button (click)="adsDetail()" ion-button color="primary">\n            Detil\n          </button>\n          <!-- <button ion-button color="secondary">\n            <ion-icon name="checkmark"></ion-icon>\n          </button>\n          <button ion-button color="danger">\n            <ion-icon name="close"></ion-icon>\n          </button> -->\n        </ion-item-options>\n    </ion-item-sliding>\n  </ion-list>\n\n\n\n</ion-content>\n'/*ion-inline-end:"C:\Users\Chris\source\Workspaces\paidpromotefirebase2\src\pages\marketerads\marketerads.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["i" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["g" /* ModalController */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_native_file_transfer__["a" /* FileTransfer */],
            __WEBPACK_IMPORTED_MODULE_4__ionic_native_camera__["a" /* Camera */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["f" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["l" /* ToastController */]])
    ], MarketerAdsPage);
    return MarketerAdsPage;
}());

//# sourceMappingURL=marketerads.js.map

/***/ }),

/***/ 167:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__services_adduser_service__ = __webpack_require__(168);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ionic_native_facebook__ = __webpack_require__(292);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__register_register__ = __webpack_require__(301);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__home_home__ = __webpack_require__(94);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_http__ = __webpack_require__(303);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__services_auth_service__ = __webpack_require__(92);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__angular_fire_firestore__ = __webpack_require__(46);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var LoginPage = /** @class */ (function () {
    function LoginPage(navCtrl, afs, aus, auth, http, fb) {
        this.navCtrl = navCtrl;
        this.afs = afs;
        this.aus = aus;
        this.auth = auth;
        this.http = http;
        this.fb = fb;
        this.signin();
    }
    // to homepage
    LoginPage.prototype.signin = function () {
        var _this = this;
        var dataUsername = this.email;
        var dataPassword = this.password;
        console.log(dataUsername);
        console.log(dataPassword);
        if (!dataUsername) {
            return;
        }
        var credentials = {
            email: dataUsername,
            password: dataPassword
        };
        this.auth.signInWithEmail(credentials)
            .then(function () {
            _this.userId = _this.auth.getID();
            console.log(_this.userId);
            var type = _this.afs.collection('users').doc(_this.userId);
            type.get().subscribe(function (x) {
                if (x.exists) {
                    var type_1 = x.data();
                    _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_5__home_home__["a" /* HomePage */], {
                        userId: _this.userId,
                        type: type_1.regType
                    });
                    // console.log("document data:", type.regType);
                }
                else {
                    console.log("no such document");
                }
            });
        }, function (error) { return _this.loginError = error.message; });
    };
    LoginPage.prototype.loginFB = function () {
        var _this = this;
        // Login with permissions
        this.fb.login(['public_profile', 'user_photos', 'email', 'user_birthday'])
            .then(function (res) {
            // The connection was successful
            if (res.status == "connected") {
                // Get user ID and Token
                var fb_id = res.authResponse.userID;
                var fb_token = res.authResponse.accessToken;
                // Get user infos from the API
                _this.fb.api("/me?fields=name,gender,birthday,email", []).then(function (user) {
                    // Get the connected user details
                    var gender = user.gender;
                    var birthday = user.birthday;
                    var name = user.name;
                    var email = user.email;
                    console.log("=== USER INFOS ===");
                    alert("Gender : " + gender);
                    console.log("Birthday : " + birthday);
                    console.log("Name : " + name);
                    console.log("Email : " + email);
                    // => Open user session and redirect to the next page
                });
            }
            else {
                console.log("An error occurred...");
            }
        })
            .catch(function (e) {
            console.log('Error logging into Facebook', e);
        });
    };
    // to homepage
    // to register
    LoginPage.prototype.register = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__register_register__["a" /* RegisterPage */]);
    };
    LoginPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["m" /* Component */])({
            selector: 'page-login',template:/*ion-inline-start:"C:\Users\Chris\source\Workspaces\paidpromotefirebase2\src\pages\login\login.html"*/'\n\n  \n\n  <ion-content padding>\n\n      <ion-card>\n\n        <ion-card-header>\n\n            Welcome to Paid Promote\n\n        </ion-card-header>\n\n        <img src="assets/imgs/logo.png"/>\n\n            <ion-item>\n\n                <ion-label floating>Email (i.e: email@mail.com)</ion-label>\n\n                <ion-input [(ngModel)]="email" style="border-bottom: 1px solid #488aff" type="text"></ion-input>\n\n            </ion-item>\n\n\n\n            <ion-item>\n\n                <ion-label floating>Password</ion-label>\n\n                <ion-input [(ngModel)]="password" style="border-bottom: 1px solid #488aff" type="password"></ion-input>\n\n            </ion-item>\n\n\n\n        <div padding>\n\n            <p style="font-size: 10px; color: red">{{loginError}}</p>\n\n            <button (click)="signin()" [disabled]="!email || !password "  ion-button block>Sign In</button>\n\n            <button (click)="loginFB()" ion-button block icon-start><ion-icon name="logo-facebook"></ion-icon>Login by Facebook</button>\n\n            <p style="font-size: small">Tidak punya akun? <a (click)="register()">Register</a></p>\n\n        </div>\n\n    </ion-card>\n\n  </ion-content>\n\n  '/*ion-inline-end:"C:\Users\Chris\source\Workspaces\paidpromotefirebase2\src\pages\login\login.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3_ionic_angular__["i" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_8__angular_fire_firestore__["a" /* AngularFirestore */],
            __WEBPACK_IMPORTED_MODULE_0__services_adduser_service__["a" /* AddUserService */],
            __WEBPACK_IMPORTED_MODULE_7__services_auth_service__["a" /* AuthService */],
            __WEBPACK_IMPORTED_MODULE_6__angular_http__["a" /* Http */],
            __WEBPACK_IMPORTED_MODULE_1__ionic_native_facebook__["a" /* Facebook */]])
    ], LoginPage);
    return LoginPage;
}());

//# sourceMappingURL=login.js.map

/***/ }),

/***/ 168:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AddUserService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_fire_firestore__ = __webpack_require__(46);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var AddUserService = /** @class */ (function () {
    function AddUserService(afs) {
        this.afs = afs;
    }
    AddUserService.prototype.getType = function (userId) {
        return this.afs.collection('users').doc(userId);
    };
    AddUserService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_fire_firestore__["a" /* AngularFirestore */]])
    ], AddUserService);
    return AddUserService;
}());

//# sourceMappingURL=adduser.service.js.map

/***/ }),

/***/ 208:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 208;

/***/ }),

/***/ 249:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 249;

/***/ }),

/***/ 299:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ModalAdsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_file_transfer__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_camera__ = __webpack_require__(56);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var ModalAdsPage = /** @class */ (function () {
    function ModalAdsPage(navCtrl, viewCtrl, transfer, camera, loadingCtrl, toastCtrl) {
        this.navCtrl = navCtrl;
        this.viewCtrl = viewCtrl;
        this.transfer = transfer;
        this.camera = camera;
        this.loadingCtrl = loadingCtrl;
        this.toastCtrl = toastCtrl;
        this.regType = "vendor";
    }
    // get image
    ModalAdsPage.prototype.getImage = function () {
        var _this = this;
        var options = {
            quality: 100,
            destinationType: this.camera.DestinationType.FILE_URI,
            sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
        };
        this.camera.getPicture(options).then(function (imageData) {
            _this.imageURI = imageData;
        }, function (err) {
            console.log(err);
            _this.presentToast(err);
        });
    };
    // get image
    ModalAdsPage.prototype.dismiss = function () {
        this.viewCtrl.dismiss();
    };
    ModalAdsPage.prototype.agree = function () {
        this.presentToast("Anda Menerima Pekerjaan ini");
        this.viewCtrl.dismiss();
    };
    ModalAdsPage.prototype.reject = function () {
        this.presentToast("Anda Menolak Pekerjaan ini");
        this.viewCtrl.dismiss();
    };
    ModalAdsPage.prototype.presentToast = function (msg) {
        var toast = this.toastCtrl.create({
            message: msg,
            duration: 3000,
            position: 'bottom'
        });
        toast.onDidDismiss(function () {
            console.log('Dismissed toast');
        });
        toast.present();
    };
    ModalAdsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-modalads',template:/*ion-inline-start:"C:\Users\Chris\source\Workspaces\paidpromotefirebase2\src\pages\marketerads\modalads\modalads.html"*/'<ion-header>\n\n    <ion-toolbar>\n\n        <ion-title>\n\n            Deskripsi\n\n        </ion-title>\n\n        <ion-buttons start>\n\n            <button ion-button (click)="dismiss()">\n\n                <ion-icon name="close"></ion-icon>\n\n            </button>\n\n        </ion-buttons>\n\n    </ion-toolbar>\n\n</ion-header>\n\n\n\n<ion-content padding>\n\n    <ion-card>\n\n        <ion-card-title padding>\n\n            Iklan 1\n\n        </ion-card-title>\n\n        <img src="assets/imgs/logo.png"/>\n\n        <ion-card-content>\n\n            <p>Deskripsi Iklan 1</p>\n\n        </ion-card-content>\n\n        <ion-row>\n\n            <ion-col col-6>\n\n                <button ion-button block (click)="agree()">Terima</button>\n\n            </ion-col>\n\n            <ion-col col-6>\n\n                <button ion-button block  color="danger" (click)="reject()">Tolak</button>\n\n            </ion-col>\n\n        </ion-row>\n\n    </ion-card>\n\n</ion-content>'/*ion-inline-end:"C:\Users\Chris\source\Workspaces\paidpromotefirebase2\src\pages\marketerads\modalads\modalads.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* ViewController */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_native_file_transfer__["a" /* FileTransfer */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_native_camera__["a" /* Camera */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* ToastController */]])
    ], ModalAdsPage);
    return ModalAdsPage;
}());

//# sourceMappingURL=modalads.js.map

/***/ }),

/***/ 300:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MarketerProfilePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__marketerads_marketerads__ = __webpack_require__(166);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_file_transfer__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_camera__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_fire_firestore__ = __webpack_require__(46);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var MarketerProfilePage = /** @class */ (function () {
    function MarketerProfilePage(navCtrl, afs, navParams, alertCtrl, transfer, camera, loadingCtrl, toastCtrl) {
        this.navCtrl = navCtrl;
        this.afs = afs;
        this.navParams = navParams;
        this.alertCtrl = alertCtrl;
        this.transfer = transfer;
        this.camera = camera;
        this.loadingCtrl = loadingCtrl;
        this.toastCtrl = toastCtrl;
        this.userIdent = navParams.data;
        this.getBiodata(this.userIdent);
    }
    // get Biodata
    MarketerProfilePage.prototype.getBiodata = function (profile) {
        var _this = this;
        var type = this.afs.collection('users').doc(profile.userid);
        type.get().subscribe(function (x) {
            if (x.exists) {
                var type_1 = x.data();
                _this.name = type_1.name;
                _this.address = type_1.address;
                _this.city = type_1.city;
                _this.phoneNumb = type_1.phoneNumb;
                // console.log("document data:", type.regType);
            }
            else {
                console.log("no such document");
            }
        });
    };
    // get Biodata
    // upload image
    MarketerProfilePage.prototype.getImage = function () {
        var _this = this;
        var options = {
            quality: 100,
            destinationType: this.camera.DestinationType.FILE_URI,
            sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
        };
        this.camera.getPicture(options).then(function (imageData) {
            _this.imageURI = imageData;
        }, function (err) {
            console.log(err);
            _this.presentToast(err);
        });
    };
    MarketerProfilePage.prototype.uploadFile = function () {
        var _this = this;
        var loader = this.loadingCtrl.create({
            content: "Uploading..."
        });
        loader.present();
        var fileTransfer = this.transfer.create();
        var options = {
            fileKey: 'ionicfile',
            fileName: 'ionicfile',
            chunkedMode: false,
            mimeType: "image/jpeg",
            headers: {}
        };
        fileTransfer.upload(this.imageURI, 'http://192.168.0.7:8080/api/uploadImage', options)
            .then(function (data) {
            console.log(data + " Uploaded Successfully");
            _this.imageFileName = "http://192.168.0.7:8080/static/images/ionicfile.jpg";
            loader.dismiss();
            _this.presentToast("Image uploaded successfully");
        }, function (err) {
            console.log(err);
            loader.dismiss();
            _this.presentToast(err);
        });
    };
    // upload image
    MarketerProfilePage.prototype.presentToast = function (msg) {
        var toast = this.toastCtrl.create({
            message: msg,
            duration: 3000,
            position: 'bottom'
        });
        toast.onDidDismiss(function () {
            console.log('Dismissed toast');
        });
        toast.present();
    };
    MarketerProfilePage.prototype.backToAds = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_0__marketerads_marketerads__["a" /* MarketerAdsPage */]);
    };
    MarketerProfilePage.prototype.logOut = function () {
        window.location.reload();
    };
    MarketerProfilePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["m" /* Component */])({
            selector: 'page-marketerprofile',template:/*ion-inline-start:"C:\Users\Chris\source\Workspaces\paidpromotefirebase2\src\pages\marketerprofile\marketerprofile.html"*/'<ion-header>\n    <ion-navbar>\n      <ion-title>\n        Profil Marketer\n      </ion-title>\n    </ion-navbar>\n  </ion-header>\n\n<ion-content padding>\n\n  <!-- biodata -->\n  <ion-card >\n    <ion-card-header>\n      Biodata\n    </ion-card-header>\n    <ion-item>\n      Nama\n      <ion-note item-end>\n        {{name}}\n      </ion-note>\n    </ion-item>\n    <ion-item>\n      Alamat\n      <ion-note item-end>\n        {{address}}\n      </ion-note>\n    </ion-item>\n    <ion-item>\n      Kota\n      <ion-note item-end>\n        {{city}}\n      </ion-note>\n    </ion-item>\n    <ion-item>\n      Kontak\n      <ion-note item-end>\n        +{{phoneNumb}}\n      </ion-note>\n    </ion-item>\n    <div padding>\n      <button ion-button block>Ubah Biodata</button>\n    </div>\n  </ion-card>\n  <!-- biodata -->\n\n  <!-- marketer ads history -->\n  <ion-card >\n    <ion-card-header>\n      Daftar Iklan Tersebar\n    </ion-card-header>\n    <ion-card>\n      <ion-card-content>\n        Promo 20% penjualan besi\n      </ion-card-content>\n    </ion-card>\n    <ion-card>\n      <ion-card-content>\n        Promo 20% penjualan besi\n      </ion-card-content>\n    </ion-card>\n    <div padding>\n      <button (click)="backToAds()" ion-button block>Tambah Kerja</button>\n    </div>\n  </ion-card>\n  <!-- ads history -->\n\n  <!-- package -->\n  <ion-card >\n    <ion-card-header>\n      Poin\n    </ion-card-header>\n    <div padding>\n      <h2><b>Dapat 200 poin</b></h2>\n    </div>\n  </ion-card>\n  <!-- package -->\n\n  <!-- upload -->\n  <ion-card >\n    <ion-card-header>\n      Unggah Bukti Transfer\n    </ion-card-header>\n    <div padding>\n      <ion-item>\n        <p>{{ imageURI }}</p>\n        <button ion-button color="secondary" (click)="getImage()">Get Image</button>\n      </ion-item>\n      <ion-item>\n        <h4>Image Preview</h4>\n        <img src="{{imageFileName}}" *ngIf="imageFileName" alt="Ionic File" width="300" />\n      </ion-item>\n    </div>\n    <div padding>\n      <button ion-button block (click)="uploadFile()">Upload</button>\n    </div>\n  </ion-card>\n  <!-- upload -->\n\n  <!-- Log Out -->\n  <ion-card >\n    <button (click)="logOut()" ion-button block>Log Out</button>\n  </ion-card>\n  <!-- Log Out -->\n\n</ion-content>\n'/*ion-inline-end:"C:\Users\Chris\source\Workspaces\paidpromotefirebase2\src\pages\marketerprofile\marketerprofile.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["i" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_5__angular_fire_firestore__["a" /* AngularFirestore */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["j" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["a" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_native_file_transfer__["a" /* FileTransfer */],
            __WEBPACK_IMPORTED_MODULE_4__ionic_native_camera__["a" /* Camera */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["f" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["l" /* ToastController */]])
    ], MarketerProfilePage);
    return MarketerProfilePage;
}());

//# sourceMappingURL=marketerprofile.js.map

/***/ }),

/***/ 301:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RegisterPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__home_home__ = __webpack_require__(94);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_fire_firestore__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_adduser_service__ = __webpack_require__(168);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_auth_service__ = __webpack_require__(92);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ionic_angular__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__login_login__ = __webpack_require__(167);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_firebase__ = __webpack_require__(507);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_firebase__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var RegisterPage = /** @class */ (function () {
    function RegisterPage(navCtrl, afs, addUserService, auth, alertCtrl) {
        this.navCtrl = navCtrl;
        this.afs = afs;
        this.addUserService = addUserService;
        this.auth = auth;
        this.alertCtrl = alertCtrl;
        this.recaptchaVerifier;
    }
    RegisterPage.prototype.ionViewDidLoad = function () {
        this.recaptchaVerifier = new __WEBPACK_IMPORTED_MODULE_7_firebase___default.a.auth.RecaptchaVerifier("recaptcha-container");
    };
    // submit register
    RegisterPage.prototype.register = function () {
        var _this = this;
        var credentials = {
            userID: this.userID,
            name: this.name,
            email: this.email,
            address: this.address,
            city: this.city,
            phoneNumb: "+62" + this.phoneNumb,
            regType: this.regType,
            username: this.username,
            password: this.password
        };
        console.log(credentials);
        this.auth.signUp(credentials).then(function () {
            _this.userID = _this.auth.getID();
            _this.createUser = _this.afs.doc('users' + '/' + _this.userID);
            _this.createUser.set({
                userID: _this.userID,
                name: credentials.name,
                email: credentials.email,
                address: credentials.address,
                city: credentials.city,
                phoneNumb: credentials.phoneNumb,
                regType: credentials.regType,
                username: credentials.username,
                password: credentials.password
            });
            _this.registerBegin(credentials.phoneNumb, _this.userID, credentials.regType);
        }, function (error) { return _this.signupError = error.message; });
    };
    RegisterPage.prototype.registerBegin = function (phoneNumb, userid, regtype) {
        var _this = this;
        var tell = phoneNumb;
        console.log(this.recaptchaVerifier);
        var credentials = {
            phoneNumber: tell,
            applicationVerify: this.recaptchaVerifier
        };
        __WEBPACK_IMPORTED_MODULE_7_firebase___default.a.auth().signInWithPhoneNumber(credentials.phoneNumber, credentials.applicationVerify).then(function (confirmationResult) {
            var prompt = _this.alertCtrl.create({
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
                        handler: function (data) {
                            console.log("cancel");
                            // this.waitConfirm('Kode Salah', 'Kode yang Anda Masukkan Salah' )
                        }
                    },
                    {
                        text: 'Submit',
                        handler: function (data) {
                            confirmationResult.confirm(data.verificationCode)
                                .then(function () {
                                return _this.waitConfirm('Confirmation', 'Now you can login as our member', userid, regtype);
                            }).catch(function (error) {
                                console.log(error);
                            });
                        }
                    }
                ]
            });
            prompt.present();
        })
            .catch(function (error) {
            alert('SMS Not Sent Check again your phone number');
            console.error('SMS Not Sent', error);
        });
    };
    RegisterPage.prototype.waitConfirm = function (titlePrompt, messagePrompt, userid, regtype) {
        var _this = this;
        if (titlePrompt == 'Confirmation') {
            var confirm_1 = this.alertCtrl.create({
                title: titlePrompt,
                message: messagePrompt,
                buttons: [
                    {
                        text: 'Ok',
                        handler: function (data) {
                            // this.navCtrl.push(LoginPage);
                            _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_0__home_home__["a" /* HomePage */], {
                                userId: userid,
                                type: regtype
                            });
                        }
                    }
                ]
            });
            confirm_1.present();
        }
        else {
            var confirm_2 = this.alertCtrl.create({
                title: titlePrompt,
                message: messagePrompt,
                buttons: [
                    {
                        text: 'Cancel',
                        handler: function (data) {
                            _this.register();
                        }
                    }
                ]
            });
            confirm_2.present();
        }
    };
    // submit register
    // back to login
    RegisterPage.prototype.login = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_6__login_login__["a" /* LoginPage */]);
    };
    RegisterPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_4__angular_core__["m" /* Component */])({
            selector: 'page-register',template:/*ion-inline-start:"C:\Users\Chris\source\Workspaces\paidpromotefirebase2\src\pages\register\register.html"*/'<ion-header>\n\n    <ion-navbar>\n\n      <ion-title>\n\n        Kembali ke login\n\n      </ion-title>\n\n    </ion-navbar>\n\n  </ion-header>\n\n  \n\n  <ion-content padding>\n\n            \n\n        <ion-item>\n\n            <ion-label floating><span style="color: red">*</span>Nama</ion-label>\n\n            <ion-input [(ngModel)]="name" style="border-bottom: 1px solid #488aff" type="text"></ion-input>\n\n        </ion-item>\n\n\n\n        <ion-item>\n\n            <ion-label floating><span style="color: red">*</span>E-mail</ion-label>\n\n            <ion-input [(ngModel)]="email" style="border-bottom: 1px solid #488aff" type="text"></ion-input>\n\n        </ion-item>\n\n\n\n        <ion-item>\n\n            <ion-label floating>Alamat</ion-label>\n\n            <ion-input [(ngModel)]="address" style="border-bottom: 1px solid #488aff" type="text"></ion-input>\n\n        </ion-item>\n\n\n\n        <ion-item>\n\n            <ion-label floating><span style="color: red">*</span>Kota</ion-label>\n\n            <ion-select [(ngModel)]="city">\n\n                <ion-option value="surabaya">Surabaya</ion-option>\n\n                <ion-option value="jakarta">Jakarta</ion-option>\n\n            </ion-select>\n\n        </ion-item>\n\n\n\n        <ion-item>\n\n            <ion-label floating><span style="color: red">*</span>No. Telp/Handphone (without +62)</ion-label>\n\n            <ion-input [(ngModel)]="phoneNumb" style="border-bottom: 1px solid #488aff" type="number"></ion-input>\n\n        </ion-item>\n\n\n\n        <ion-item>\n\n            <ion-label floating><span style="color: red">*</span>Register sebagai :</ion-label>\n\n            <ion-select [(ngModel)]="regType">\n\n                <ion-option value="vendor">Vendor/Pemasang Iklan</ion-option>\n\n                <ion-option value="marketer">Marketer/Penyebar Iklan</ion-option>\n\n            </ion-select>\n\n        </ion-item>\n\n\n\n        <ion-item>\n\n            <ion-label floating>Username</ion-label>\n\n            <ion-input [(ngModel)]="username" style="border-bottom: 1px solid #488aff" type="text"></ion-input>\n\n        </ion-item>\n\n\n\n        <ion-item>\n\n            <ion-label floating><span style="color: red">*</span>Password</ion-label>\n\n            <ion-input [(ngModel)]="password" style="border-bottom: 1px solid #488aff" type="password"></ion-input>\n\n        </ion-item>\n\n\n\n        <div padding>\n\n            <p style="font-size: 10px; color: red">{{signupError}}</p>\n\n            <button (click)="register()" [disabled]="!name || !email || !city || !phoneNumb || !regType || !password" ion-button block>Register</button>\n\n            <div id="recaptcha-container"></div>\n\n            <p style="font-size: small">Sudah punya akun? <a (click)="login()">Login</a></p>\n\n        </div>\n\n\n\n        \n\n  </ion-content>\n\n  '/*ion-inline-end:"C:\Users\Chris\source\Workspaces\paidpromotefirebase2\src\pages\register\register.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_5_ionic_angular__["i" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1__angular_fire_firestore__["a" /* AngularFirestore */],
            __WEBPACK_IMPORTED_MODULE_2__services_adduser_service__["a" /* AddUserService */],
            __WEBPACK_IMPORTED_MODULE_3__services_auth_service__["a" /* AuthService */],
            __WEBPACK_IMPORTED_MODULE_5_ionic_angular__["a" /* AlertController */]])
    ], RegisterPage);
    return RegisterPage;
}());

//# sourceMappingURL=register.js.map

/***/ }),

/***/ 310:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(311);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(442);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 442:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(289);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__ = __webpack_require__(291);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_facebook__ = __webpack_require__(292);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__app_component__ = __webpack_require__(492);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_home_home__ = __webpack_require__(94);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_login_login__ = __webpack_require__(167);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_register_register__ = __webpack_require__(301);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_ads_ads__ = __webpack_require__(165);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pages_package_package__ = __webpack_require__(95);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__pages_vendorprofile_vendorprofile__ = __webpack_require__(164);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__pages_marketerprofile_marketerprofile__ = __webpack_require__(300);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__pages_marketerads_marketerads__ = __webpack_require__(166);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__pages_marketerads_modalads_modalads__ = __webpack_require__(299);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__ionic_native_file_transfer__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__ionic_native_file__ = __webpack_require__(511);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__ionic_native_camera__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__angular_http__ = __webpack_require__(303);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__angular_fire__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__angular_fire_firestore__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__angular_fire_auth__ = __webpack_require__(158);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__angular_fire_database__ = __webpack_require__(512);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__config__ = __webpack_require__(520);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__services_auth_service__ = __webpack_require__(92);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__services_adduser_service__ = __webpack_require__(168);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




























var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_6__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_7__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_8__pages_login_login__["a" /* LoginPage */],
                __WEBPACK_IMPORTED_MODULE_9__pages_register_register__["a" /* RegisterPage */],
                __WEBPACK_IMPORTED_MODULE_10__pages_ads_ads__["a" /* AdsPage */],
                __WEBPACK_IMPORTED_MODULE_11__pages_package_package__["a" /* PackagePage */],
                __WEBPACK_IMPORTED_MODULE_12__pages_vendorprofile_vendorprofile__["a" /* VendorProfilePage */],
                __WEBPACK_IMPORTED_MODULE_14__pages_marketerads_marketerads__["a" /* MarketerAdsPage */],
                __WEBPACK_IMPORTED_MODULE_13__pages_marketerprofile_marketerprofile__["a" /* MarketerProfilePage */],
                __WEBPACK_IMPORTED_MODULE_15__pages_marketerads_modalads_modalads__["a" /* ModalAdsPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_19__angular_http__["b" /* HttpModule */],
                __WEBPACK_IMPORTED_MODULE_20__angular_fire__["a" /* AngularFireModule */].initializeApp(__WEBPACK_IMPORTED_MODULE_24__config__["a" /* firebaseConfig */].fire),
                __WEBPACK_IMPORTED_MODULE_21__angular_fire_firestore__["b" /* AngularFirestoreModule */],
                __WEBPACK_IMPORTED_MODULE_22__angular_fire_auth__["b" /* AngularFireAuthModule */],
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["e" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_6__app_component__["a" /* MyApp */], {}, {
                    links: []
                })
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_6__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_7__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_8__pages_login_login__["a" /* LoginPage */],
                __WEBPACK_IMPORTED_MODULE_9__pages_register_register__["a" /* RegisterPage */],
                __WEBPACK_IMPORTED_MODULE_10__pages_ads_ads__["a" /* AdsPage */],
                __WEBPACK_IMPORTED_MODULE_11__pages_package_package__["a" /* PackagePage */],
                __WEBPACK_IMPORTED_MODULE_12__pages_vendorprofile_vendorprofile__["a" /* VendorProfilePage */],
                __WEBPACK_IMPORTED_MODULE_14__pages_marketerads_marketerads__["a" /* MarketerAdsPage */],
                __WEBPACK_IMPORTED_MODULE_13__pages_marketerprofile_marketerprofile__["a" /* MarketerProfilePage */],
                __WEBPACK_IMPORTED_MODULE_15__pages_marketerads_modalads_modalads__["a" /* ModalAdsPage */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */],
                { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["u" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["d" /* IonicErrorHandler */] },
                __WEBPACK_IMPORTED_MODULE_5__ionic_native_facebook__["a" /* Facebook */],
                __WEBPACK_IMPORTED_MODULE_16__ionic_native_file_transfer__["a" /* FileTransfer */],
                __WEBPACK_IMPORTED_MODULE_16__ionic_native_file_transfer__["b" /* FileTransferObject */],
                __WEBPACK_IMPORTED_MODULE_17__ionic_native_file__["a" /* File */],
                __WEBPACK_IMPORTED_MODULE_18__ionic_native_camera__["a" /* Camera */],
                __WEBPACK_IMPORTED_MODULE_22__angular_fire_auth__["a" /* AngularFireAuth */],
                __WEBPACK_IMPORTED_MODULE_23__angular_fire_database__["a" /* AngularFireDatabase */],
                __WEBPACK_IMPORTED_MODULE_25__services_auth_service__["a" /* AuthService */],
                __WEBPACK_IMPORTED_MODULE_26__services_adduser_service__["a" /* AddUserService */]
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 492:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(291);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(289);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_auth_service__ = __webpack_require__(92);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_fire_firestore__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_home_home__ = __webpack_require__(94);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_login_login__ = __webpack_require__(167);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var MyApp = /** @class */ (function () {
    function MyApp(platform, app, statusBar, splashScreen, auth, afs) {
        this.auth = auth;
        this.afs = afs;
        this.rootPage = __WEBPACK_IMPORTED_MODULE_7__pages_login_login__["a" /* LoginPage */];
        platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.styleDefault();
            splashScreen.hide();
        });
        this.platform = platform;
        this.app = app;
        this.regtype;
        this.initializeApp();
    }
    MyApp.prototype.initializeApp = function () {
        var _this = this;
        this.auth.afAuth.authState.subscribe(function (user) {
            if (user) {
                console.log(user.uid);
                _this.userid = user.uid;
                var type = _this.afs.collection('users').doc(_this.userid);
                type.get().subscribe(function (x) {
                    if (x.exists) {
                        var type_1 = x.data();
                        _this.regtype = type_1.regType;
                        _this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_6__pages_home_home__["a" /* HomePage */], {
                            userId: _this.userid,
                            type: _this.regtype
                        });
                        // console.log("document data:", type.regType);
                    }
                    else {
                        console.log("no such document");
                    }
                });
            }
            else {
                _this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_7__pages_login_login__["a" /* LoginPage */]);
            }
        }, function () {
            _this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_7__pages_login_login__["a" /* LoginPage */]);
        });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])('nav'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* Nav */])
    ], MyApp.prototype, "nav", void 0);
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"C:\Users\Chris\source\Workspaces\paidpromotefirebase2\src\app\app.html"*/'<ion-nav #nav></ion-nav>\n'/*ion-inline-end:"C:\Users\Chris\source\Workspaces\paidpromotefirebase2\src\app\app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* Platform */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* App */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */],
            __WEBPACK_IMPORTED_MODULE_4__services_auth_service__["a" /* AuthService */],
            __WEBPACK_IMPORTED_MODULE_5__angular_fire_firestore__["a" /* AngularFirestore */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 520:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return firebaseConfig; });
var firebaseConfig = {
    fire: {
        apiKey: "AIzaSyDJop3W-yw4iYysE4PZw8uOxLTLWNbvGvI",
        authDomain: "testing-a6ea0.firebaseapp.com",
        databaseURL: "https://testing-a6ea0.firebaseio.com",
        projectId: "testing-a6ea0",
        storageBucket: "testing-a6ea0.appspot.com",
        messagingSenderId: "953053843315"
    }
};
//# sourceMappingURL=config.js.map

/***/ }),

/***/ 92:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_fire_auth__ = __webpack_require__(158);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var AuthService = /** @class */ (function () {
    function AuthService(afAuth) {
        var _this = this;
        this.afAuth = afAuth;
        afAuth.authState.subscribe(function (user) {
            _this.user = user;
        });
    }
    AuthService.prototype.signInWithEmail = function (credentials) {
        console.log('Sign in with email');
        return this.afAuth.auth.signInWithEmailAndPassword(credentials.email, credentials.password);
    };
    AuthService.prototype.signUp = function (credentials) {
        return this.afAuth.auth.createUserWithEmailAndPassword(credentials.email, credentials.password);
    };
    AuthService.prototype.getID = function () {
        return this.afAuth.auth.currentUser.uid;
    };
    AuthService.prototype.getCurrentUser = function () {
        return this.afAuth.auth.currentUser;
    };
    AuthService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_fire_auth__["a" /* AngularFireAuth */]])
    ], AuthService);
    return AuthService;
}());

//# sourceMappingURL=auth.service.js.map

/***/ }),

/***/ 94:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__vendorprofile_vendorprofile__ = __webpack_require__(164);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__package_package__ = __webpack_require__(95);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ads_ads__ = __webpack_require__(165);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__marketerads_marketerads__ = __webpack_require__(166);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__marketerprofile_marketerprofile__ = __webpack_require__(300);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_ionic_angular__ = __webpack_require__(28);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var HomePage = /** @class */ (function () {
    function HomePage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        // roots to any page
        this.ads = __WEBPACK_IMPORTED_MODULE_2__ads_ads__["a" /* AdsPage */];
        this.marketerAds = __WEBPACK_IMPORTED_MODULE_3__marketerads_marketerads__["a" /* MarketerAdsPage */];
        this.package = __WEBPACK_IMPORTED_MODULE_1__package_package__["a" /* PackagePage */];
        this.profile = __WEBPACK_IMPORTED_MODULE_0__vendorprofile_vendorprofile__["a" /* VendorProfilePage */];
        this.marketerProfile = __WEBPACK_IMPORTED_MODULE_4__marketerprofile_marketerprofile__["a" /* MarketerProfilePage */];
        // roots to any page
        this.params = {
            type: '',
            userid: ''
        };
        var type = navParams.get('type');
        var userId = navParams.get('userId');
        this.params.type = type;
        this.params.userid = userId;
        console.log("type of login", this.params.type);
        console.log("user Id", this.params.userid);
        this.regType = type;
    }
    HomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_5__angular_core__["m" /* Component */])({
            selector: 'page-home',template:/*ion-inline-start:"C:\Users\Chris\source\Workspaces\paidpromotefirebase2\src\pages\home\home.html"*/'\n\n<ion-content padding>\n\n  <!-- pages for marketer -->\n  <div *ngIf="regType == \'marketer\'">\n    <ion-tabs class="tabs-icon">\n      <ion-tab tabIcon="browsers" tabTitle="Iklan" [root]="marketerAds" [rootParams]="params"></ion-tab>\n      <ion-tab tabIcon="contact" tabTitle="Profil" [root]="marketerProfile" [rootParams]="params"></ion-tab>\n    </ion-tabs>\n  </div>\n  <!-- pages for marketer -->\n\n  <!-- pages for vendor -->\n  <div *ngIf="regType == \'vendor\'">\n    <ion-tabs class="tabs-icon">\n      <ion-tab tabIcon="contact" tabTitle="Profil" [root]="profile" [rootParams]="params"></ion-tab>\n      <ion-tab tabIcon="browsers" tabTitle="Iklan" [root]="ads" [rootParams]="params"></ion-tab>\n    </ion-tabs>\n  </div>\n  <!-- pages for vendor -->\n\n\n\n</ion-content>\n'/*ion-inline-end:"C:\Users\Chris\source\Workspaces\paidpromotefirebase2\src\pages\home\home.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_6_ionic_angular__["i" /* NavController */], __WEBPACK_IMPORTED_MODULE_6_ionic_angular__["j" /* NavParams */]])
    ], HomePage);
    return HomePage;
}());

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 95:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PackagePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__vendorprofile_vendorprofile__ = __webpack_require__(164);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(28);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var PackagePage = /** @class */ (function () {
    function PackagePage(navCtrl, alertCtrl) {
        this.navCtrl = navCtrl;
        this.alertCtrl = alertCtrl;
        this.regType = "vendor";
    }
    PackagePage.prototype.submitPackageMini = function () {
        alert("you have mini package");
        this.presentPrompt();
    };
    PackagePage.prototype.submitPackageMedium = function () {
        alert("you have medium package");
        this.presentPrompt();
    };
    PackagePage.prototype.submitPackageMax = function () {
        alert("you have max package");
        this.presentPrompt();
    };
    PackagePage.prototype.presentPrompt = function () {
        var _this = this;
        var nextStep = this.alertCtrl.create({
            title: 'Konfirmasi',
            message: 'Lanjutkan ke tahap unggah bukti transfer ?',
            buttons: [
                {
                    text: 'Nanti',
                    handler: function (data) {
                        console.log('Batal');
                    }
                },
                {
                    text: 'Ok',
                    handler: function (data) {
                        _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_0__vendorprofile_vendorprofile__["a" /* VendorProfilePage */]);
                    }
                }
            ]
        });
        nextStep.present();
    };
    PackagePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["m" /* Component */])({
            selector: 'page-package',template:/*ion-inline-start:"C:\Users\Chris\source\Workspaces\paidpromotefirebase2\src\pages\package\package.html"*/'<ion-header>\n    <ion-navbar>\n      <ion-title>\n        Pilih Paket\n      </ion-title>\n    </ion-navbar>\n  </ion-header>\n\n<ion-content padding>\n\n  <ion-card (click)="submitPackageMini()">\n    <ion-card-header>\n      <ion-item>\n        Promote Mini\n      </ion-item>\n    </ion-card-header>\n    <ion-card-content>\n      Beli 250 poin\n    </ion-card-content>\n  </ion-card>\n  \n  <ion-card (click)="submitPackageMedium()">\n    <ion-card-header>\n      <ion-item>\n        Promote Medium\n      </ion-item>\n    </ion-card-header>\n    <ion-card-content>\n      Beli 500 poin\n    </ion-card-content>\n  </ion-card>\n\n  <ion-card (click)="submitPackageMax()">\n    <ion-card-header>\n      <ion-item>\n        Promote Max\n      </ion-item>\n    </ion-card-header>\n    <ion-card-content>\n      Beli 1000 poin\n    </ion-card-content>\n  </ion-card>\n\n\n</ion-content>\n'/*ion-inline-end:"C:\Users\Chris\source\Workspaces\paidpromotefirebase2\src\pages\package\package.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["i" /* NavController */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["a" /* AlertController */]])
    ], PackagePage);
    return PackagePage;
}());

//# sourceMappingURL=package.js.map

/***/ })

},[310]);
//# sourceMappingURL=main.js.map