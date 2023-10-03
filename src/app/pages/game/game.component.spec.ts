import { ComponentFixture, TestBed } from '@angular/core/testing'
import { ActivatedRoute } from '@angular/router'
import { of } from 'rxjs'
import { GameComponent } from './game.component'
import { StepButtonComponent } from 'src/app/components/step-button/step-button.component'

describe('GameComponent', () => {
  let component: GameComponent
  let fixture: ComponentFixture<GameComponent>
  let mockActivatedRoute: ActivatedRoute

  beforeEach(async () => {
    mockActivatedRoute = {
      params: of({ name: 'Luis' })
    } as unknown as ActivatedRoute

    await TestBed.configureTestingModule({
      declarations: [GameComponent, StepButtonComponent],
      providers: [
        { provide: ActivatedRoute, useValue: mockActivatedRoute }
      ]
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(GameComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should update player score and maxScore', () => {
    component.score = 50
    component.maxScore = 100
    component.updatePlayerProps()
    expect(component.player.score).toBe(50)
    expect(component.player.maxScore).toBe(100)
  })

  it('should increment score when step button is clicked', () => {
    const button = fixture.nativeElement.querySelector('app-step-button')
    component.buttonClass = 'light greenLight'
    button.click()
    expect(component.score).toBe(1)
  })

  it('should update player score and maxScore when step button is clicked', () => {
    const button = fixture.nativeElement.querySelector('app-step-button')
    component.score = 100
    component.maxScore = 100
    component.buttonClass = 'light greenLight'
    component.lastStep = 'right'
    button.click()
    expect(component.score).toBe(101)
    expect(component.maxScore).toBe(101)
  })

  it('should play sound', () => {
    const audioSpy = spyOn(window.HTMLMediaElement.prototype, 'play')
    component.playSound()
    expect(audioSpy).toHaveBeenCalled()
  })

  it('should change light to red', () => {
    component.changeLightToRed()
    expect(component.buttonClass).toBe('light redLight')
  })

  it('should vibrate', () => {
    const navigatorSpy = spyOn(navigator, 'vibrate')
    component.vibrate()
    expect(navigatorSpy).toHaveBeenCalled()
  })

  it('should update player score and lastStep when right button is pressed and greenLight', () => {
    component.score = 0
    component.maxScore = 100
    component.lastStep = ''
    component.buttonClass = 'light greenLight'
    component.pressRight()
    expect(component.score).toBe(1)
    expect(component.lastStep).toBe('right')
  })

  it('should update player score when right button is pressed and redLight', () => {
    component.score = 1
    component.lastStep = ''
    component.buttonClass = 'light redLight'
    component.pressRight()
    expect(component.score).toBe(0)
  })

  it('should update player score when right button is pressed twice with greenlight', () => {
    component.score = 1
    component.lastStep = ''
    component.buttonClass = 'light greenLight'
    component.pressRight()
    component.pressRight()
    expect(component.score).toBe(1)
  })

  it('shouldnt update player score when right button is pressed three times and cant be under 0', () => {
    component.score = 0
    component.lastStep = ''
    component.buttonClass = 'light greenLight'
    component.pressRight()
    component.pressRight()
    component.pressRight()
    expect(component.score).toBe(0)
  })

  it('should update player score when left button is pressed twice with greenlight', () => {
    component.score = 1
    component.lastStep = ''
    component.maxScore = 100
    component.buttonClass = 'light greenLight'
    component.pressLeft()
    component.pressLeft()
    expect(component.score).toBe(1)
  })

  it('should update player score when left button is pressed and redLight', () => {
    component.score = 100
    component.lastStep = ''
    component.buttonClass = 'light redLight'
    component.pressLeft()
    expect(component.score).toBe(0)
  })

  it('shouldnt update player score when left button is pressed three times and cant be under 0', () => {
    component.score = 0
    component.lastStep = ''
    component.buttonClass = 'light greenLight'
    component.pressLeft()
    component.pressLeft()
    component.pressLeft()
    expect(component.score).toBe(0)
  })

  it('should set confirmation message when beforeunload event is triggered', () => {
    const event = new Event('beforeunload')
    void component.beforeUnloadHandler(event)
    expect(event.returnValue).toBe(true)
  })
})
