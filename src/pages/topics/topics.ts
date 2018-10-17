import { ProgressPage } from './../progress/progress';
import { ViewChild, Component } from '@angular/core';
import { Slides } from 'ionic-angular';
import { NavController , NavParams ,Platform} from 'ionic-angular';

@Component({
  selector: 'page-topics',
  templateUrl: 'topics.html'
})
export class TopicsPage {
  
  @ViewChild(Slides) slides: Slides;

  constructor(public navCtrl: NavController , public navParams:NavParams) {
  
  }

  setTopic(topicName:string){
    this.navCtrl.push(ProgressPage,{
      topic:topicName,
    })
  }

  }