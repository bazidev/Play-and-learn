import { TopicsPage } from './../topics/topics';
import { Component, ChangeDetectorRef } from '@angular/core';
import { NavController, NavParams, Platform ,AlertController, ToastController} from 'ionic-angular';
import { ViewChild } from '@angular/core';
import { Slides } from 'ionic-angular';
import { SpeechRecognition } from '@ionic-native/speech-recognition';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { EndPage } from '../end/end';

@Component({
  selector: 'page-progress',
  templateUrl: 'progress.html'
})
export class ProgressPage {
  @ViewChild(Slides) slides: Slides;
  level: string;
  mark : number =1; // mark for current word by default 2 , if help used 1 , wrong 0
  score: number = 0; // score
  topic: string;
  index: number = 0;
  wordHelp : string;
  isenabled: boolean = false;
  currentItems:any[];
  animals = [
        {
          word: 'chat',
          image: 'assets/imgs/content/Animals/cat.png',
        },
        {
          word: 'poulet',
          image: 'assets/imgs/content/Animals/chicken.png',
        },
        {
          word: 'chien',
          image: 'assets/imgs/content/Animals/dog.png',
        },
        {
          word: 'lapin',
          image: 'assets/imgs/content/Animals/rabbit.png',
        },
        {
          word: 'lion',
          image: 'assets/imgs/content/Animals/lion.png',
        },
        {
          word: 'cheval',
          image: 'assets/imgs/content/Animals/horse.png',
        },
         {
          word: 'vache',
          image: 'assets/imgs/content/Animals/cow.png',
        },
        {
          word: 'girafe',
          image: 'assets/imgs/content/Animals/giraffe.png',
        },
        {
          word: 'éléphant', 
          image: 'assets/imgs/content/Animals/elephant.png',
        }
  
     
  ];

  objects=[
        {
          word: 'table',
          image: 'assets/imgs/content/Object/table.png',
        },
        {
          word: 'voiture',
          image: 'assets/imgs/content/Object/car.png',
        },
        {
          word: 'bus',
          image: 'assets/imgs/content/Object/bus.png',
        },
        {
          word: 'porte',
          image: 'assets/imgs/content/Object/door.png',
        },
        {
          word: 'ordinateur',
          image: 'assets/imgs/content/Object/computer.png',
        },
        {
          word: 'clé',
          image: 'assets/imgs/content/Object/key.png',
        },
        {
          word: 'bureau',
          image: 'assets/imgs/content/Object/bureau.png',
        },
        {
          word: 'chaise',
          image: 'assets/imgs/content/Object/chair.png',
        }
 
  ];

  numbersLetters=[
    {
      word: 'v',
      image: 'assets/imgs/content/Letters&Numbres/v.png',
    },
    {
      word: 'sept',
      image: 'assets/imgs/content/Letters&Numbres/7.png',
    },
    {
      word: 'z',
      image: 'assets/imgs/content/Letters&Numbres/z.png',
    },
    {
      word: 'quatre',
      image: 'assets/imgs/content/Letters&Numbres/4.png',
    },
    {
      word: 'w',
      image: 'assets/imgs/content/Letters&Numbres/w.png',
    },
    {
      word: 'b',
      image: 'assets/imgs/content/Letters&Numbres/b.png',
    },
    {
      word: 'un',
      image: 'assets/imgs/content/Letters&Numbres/1.png',
    },
    {
      word: 'six',
      image: 'assets/imgs/content/Letters&Numbres/6.png',
    },
    {
      word: 'cinq',
      image: 'assets/imgs/content/Letters&Numbres/5.png',
    },
  ];
  
  fruits=[
    {
      word: 'pomme',
      image: 'assets/imgs/content/Fruites/Appel.png',
    },
    {
      word: 'ananas',
      image: 'assets/imgs/content/Fruites/ananas.png',
    },
    {
      word: 'tomate',
      image: 'assets/imgs/content/Fruites/tomato.png',
    },
    {
      word: 'orange',
      image: 'assets/imgs/content/Fruites/orange.png',
    },
    {
      word: 'onion',
      image: 'assets/imgs/content/Fruites/onion.png',
    },
    {
      word: 'fraise',
      image: 'assets/imgs/content/Fruites/fraisier.png',
    },
    {
      word: 'pomme de terre',
      image: 'assets/imgs/content/Fruites/potato.png',
    },
    {
      word: 'grenade',
      image: 'assets/imgs/content/Fruites/grenade.png',
    },
    {
      word: 'carotte',
      image: 'assets/imgs/content/Fruites/carrot.png',
    }

  ];
  jobs=[
    {
      word: 'docteur',
      image: 'assets/imgs/content/Jobs/doctor.png',
    },
    {
      word: 'infirmier',
      image: 'assets/imgs/content/Jobs/nurse.png',
    },
    {
      word: 'policier',
      image: 'assets/imgs/content/Jobs/officier.png',
    },
    {
      word: 'pilote',
      image: 'assets/imgs/content/Jobs/pilot.png',
    },
    {
      word: 'ingénieur',
      image: 'assets/imgs/content/Jobs/engineer.png',
    },
    {
      word: 'fonctionnaire',
      image: 'assets/imgs/content/Jobs/secretarire.png',
    },
    {
      word: 'professeur',
      image: 'assets/imgs/content/Jobs/teacher.png',
    }

  ];
  matches: String[];
  isRecording = false;

  constructor(public navCtrl: NavController,public toastCtrl:ToastController ,private alertCtrl: AlertController, public navParams: NavParams, private speechRecognition: SpeechRecognition, private plt: Platform, private cd: ChangeDetectorRef) {
    this.topic = this.navParams.get('topic');
    console.log(this.topic);

    switch(this.topic) { 
      case "Animaux": { 
         //statements; 
         this.currentItems=this.animals;
         break; 
      } 
      case "Nombres et lettres": { 
        this.currentItems=this.numbersLetters;
         //statements; 
         break; 
      }
      case "Fruits et légumes": { 
        this.currentItems=this.fruits;
         //statements; 
         break; 
      }
      case "Métiers": { 
        this.currentItems=this.jobs;
         //statements; 
         break; 
      }
      case "Objets": { 
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
      this.navCtrl.push(EndPage,{
        score:''+this.score,
        topic:''+this.topic
      });
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
      
      //go to end page
      this.navCtrl.push(EndPage,{
        score:''+this.score,
        topic:''+this.topic
      });
      return;
    }

    this.index++;
    this.slides.lockSwipes(false);
    this.slides.slideNext();
    this.slides.lockSwipes(true);
    this.mark=1;
  }
  backToMenu(){
    let alert = this.alertCtrl.create({
      title: '<b>Voulez vous vraiment terminer cette partie et aller au menu?</b>',
      message: '',
      buttons: [
        
        {
          text: 'Oui',
          handler: () => {
            this.navCtrl.push(TopicsPage);
          }
        },
        {
          text: 'Non',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    alert.present();
  }  
  presentAlert() {
    this.mark =1;
    this.wordHelp = String(this.currentItems[this.index].word)
                    .substr(0,3)+this.currentItems[this.index].word
                    .slice(-this.currentItems[this.index].word.length+3)
                    .replace(/./g, "*");
    let alert = this.alertCtrl.create({
      title: 'Trois premiers lettres:',
      subTitle: "<b>" + this.wordHelp + "</b>",
      buttons: ["J'ai compris!"]
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
      this.matches.push("");
      this.isenabled = true;
        const toast = this.toastCtrl.create({
          message: " BRAVO +1 ! ",
          duration: 4000,
          position:'middle',
          showCloseButton:true
        });
        toast.present();      
    }
    else{
      let mot:String;
    for (let entry of this.matches) {
        mot = entry;
    }
    const toast = this.toastCtrl.create({
      message: "Ce que vous avez dit:"+mot,
      duration: 4000,
      position:'middle',
      showCloseButton:true
    });
    toast.present();
    }

    this.matches.push("");
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
