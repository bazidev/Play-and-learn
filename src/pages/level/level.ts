import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { ProgressPage } from '../progress/progress';
import { Input } from '@angular/core';

@Component({
  selector: 'page-level',
  templateUrl: 'level.html'
})
export class LevelPage {

  @Input()
  NgStyle:{
    [key:string]:string;
  }
  levelPage = LevelPage ;
  level:string;
  topic:string;
  activeB:boolean;
  activeC:boolean;
  activeD:boolean;

  constructor(public navCtrl: NavController , public loadingCtrl: LoadingController) {

  }
  presentLoadingDefault() {
    let loading = this.loadingCtrl.create({
      content: 'Your game is about to begin'
    });
  
    loading.present();
  
    setTimeout(() => {
      loading.dismiss();
    }, 2000);
  }
  setLevelEasy(){
    this.level = 'easy';
    this.activeB = !this.activeB;
  }
  setLevelMed(){
    this.level = 'medium';
    this.activeC = !this.activeC;
  }
  setLevelHard(){
    this.level = 'hard';
    this.activeD = !this.activeD;
  }
  setAnimals(){
    if(this.level == 'easy'){
      this.presentLoadingDefault();
      this.navCtrl.push(ProgressPage,{
        level:'Easy',
        topic:'Animals & Insects'
      })
    }
    else if(this.level == 'medium'){
      this.presentLoadingDefault();
      this.navCtrl.push(ProgressPage,{
        level:'Medium',
        topic:'Animals & Insects'
      })
    }
    else if(this.level == 'hard'){
      this.presentLoadingDefault();
      this.navCtrl.push(ProgressPage,{
        level:'Hard',
        topic:'Animals & Insects'
      })
    }
  }
  setSports(){
    if(this.level == 'easy'){
      this.presentLoadingDefault();
      this.navCtrl.push(ProgressPage,{
        level:'Easy',
        topic:'Sports'
      })
    }
    else if(this.level == 'medium'){
      this.presentLoadingDefault();
      this.navCtrl.push(ProgressPage,{
        level:'Medium',
        topic:'Sports'
      })
    }
    else if(this.level == 'hard'){
      this.presentLoadingDefault();
      this.navCtrl.push(ProgressPage,{
        level:'Hard',
        topic:'Sports'
      })
    }
  }
    setPulicFaces(){
      if(this.level == 'easy'){
        this.presentLoadingDefault();
        this.navCtrl.push(ProgressPage,{
          level:'Easy',
          topic:'Public Faces'
        })
      }
      else if(this.level == 'medium'){
        this.presentLoadingDefault();
        this.navCtrl.push(ProgressPage,{
          level:'Medium',
          topic:'Public Faces'
        })
      }
      else if(this.level == 'hard'){
        this.presentLoadingDefault();
        this.navCtrl.push(ProgressPage,{
          level:'Hard',
          topic:'Public Faces'
        })
      }
    }
    setPlaces(){
      if(this.level == 'easy'){
        this.presentLoadingDefault();
        this.navCtrl.push(ProgressPage,{
          level:'Easy',
          topic:'Places & Cities'
        })
      }
      else if(this.level == 'medium'){
        this.presentLoadingDefault();
        this.navCtrl.push(ProgressPage,{
          level:'Medium',
          topic:'Places & Cities'
        })
      }
      else if(this.level == 'hard'){
        this.presentLoadingDefault();
        this.navCtrl.push(ProgressPage,{
          level:'Hard',
          topic:'Places & Cities'
        })
      }
    }   
  }

 

