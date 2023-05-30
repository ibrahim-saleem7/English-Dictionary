import { Component} from '@angular/core';
import { ServiceService } from './services/service.service';
import { faVolumeHigh } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  {

  searchWord : string = '';
  res! : any
  meanings:any
  phonetic:any
  synonyms : any
  isDone : boolean = false
  notFind :boolean = false
  faVolumeHigh = faVolumeHigh;
  audio :string = ''

  constructor( private service : ServiceService){}



  loodData(){
    this.service.getData(this.searchWord).subscribe(( res:any) => {

      this.res = res[0]
      this.meanings = this.res.meanings[0]

      for ( let x of this.res.phonetics){
        if(x.audio != ''){
          this.audio = x.audio
          break
        }
      }

      this.phonetic= `${this.res.meanings[0].partOfSpeech} ${this.res.phonetic?? ""} `
      this.synonyms = this.meanings.synonyms
      this.isDone=true
    },

    (err: any)=>{
      this.notFind =true
    }
    )
  }


  close(){
    this.searchWord = ''
    this.isDone = false
    this.notFind =false
  }

  play(){
    let audio = new Audio
    audio.src = this.audio
    audio.load()
    audio.play()
  }

  title = 'English-Dictionary';
}
