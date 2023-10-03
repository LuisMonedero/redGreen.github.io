import { Component } from '@angular/core'
import { Router } from '@angular/router'
import { PlayerService } from '../../services/player-data-base.service'
import { Player } from '../../models/Player'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  constructor (public route: Router, private readonly playerService: PlayerService) {}
  async checkName (name: string): Promise<void> {
    if (name === '') return
    try {
      const player: Player = await this.playerService.getPlayerFromName(name)
      if (player.name === '') player.name = name
      void this.route.navigate(['home/' + name], { state: { player } })
    } catch (error) {
      console.error('Error:', error)
    }
  }
}
