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
  selector: 'page-menu-camara',
  templateUrl: 'menu-camara.html',
})
export class MenuCamaraPage {

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


  takePhotoLindas() {
    this.Camera.getPicture({
      quality: 100,
      destinationType: this.Camera.DestinationType.DATA_URL,
      sourceType: this.Camera.PictureSourceType.CAMERA,
      encodingType: this.Camera.EncodingType.PNG,
      saveToPhotoAlbum: true
      
    }).then(imageData => {
      this.myPhoto = imageData;
       
      this.uploadPhotoLindas();
     
    }, error => {
      console.log("ERROR -> " + JSON.stringify(error));
    });
  }

  selectPhotoLindas(): void {
    this.Camera.getPicture({
      sourceType: this.Camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: this.Camera.DestinationType.DATA_URL,
      quality: 100,
      encodingType: this.Camera.EncodingType.PNG,
    }).then(imageData => {
      this.myPhoto = imageData;

     let mispinner = this.SpinnerStart();
      mispinner.present();
      this.uploadPhotoLindas();
      mispinner.dismiss();
    }, error => {
      console.log("ERROR -> " + JSON.stringify(error));
    });
  }

  private uploadPhotoLindas(): void {
    this.myPhotosRefLindas.child(this.generateUUID())
      .putString(this.myPhoto, 'base64', { contentType: 'image/png' })
      .then((savedPicture) => {
        let mispinner = this.SpinnerStart();
        mispinner.present();
        this.myPhotoURL = savedPicture.downloadURL;
        this.list.push({
          usuario:this.username,
          tipo:"cosaLinda",
          url:this.myPhotoURL});
        mispinner.dismiss();
      });
  }

  private uploadPhotoFeas(): void {
    this.myPhotosRefFeas.child(this.generateUUID())
      .putString(this.myPhoto, 'base64', { contentType: 'image/png' })
      .then((savedPicture) => {
        this.myPhotoURL = savedPicture.downloadURL;
        this.list.push({
          usuario:this.username,
          tipo:"cosaFea",
          url:this.myPhotoURL});
      });
  }

  takePhotoFeas() {
    this.Camera.getPicture({
      quality: 100,
      destinationType: this.Camera.DestinationType.DATA_URL,
      sourceType: this.Camera.PictureSourceType.CAMERA,
      encodingType: this.Camera.EncodingType.PNG,
      saveToPhotoAlbum: true
    }).then(imageData => {
      this.myPhoto = imageData;
      
      this.uploadPhotoFeas();
     
    }, error => {
      console.log("ERROR -> " + JSON.stringify(error));
    });
  }

  selectPhotoFeas(): void {
    this.Camera.getPicture({
      sourceType: this.Camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: this.Camera.DestinationType.DATA_URL,
      quality: 100,
      encodingType: this.Camera.EncodingType.PNG,
    }).then(imageData => {
      this.myPhoto = imageData;

     let mispinner = this.SpinnerStart();
      mispinner.present();
      this.uploadPhotoFeas();
      mispinner.dismiss();
    }, error => {
      console.log("ERROR -> " + JSON.stringify(error));
    });
  }


  private generateUUID(): any {
    var d = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx'.replace(/[xy]/g, function (c) {
      var r = (d + Math.random() * 16) % 16 | 0;
      d = Math.floor(d / 16);
      return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MenuCamaraPage');
  }



  SpinnerStart():Loading
  {
    let loader= this.spinner.create({

      duration: 3000000,
      content:"Subiendo su Foto"
    })
    return loader;
  
  }

}
