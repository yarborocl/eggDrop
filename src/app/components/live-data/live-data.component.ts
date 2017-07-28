import { Component, OnInit, NgZone } from '@angular/core';
import { IOTProvider } from '../../services';

import {
  MqttMessage,
  MqttModule,
  MqttService,
  OnMessageEvent
} from 'ngx-mqtt';

import { InteractCloudant } from '../../services/interact-cloudant/interact-cloudant.service';


const NUM_RESULTS = 40;

@Component({
  selector: "ed-live-data",
  templateUrl: "./live-data.component.html",
  styleUrls: ["./live-data.component.scss"],
})
export class LiveDataComponent implements OnInit {
  // lineChart
public results:Array<any>;
public lineChartData:Array<any>;
public lineChartLabels:Array<any>;
public lineChartOptions:any = {
  responsive: false
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
public lineChartLegend:boolean = true;
public lineChartType:string = 'line';

constructor(private _iot: IOTProvider, private _interactCloudant: InteractCloudant) {
  this.results = new Array();
  this.lineChartLabels = new Array(NUM_RESULTS);
  this.lineChartData = [
    {
      data: new Array(NUM_RESULTS),
      label: "Acceleration"
    }
  ];
}

public getChartData() {
  let length = this.results.length;
  return [{
    label: 'Accleration',
    data: this.results.slice(length - NUM_RESULTS, length)
  }];
}

public ngOnInit() {
  this._iot.getMQTTStream().subscribe((message: MqttMessage) => {
    this.pushData(message);
  });
}

public pushData(message: MqttMessage): void {
  let messageJson = JSON.parse(message.payload.toString());
  // console.log(messageJson);
  let accelX = messageJson.d.accelerometer[0];
  let accelY = messageJson.d.accelerometer[1];
  let accelZ = messageJson.d.accelerometer[2];
  let normal =  this.normalizeAcceleration(accelX, accelY, accelZ);
  this.results.push(normal);
}

public normalizeAcceleration(accelX: number, accelY: number, accelZ: number): number {
  return Math.sqrt(accelX**2 + accelY**2 + accelZ**2) * 9.8;
}

public randomize():void {
  let _lineChartData:Array<any> = new Array(this.lineChartData.length);
  for (let i = 0; i < this.lineChartData.length; i++) {
    _lineChartData[i] = {data: new Array(this.lineChartData[i].data.length), label: this.lineChartData[i].label};
    for (let j = 0; j < this.lineChartData[i].data.length; j++) {
      _lineChartData[i].data[j] = Math.floor((Math.random() * 100) + 1);
    }
  }
  this.lineChartData = _lineChartData;
}

// events
public exportAsCSV(): void {
  this._interactCloudant.exportAsCSV();
}

public chartClicked(e:any):void {
  console.log(e);
}

public chartHovered(e:any):void {
  console.log(e);
}
}
