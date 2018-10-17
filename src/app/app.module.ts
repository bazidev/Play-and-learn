import { ProgressPage } from './../pages/progress/progress';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import {SpeechRecognition} from "@ionic-native/speech-recognition";

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LevelPage } from '../pages/level/level';
import { SlidPage } from './../pages/slid/slid';
import { TopicsPage } from '../pages/topics/topics';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LevelPage,
    ProgressPage,
    SlidPage,
    TopicsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp,{
      menuType: 'push',
      platforms: {
        ios: {
          menuType: 'overlay',
        }
      }
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LevelPage,
    ProgressPage,
    SlidPage,
    TopicsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    SpeechRecognition,
    SlidPage,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
