import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent {
  public name?: string;
  private lastStep?: string;
  public greenMilliseconds: number = 10000;
  private redInterval?: any;
  private greenInterval?: any;
  public marcador: number = 0;
  public buttonClass: string = "btn btn-danger";
  public maxScore: number = 0;

  constructor(private activeRoute:ActivatedRoute, public route: Router){}

  ngOnInit(){
    this.marcador = 0;
    this.greenMilliseconds = 10000;
    this.activeRoute.params.subscribe(params => {
      this.name = params['id'];
    });
  }

  ngAfterViewInit(){
    this.redInterval = setInterval(() => this.changeLightToGreen(), 3000);
  }

  changeLightToGreen(){
    clearInterval(this.redInterval);
    this.buttonClass = "btn btn-valid";
    this.greenMilliseconds = Math.max(10000 - (this.marcador * 100), 2000) + (Math.random() * 3000 - 1500);
    this.greenInterval = setInterval(() => this.changeLightToRed(), this.greenMilliseconds);
  }
  changeLightToRed(){
    clearInterval(this.greenInterval);
    this.buttonClass = "btn btn-danger";
    this.redInterval = setInterval(() => this.changeLightToGreen(), 3000);
  }

  backHome(){
    clearInterval(this.redInterval)
    clearInterval(this.greenInterval)
    this.route.navigate(['home']);
  }

  pressLeft(){
    if(this.buttonClass != "btn btn-danger"){
      if(this.lastStep && this.lastStep == 'left'){
        this.marcador--;
        if(this.marcador < 0)
          this.marcador = 0;
      }
      else{
        this.marcador++;
        this.lastStep = 'left';
        this.maxScore = (this.marcador > this.maxScore) ? this.marcador : this.maxScore;
      }
    } else {
      this.marcador = 0;
      this.lastStep = "";
      clearInterval(this.redInterval);
      this.changeLightToRed();
    }
  }

  pressRight(){
    if(this.buttonClass != "btn btn-danger"){
      if(this.lastStep && this.lastStep == 'right'){
        this.marcador--;
        if(this.marcador < 0)
          this.marcador = 0;
      }
      else{
        this.marcador++;
        this.lastStep = 'right';
        this.maxScore = (this.marcador > this.maxScore) ? this.marcador : this.maxScore;
      }
    } else {
      this.marcador = 0;
      this.lastStep = "";
      clearInterval(this.redInterval);
      this.changeLightToRed();
    }
  }

}
