import { NgModule } from '@angular/core'
import { RouterModule, type Routes } from '@angular/router'
import { HomeComponent } from './pages/home/home.component'
import { GameComponent } from './pages/game/game.component'

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'home/:id', component: GameComponent }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
