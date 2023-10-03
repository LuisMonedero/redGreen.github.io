import { ComponentFixture, TestBed } from '@angular/core/testing'
import { RouterTestingModule } from '@angular/router/testing'
import { HomeComponent } from './home.component'
import { Router } from '@angular/router'

describe('HomeComponent', () => {
  let component: HomeComponent
  let fixture: ComponentFixture<HomeComponent>
  let router: Router

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [HomeComponent]
    }).compileComponents()

    fixture = TestBed.createComponent(HomeComponent)
    component = fixture.componentInstance
    router = TestBed.inject(Router)
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should navigate to game component with name parameter', async () => {
    const name = 'Luis'
    const navigateSpy = spyOn(router, 'navigate')
    await component.checkName(name)
    expect(navigateSpy).toHaveBeenCalled()
  })

  it('should not navigate when checkName is called with an empty string', () => {
    const routerSpy = spyOn(component.route, 'navigate')
    void component.checkName('')
    expect(routerSpy).not.toHaveBeenCalled()
  })
})
