import { SlidPage } from './../slid/slid';
import { Component , ChangeDetectorRef} from '@angular/core';
import { NavController , NavParams ,Platform} from 'ionic-angular';
import { ViewChild } from '@angular/core';
import { Slides } from 'ionic-angular';
import { SpeechRecognition } from '@ionic-native/speech-recognition';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'page-progress',
  templateUrl: 'progress.html'
})
export class ProgressPage {
  @ViewChild(Slides) slides: Slides;
  level    : string; 
  topic    : string;
  index    : number=0;
  isenabled: boolean=false;
  items    : any[];
  matches  : String[];
  isRecording = false;
  currentItems:string[];
  
  constructor(public navCtrl: NavController , public navParams:NavParams ,private speechRecognition: SpeechRecognition, private plt: Platform, private cd: ChangeDetectorRef) {
    this.topic =this.navParams.get('topic');
    console.log(this.topic);

    this.items = [
      {
        topic:"animals",
        data:[
          {
          word: 'penguin',
          image: 'assets/imgs/adult/easy/penguin.png',
        },
        {
          word: 'chicken',
          image: 'assets/imgs/adult/easy/chicken.jpg',
           },
        {
          word: 'penguin',
          image: 'assets/imgs/adult/easy/mouse.png',
        }
      ]
      }
,{
  topic:"number",
  data:[
    {
    word: 'penguin',
    image: 'assets/imgs/adult/easy/penguin.png',
  },
  {
    word: 'chicken',
    image: 'assets/imgs/adult/easy/chicken.jpg',
     },
  {
    word: 'penguin',
    image: 'assets/imgs/adult/easy/mouse.png',
  }
]
}     
    ];

//    this.currentItems = $filter('filter')(this.items, {'topic':this.topic}) 
  }



  ionViewDidLoad() {
    this.slides.lockSwipes(true);
  }
  next() {
    //disable next button
    this.isenabled=false;
    this.index++;
    this.slides.lockSwipes(false);
    this.slides.slideNext();
    this.slides.lockSwipes(true);
  }

  wordValidation(){
    if(this.matches.indexOf(this.items[this.index].word) >-1 )
    {
      this.matches.push("valid");
      this.isenabled = true;
    }
    this.matches.push("not valid");
  } 

  isIos() {
    return this.plt.is('ios');
  }
 
  stopListening() {
    this.speechRecognition.stopListening().then(() => {
      this.isRecording = false;
    });
  }

  getPermission() {
    this.speechRecognition.hasPermission()
      .then((hasPermission: boolean) => {
        if (!hasPermission) {
          this.speechRecognition.requestPermission();
        }
      });
  }

  startListening() {
    this.getPermission();
    let options = {
      language: 'en-US'
    }
    this.speechRecognition.startListening().subscribe(matches => {
      this.matches = matches;
      this.cd.detectChanges();
       this.wordValidation();
    });
    this.isRecording = true;
  }
}
