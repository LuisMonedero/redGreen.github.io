import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  constructor(public router: Router){
  }

  checkName(name:string){
    if(name!=""){
      this.router.navigate(['home/'+name]);
    }
  }
}
