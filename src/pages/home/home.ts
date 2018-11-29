import { VendorProfilePage } from './../vendorprofile/vendorprofile';
import { PackagePage } from './../package/package';
import { AdsPage } from './../ads/ads';
import { MarketerAdsPage } from './../marketerads/marketerads';
import { MarketerProfilePage } from './../marketerprofile/marketerprofile';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  // roots to any page
  ads = AdsPage;
  marketerAds = MarketerAdsPage;
  package = PackagePage;
  profile = VendorProfilePage;
  marketerProfile = MarketerProfilePage;
  // roots to any page

  params = {
    type: '',
    userid : ''
  }

  regType: any;

  

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    let type = navParams.get('type')
    let userId = navParams.get('userId')
    this.params.type = type
    this.params.userid = userId
    console.log("type of login", this.params.type)
    console.log("user Id", this.params.userid)
    this.regType = type
  }
  

  

}
