import { ProgressPage } from './../progress/progress';
import { TopicsPage } from './../topics/topics';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-end',
  templateUrl: 'end.html'
})
export class EndPage {
  
  score:string;
  topicName:string;

  constructor(public navCtrl: NavController,public navParams:NavParams) {
    this.score = this.navParams.get('score');
    this.topicName = this.navParams.get('topic');
  }

  backToMenuFromEndPage(){
            this.navCtrl.push(TopicsPage);   
  }
  backToSameTopic(){
    this.navCtrl.push(ProgressPage,{
      topic:this.topicName,
    })
  };

}
