import { ComponentFixture, TestBed } from '@angular/core/testing'
import { StepButtonComponent } from './step-button.component'

describe('StepButtonComponent', () => {
  let component: StepButtonComponent
  let fixture: ComponentFixture<StepButtonComponent>

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StepButtonComponent]
    })
    fixture = TestBed.createComponent(StepButtonComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
