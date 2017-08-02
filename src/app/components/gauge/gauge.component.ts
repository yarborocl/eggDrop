import { Component, Input } from '@angular/core';
import { GaugeSegment, GaugeLabel } from 'ng-gauge';


@Component({
  selector: 'ed-gauge',
  templateUrl: "./gauge.component.html",
  styleUrls: ["./gauge.component.scss"]
})
export class GaugeComponent {
  @Input('data') public currentValue:number;
  options = {
    min: 0,
    decimals: 2,
    levelColors: ['#00D38A','#FEF268','#E4465D'],
    label: 'm/s' + '\u00B2',
    title: 'Acceleration',
    valueFontFamily: 'roboto',
    labelFontFamily: 'roboto'
  };
  max = 50;

  constructor() {

  }
}
