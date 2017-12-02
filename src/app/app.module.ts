import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';

//import { Camera } from '@ionic-native/camera';
import { MenuCamaraPage } from '../pages/menu-camara/menu-camara';

import { Camera } from '@ionic-native/camera';
import { File } from '@ionic-native/file';
import { Transfer } from '@ionic-native/transfer';
import { FilePath } from '@ionic-native/file-path';
import { PreloaderProvider } from '../providers/preloader/preloader';

//import { EventProvider } from "../providers/event/event";

export const firebaseConfig = {
  apiKey: "AIzaSyBHraX9FO-Y5VSh10PTwmSGN7OZaXzOb2I",
  authDomain: "apprelevamiento.firebaseapp.com",
  databaseURL: "https://apprelevamiento.firebaseio.com",
  projectId: "apprelevamiento",
  storageBucket: "apprelevamiento.appspot.com",
  messagingSenderId: "1020210814159"
};

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    LoginPage,
    RegisterPage,
    MenuCamaraPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    LoginPage,
    RegisterPage,
    MenuCamaraPage
  ],
  providers: [
    Camera,
    StatusBar,
    File,
    Transfer,
    Camera,
    FilePath,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    PreloaderProvider
  ]
})
export class AppModule {}
