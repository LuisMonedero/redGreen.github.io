import { Component } from '@angular/core'
import { Router } from '@angular/router'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  constructor (public route: Router) {}

  checkName (name: string): void {
    if (name !== '') {
      void this.route.navigate(['home/' + name])
    }
  }
}
