import { Component, HostListener } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { PlayerService } from '../../services/player-data-base.service'

const speaker = new Audio()
@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent {
  public name!: string
  public lastStep?: string
  public greenMilliseconds: number = 10000
  public redInterval?: any
  public greenInterval?: any
  public score: number = 0
  public buttonClass: string = 'light redLight'
  public maxScore: number = 0
  public player: any

  constructor (private readonly activeRoute: ActivatedRoute, public route: Router, private readonly playerService: PlayerService) {}

  ngOnInit (): void {
    this.activeRoute.params.subscribe((params) => {
      this.name = params['name']
    })
    this.player = history.state?.player || { name: this.name, score: 0, maxScore: 0 }
    this.name = history.state?.player?.name || this.name
    this.score = history.state?.player?.score || 0
    this.maxScore = history.state?.player?.maxScore || 0
  }

  ngAfterViewInit (): void {
    this.redInterval = setInterval(() => { this.changeLightToGreen() }, 3000)
  }

  stopSound (): void {
    speaker.pause()
  }

  clearIntervalsAndAudio (): void {
    clearInterval(this.redInterval)
    clearInterval(this.greenInterval)
    this.stopSound()
  }

  async ngOnDestroy (): Promise<void> {
    this.clearIntervalsAndAudio()
    await this.savePlayer()
  }

  @HostListener('window:unload', ['$event'])
  async beforeUnloadHandler (event: BeforeUnloadEvent): Promise<boolean> {
    this.clearIntervalsAndAudio()
    await this.savePlayer()
    event.preventDefault()
    return false
  }

  playSound (): void {
    speaker.src = '../../../assets/squid_game_sound.mp3'
    speaker.defaultPlaybackRate = 5000 / this.greenMilliseconds
    speaker.load()
    void speaker.play()
  }

  changeLightToGreen (): void {
    clearInterval(this.redInterval)
    this.buttonClass = 'light greenLight'
    this.greenMilliseconds = Math.max(10000 - (this.score * 100), 2000) + (Math.random() * 3000 - 1500)
    this.greenInterval = setInterval(() => { this.changeLightToRed() }, this.greenMilliseconds)
    this.playSound()
  }

  changeLightToRed (): void {
    clearInterval(this.greenInterval)
    this.buttonClass = 'light redLight'
    this.redInterval = setInterval(() => { this.changeLightToGreen() }, 3000)
  }

  updatePlayerProps (): void {
    this.player = { ...this.player, name: this.name, score: this.score, maxScore: this.maxScore }
  }

  async savePlayer (): Promise<void> {
    this.updatePlayerProps()
    const activePlayer = await this.playerService.getPlayerFromName(this.name)
    if (activePlayer.name === '') await this.playerService.addPlayer(this.player)
    else await this.playerService.addPlayer({ ...this.player, id: activePlayer.id, name: activePlayer.name })
  }

  async backHome (): Promise<void> {
    try {
      this.clearIntervalsAndAudio()
      await this.savePlayer()
      void this.route.navigate(['home'])
    } catch (error) {
      console.error('Error saving player:', error)
    }
  }

  pressLeft (): void {
    if (this.buttonClass !== 'light redLight') {
      if ((this.lastStep != null) && this.lastStep === 'left') {
        this.score--
        if (this.score < 0) this.score = 0
      } else {
        this.score++
        this.lastStep = 'left'
        this.maxScore = (this.score > this.maxScore) ? this.score : this.maxScore
      }
    } else {
      this.score = 0
      this.lastStep = ''
      clearInterval(this.redInterval)
      this.changeLightToRed()
    }
  }

  vibrate (): void {
    if ('vibrate' in navigator) {
      navigator.vibrate(500)
    } else {
      console.log('La API de vibración no está disponible en este dispositivo.')
    }
  }

  pressRight (): void {
    if (this.buttonClass !== 'light redLight') {
      if ((this.lastStep != null) && this.lastStep === 'right') {
        this.score--
        this.vibrate()
        if (this.score < 0) this.score = 0
      } else {
        this.score++
        this.lastStep = 'right'
        this.maxScore = (this.score > this.maxScore) ? this.score : this.maxScore
      }
    } else {
      this.vibrate()
      this.score = 0
      this.lastStep = ''
      clearInterval(this.redInterval)
      this.changeLightToRed()
    }
  }
}
