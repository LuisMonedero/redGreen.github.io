import { Component } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'

const speaker = new Audio()
@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent {
  public name?: string
  private lastStep?: string
  public greenMilliseconds: number = 10000
  private redInterval?: any
  private greenInterval?: any
  public marcador: number = 0
  public buttonClass: string = 'light redLight'
  public maxScore: number = 0

  constructor (private readonly activeRoute: ActivatedRoute, public route: Router) {}

  ngOnInit (): void {
    this.activeRoute.params.subscribe(params => {
      this.name = params['id']
    })
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

  ngOnDestroy (): void {
    this.clearIntervalsAndAudio()
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
    this.greenMilliseconds = Math.max(10000 - (this.marcador * 100), 2000) + (Math.random() * 3000 - 1500)
    this.greenInterval = setInterval(() => { this.changeLightToRed() }, this.greenMilliseconds)
    this.playSound()
  }

  changeLightToRed (): void {
    clearInterval(this.greenInterval)
    this.buttonClass = 'light redLight'
    this.redInterval = setInterval(() => { this.changeLightToGreen() }, 3000)
  }

  backHome (): void {
    this.clearIntervalsAndAudio()
    void this.route.navigate(['home'])
  }

  pressLeft (): void {
    if (this.buttonClass !== 'light redLight') {
      if ((this.lastStep != null) && this.lastStep === 'left') {
        this.marcador--
        if (this.marcador < 0) this.marcador = 0
      } else {
        this.marcador++
        this.lastStep = 'left'
        this.maxScore = (this.marcador > this.maxScore) ? this.marcador : this.maxScore
      }
    } else {
      this.marcador = 0
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
        this.marcador--
        this.vibrate()
        if (this.marcador < 0) this.marcador = 0
      } else {
        this.marcador++
        this.lastStep = 'right'
        this.maxScore = (this.marcador > this.maxScore) ? this.marcador : this.maxScore
      }
    } else {
      this.vibrate()
      this.marcador = 0
      this.lastStep = ''
      clearInterval(this.redInterval)
      this.changeLightToRed()
    }
  }
}
