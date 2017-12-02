import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { AlertController ,LoadingController, Loading} from 'ionic-angular';
import 'rxjs/add/operator/map';


@Injectable()
export class PreloaderProvider {


  private loading : any;
  
     constructor( public http        : Http,
                  public loadingCtrl : LoadingController) 
     {
     }
  
  
  
     displayPreloader() : void
     {
        this.loading = this.loadingCtrl.create({
           content: 'Please wait...'
        });
  
        this.loading.present();
     }
  
  
  
     hidePreloader() : void
     {
        this.loading.dismiss();
     }

}
