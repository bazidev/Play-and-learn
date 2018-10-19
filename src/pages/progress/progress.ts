import { SlidPage } from './../slid/slid';
import { Component, ChangeDetectorRef } from '@angular/core';
import { NavController, NavParams, Platform ,AlertController} from 'ionic-angular';
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
  level: string;
  mark : number =2; // mark for current word by default 2 , if help used 1 , wrong 0
  score: number = 0; // score
  topic: string;
  index: number = 0;
  wordHelp : string;
  isenabled: boolean = false;
  currentItems:any[];
  animals = [
        {
          word: 'Cat',
          image: 'assets/imgs/content/Animals/cat.png',
        },
        {
          word: 'Chicken',
          image: 'assets/imgs/content/Animals/chicken.png',
        },
        {
          word: 'Dog',
          image: 'assets/imgs/content/Animals/dog.png',
        },
        {
          word: 'Rabbit',
          image: 'assets/imgs/content/Animals/rabbit.png',
        },
        {
          word: 'Lion',
          image: 'assets/imgs/content/Animals/lion.png',
        },
        {
          word: 'Horse',
          image: 'assets/imgs/content/Animals/horse.png',
        },
        {
          word: 'Elephant',
          image: 'assets/imgs/content/Animals/elephant.png',
        }
  
     
  ];

  numbers=[
        {
          word: 'chicken',
          image: 'assets/imgs/content/Animals/chicken.jpg',
        },
        {
          word: 'chicken',
          image: 'assets/imgs/content/Animals/chicken.jpg',
        },
        {
          word: 'penguin',
          image: 'assets/imgs/content/Animals/mouse.png',
        }
 
  ];
  matches: String[];
  isRecording = false;

  constructor(public navCtrl: NavController,private alertCtrl: AlertController, public navParams: NavParams, private speechRecognition: SpeechRecognition, private plt: Platform, private cd: ChangeDetectorRef) {
    this.topic = this.navParams.get('topic');
    console.log(this.topic);

    switch(this.topic) { 
      case "Animals": { 
         //statements; 
         this.currentItems=this.animals;
         break; 
      } 
      case "Numbers": { 
        this.currentItems=this.numbers;
         //statements; 
         break; 
      } 
      default: { 
        this.currentItems=this.animals;
         //statements; 
         break; 
      } 
   } 
   

   console.log(this.currentItems);
    //    this.currentItems = $filter('filter')(this.items, {'topic':this.topic}) 
  }



  ionViewDidLoad() {
    this.slides.lockSwipes(true);
  }

  skip()
  {
    this.wordHelp='';
    this.isenabled = false;
    if(this.index== this.currentItems.length)
    {
      //go to end page
      return;
    }
    this.index++;
    this.slides.lockSwipes(false);
    this.slides.slideNext();
    this.slides.lockSwipes(true);
    this.mark=2;
  }

  next() {
    this.wordHelp='';
    this.score += this.mark;
    //disable next button
    this.isenabled = false;
    if(this.index== this.currentItems.length)
    {
      console.log("end");
      return;
      //go to end page
    }

    this.index++;
    this.slides.lockSwipes(false);
    this.slides.slideNext();
    this.slides.lockSwipes(true);
    this.mark=2;
  }

  presentAlert() {
    this.mark =1;
    this.wordHelp = String(this.currentItems[this.index].word)
                    .substr(0,3)+this.currentItems[this.index].word
                    .slice(-this.currentItems[this.index].word.length+3)
                    .replace(/./g, "*");
    let alert = this.alertCtrl.create({
      title: 'The first three letters:',
      subTitle: "<b>" + this.wordHelp + "</b>",
      buttons: ['Close']
    });
    this.mark =1;
    this.wordHelp = String(this.currentItems[this.index].word)
                    .substr(0,3)+this.currentItems[this.index].word
                    .slice(-this.currentItems[this.index].word.length+3)
                    .replace(/./g, "*");
    alert.present();
  }
  
  wordValidation() {
    if (this.matches.indexOf(this.currentItems[this.index].word) > -1) {
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
