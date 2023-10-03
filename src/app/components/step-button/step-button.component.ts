import { Component, Input } from '@angular/core'

@Component({
  selector: 'app-step-button',
  templateUrl: './step-button.component.html',
  styleUrls: ['./step-button.component.scss']
})
export class StepButtonComponent {
  @Input() nameButton!: string
  @Input() classSvg!: string
  @Input() textPositionLeft!: boolean
}
