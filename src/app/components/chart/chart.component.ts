import { Component, Input } from '@angular/core';

@Component({
  selector: 'ed-chart',
  templateUrl: "./chart.component.html",
  styleUrls: ["./chart.component.scss"],
})
export class ChartComponent {
  // Inputs
  @Input('data') public results: Array<number> = [];
  @Input() public chartWindow: number = 40;
  @Input() public valsPerSec: number = 4.5;
  @Input() public showSlider: boolean = true;
  @Input() public start: number;
  // Line chart config variables
  public lineChartData:Array<any>;
  public lineChartLabels:Array<any>;
  public lineChartOptions:any = {
    responsive: false,
    scales: {
              yAxes: [{
                  ticks: {
                      beginAtZero: true
                  }
              }]
    },
    tooltips: {
      enabled: false
    },
    animation: false
  };
  public lineChartColors:Array<any> = [
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // dark grey
      backgroundColor: 'rgba(77,83,96,0.2)',
      borderColor: 'rgba(77,83,96,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    },
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  public lineChartLegend:boolean = false;
  public lineChartType:string = 'line';
  // Values used for slicing results array
  public fromValue:number;
  public toValue:number;
  public maxValue:number;

  constructor() {
    this.lineChartLabels = new Array(this.chartWindow);
    this.lineChartData = this.createAccelerationObject(new Array(this.chartWindow));
    this.maxValue = 0;
  }

  public getChartData() {
    let data = this.createAccelerationObject(this.sliceResults());
    return data;
  }
  public getMaxSlider() {
    return this.indexToSlider(this.results.length);
  }
  public getFromSlider() {
    let sliderWindow = this.indexToSlider(this.chartWindow);
    let currentSliderValue = this.indexToSlider(this.results.length);
    let diff = currentSliderValue - sliderWindow;
    return (diff > 0) ? diff : 0;
  }
  //event received when user manually changes slider
  public onIntervalChange(event:any) {
    this.toValue = event.to;
    this.fromValue = event.from;
  }
  private sliceResults() {
    if (this.start) {
      return this.results.slice(this.start, this.start + 40);
    }
    if (Number.isInteger(this.fromValue) && Number.isInteger(this.toValue)) {
      let fromIndex = this.sliderToIndex(this.fromValue);
      let toIndex = this.sliderToIndex(this.toValue);
      if (toIndex - fromIndex > this.chartWindow) {
        toIndex = fromIndex + this.chartWindow;
      }
      return this.results.slice(fromIndex, toIndex);
    }
    else {
      return this.getRecent();
    }
  }
  private getRecent() {
    let begin, end: number;
    end = this.results.length;
    begin = (end > this.chartWindow) ? end - this.chartWindow : 0;
    return this.results.slice(begin, end);
  }
  private indexToSlider(length: number) {
    return Math.ceil(length / this.valsPerSec);
  }
  private sliderToIndex(seconds: number) {
    return Math.floor(seconds * this.valsPerSec);
  }
  private createAccelerationObject(data:Array<number>) {
    return new Array({
    label: "Acceleration",
    data: data
    });
  }
}
