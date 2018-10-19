import { TopicsPage } from './../topics/topics';
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
        /* {
          word: 'Cow',
          image: 'assets/imgs/content/Animals/cow.png',
        }, */
        {
          word: 'Giraffe',
          image: 'assets/imgs/content/Animals/giraffe.png',
        },
        {
          word: 'Elephant',
          image: 'assets/imgs/content/Animals/elephant.png',
        }
  
     
  ];

  objects=[
        {
          word: 'Table',
          image: 'assets/imgs/content/Object/table.png',
        },
        {
          word: 'Car',
          image: 'assets/imgs/content/Object/car.png',
        },
        {
          word: 'Bus',
          image: 'assets/imgs/content/Object/bus.png',
        },
        {
          word: 'Door',
          image: 'assets/imgs/content/Object/door.png',
        },
        {
          word: 'Computer',
          image: 'assets/imgs/content/Object/computer.png',
        },
        {
          word: 'Keys',
          image: 'assets/imgs/content/Object/Key.png',
        },
        {
          word: 'Desk',
          image: 'assets/imgs/content/Object/bureau.png',
        },
        {
          word: 'Chair',
          image: 'assets/imgs/content/Object/chair.png',
        }
 
  ];

  numbersLetters=[
    {
      word: 'A',
      image: 'assets/imgs/content/Letters&Numbres/a.png',
    },
    {
      word: '10',
      image: 'assets/imgs/content/Letters&Numbres/10.png',
    },
    {
      word: 'D',
      image: 'assets/imgs/content/Letters&Numbres/d.png',
    },
    {
      word: 'Z',
      image: 'assets/imgs/content/Letters&Numbres/z.png',
    },
    {
      word: 'W',
      image: 'assets/imgs/content/Letters&Numbres/w.png',
    },
    {
      word: '7',
      image: 'assets/imgs/content/Letters&Numbres/7.png',
    },
    {
      word: '8',
      image: 'assets/imgs/content/Letters&Numbres/8.png',
    },
    {
      word: 'B',
      image: 'assets/imgs/content/Letters&Numbres/b.png',
    },
    {
      word: 'K',
      image: 'assets/imgs/content/Letters&Numbres/k.png',
    },
    {
      word: '6',
      image: 'assets/imgs/content/Letters&Numbres/6.png',
    },
    {
      word: '5',
      image: 'assets/imgs/content/Letters&Numbres/5.png',
    },
    {
      word: '1',
      image: 'assets/imgs/content/Letters&Numbres/1.png',
    },
    {
      word: 'T',
      image: 'assets/imgs/content/Letters&Numbres/t.png',
    },
    {
      word: '2',
      image: 'assets/imgs/content/Letters&Numbres/2.png',
    }

  ];
  
  fruits=[
    {
      word: 'Appel',
      image: 'assets/imgs/content/Fruites/Appel.png',
    },
    {
      word: 'Ananas',
      image: 'assets/imgs/content/Fruites/ananas.png',
    },
    {
      word: 'Tomato',
      image: 'assets/imgs/content/Fruites/tomato.png',
    },
    {
      word: 'Orange',
      image: 'assets/imgs/content/Fruites/orange.png',
    },
    {
      word: 'Onion',
      image: 'assets/imgs/content/Fruites/onion.png',
    },
    {
      word: 'Strawberry',
      image: 'assets/imgs/content/Fruites/fraisier.png',
    },
    {
      word: 'Potato',
      image: 'assets/imgs/content/Fruites/potato.png',
    },
    {
      word: 'Garlic',
      image: 'assets/imgs/content/Fruites/garlic.png',
    },
    {
      word: 'Pomegranate',
      image: 'assets/imgs/content/Fruites/grenade.png',
    },
    {
      word: 'Carrot',
      image: 'assets/imgs/content/Fruites/carrot.png',
    }

  ];
  jobs=[
    {
      word: 'Doctor',
      image: 'assets/imgs/content/Jobs/doctor.png',
    },
    {
      word: 'Nurse',
      image: 'assets/imgs/content/Jobs/nurse.png',
    },
    {
      word: 'Officer',
      image: 'assets/imgs/content/Jobs/officier.png',
    },
    {
      word: 'Pilot',
      image: 'assets/imgs/content/Jobs/pilot.png',
    },
    {
      word: 'Engineer',
      image: 'assets/imgs/content/Jobs/engineer.png',
    },
    {
      word: 'Secretary',
      image: 'assets/imgs/content/Jobs/secretarire.png',
    },
    {
      word: 'Teacher',
      image: 'assets/imgs/content/Jobs/teacher.png',
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
      case "Numbers/Letters": { 
        this.currentItems=this.numbersLetters;
         //statements; 
         break; 
      }
      case "Fruits/Vegetables": { 
        this.currentItems=this.fruits;
         //statements; 
         break; 
      }
      case "Jobs": { 
        this.currentItems=this.jobs;
         //statements; 
         break; 
      }
      case "Objects": { 
        this.currentItems=this.objects;
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
  backToMenu(){
    this.navCtrl.push(TopicsPage);
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
