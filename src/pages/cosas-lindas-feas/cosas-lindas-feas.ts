import { Component , NgZone} from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { NavController,IonicPage, NavParams,ActionSheetController, ToastController, Platform, LoadingController, Loading } from 'ionic-angular';
import { File } from '@ionic-native/file';
import { Transfer, TransferObject } from '@ionic-native/transfer';
import { FilePath } from '@ionic-native/file-path';
import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';
import firebase from 'firebase';

@IonicPage()
@Component({
  selector: 'page-cosas-lindas-feas',
  templateUrl: 'cosas-lindas-feas.html',
})
export class CosasLindasFeasPage {

  public myPhotosRefLindas: any;
  public myPhotosRefFeas: any;
  public myPhoto: any;
  public myPhotoURL: any;
  public listaDeFotos: any[];
  username : string;
  list: FirebaseListObservable<any>;

  constructor(public navCtrl: NavController,
               public navParams: NavParams,
               public spinner:LoadingController,
               db:AngularFireDatabase,
               public zone: NgZone,
                private Camera: Camera) {

                  this.username = navParams.get("usuario");
                  this.myPhotosRefLindas = firebase.storage().ref('/CosasLindas/');
                  this.myPhotosRefFeas = firebase.storage().ref('/CosasFeas/');
                  this.list=db.list('/Fotos');
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CosasLindasFeasPage');
  }

}
