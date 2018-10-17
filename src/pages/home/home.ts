import { TopicsPage } from './../topics/topics';
import { LevelPage } from './../level/level';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  
  constructor(public navCtrl: NavController) {

  }
  openPage(){
    this.navCtrl.push(TopicsPage);
  }

}
