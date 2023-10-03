import { ComponentFixture, TestBed } from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import { StepButtonComponent } from './step-button.component'

describe('StepButtonComponent', () => {
  let component: StepButtonComponent
  let fixture: ComponentFixture<StepButtonComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StepButtonComponent]
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(StepButtonComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should display the button name', () => {
    component.nameButton = 'Test Button'
    fixture.detectChanges()
    const button = fixture.debugElement.query(By.css('button'))
    expect(button.nativeElement.textContent.trim()).toBe('Test Button')
  })

  it('should apply the button class', () => {
    component.classSvg = 'test-class'
    fixture.detectChanges()
    const svg = fixture.debugElement.query(By.css('svg'))
    expect(svg.nativeElement.classList.contains('test-class')).toBe(true)
  })

  it('should position the text to the left', () => {
    component.textPositionLeft = true
    fixture.detectChanges()
    const button = fixture.debugElement.query(By.css('button'))
    const span = fixture.debugElement.query(By.css('span'))
    expect(button.nativeElement.firstChild).toBe(span.nativeElement)
  })

  it('should not position the text to the left', () => {
    component.textPositionLeft = false
    fixture.detectChanges()
    const button = fixture.debugElement.query(By.css('button'))
    const span = fixture.debugElement.query(By.css('span'))
    expect(button.nativeElement.firstChild).not.toBe(span.nativeElement)
  })
})
