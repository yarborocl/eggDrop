import { Component, OnInit, OnDestroy, NgZone } from '@angular/core';
import { IOTProvider, ResultsGlobal } from '../../services';
import { NgModel } from '@angular/forms';
import { IonRangeSliderModule } from "ng2-ion-range-slider";
import { NgIf } from '@angular/common';
import { Observable } from 'rxjs/Rx';
import { ChartComponent, GaugeComponent } from '../../components';
import { ActivatedRoute, Params, Router } from '@angular/router';

import {
  MqttMessage,
  MqttModule,
  MqttService,
  OnMessageEvent
} from 'ngx-mqtt';

const NUM_RESULTS = 40;

@Component({
  selector: "ed-live-data",
  templateUrl: "./live-data.component.html",
  styleUrls: ["./live-data.component.scss"],
})
export class LiveDataComponent implements OnInit {
    // lineChart
  public subscription:any;
  public mqttStream:any;
  public collect:Boolean;
  public activeTag:string;

  constructor(private _iot: IOTProvider, private _resultsGlobal: ResultsGlobal, private _activatedRoute: ActivatedRoute, private _router: Router) {
  }

  public getChartInput(): Array<number> {
    if (this.activeTag) {
      return this._resultsGlobal.getResults(this.activeTag);
    }
    else return [];
  }
  public ngOnInit() {
    this.mqttStream = this._iot.getMQTTStream();
    this._activatedRoute.queryParams.subscribe((params: Params) => {
        let tag = params['tag'];
        if (this._resultsGlobal.getTags().includes(tag)) {
          this.activeTag = tag;
        }
        else {
          this._router.navigate(['/live_data']);
        }
    });
  }

  public ngOnDestroy() {
    this.unsubscribe();
  }

  //Button functions
  public subscribe() {
    this.subscription = this.mqttStream.subscribe((message: MqttMessage) => {
        this.pushData(message);
    });
    this.collect = true;
  }

  public unsubscribe() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    this.collect = false;
  }

  public resetResults() {
    this._resultsGlobal.setResults(this.activeTag, []);
  }

  public getCurrentResult() {
    let data = this._resultsGlobal.getResults(this.activeTag);
    return data.length > 0 ? data[data.length - 1] : 0;
  }

  public getTags() {
    return this._resultsGlobal.getTags();
  }
  public pushData(message: MqttMessage): void {
      let messageJson = JSON.parse(message.payload.toString());
      let timestamp = messageJson.d.timestamp;
      let tag = messageJson.d.devicename;
      if (messageJson.d && messageJson.d.accelerometer) {
        let accelX = messageJson.d.accelerometer[0];
        let accelY = messageJson.d.accelerometer[1];
        let accelZ = messageJson.d.accelerometer[2];
        let normal =  this.normalizeAcceleration(accelX, accelY, accelZ);
        this._resultsGlobal.push(tag, normal);
        if (!this.activeTag) {
          this.activeTag = tag;
        }
      }
      if (messageJson.d && messageJson.d.timestamp) {
        let date = new Date(timestamp);
        this._resultsGlobal.push(tag, date.toLocaleTimeString());
      }
  }

  public normalizeAcceleration(accelX: number, accelY: number, accelZ: number): number {
    return Math.sqrt(accelX**2 + accelY**2 + accelZ**2) * 9.8;
  }
  public convertToCSV(objArray:Array<Object>) {
      var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
      var str = '';

      for (var i = 0; i < array.length; i++) {
          var line = '';
          for (var index in array[i]) {
              if (line != '') line += ','

              line += array[i][index];
          }

          str += line + '\r\n';
      }

      return str;
  }
  private getCSVString(): string {
    let activeTagResults: Array<number> = this._resultsGlobal.getResults(this.activeTag);
    //let activeTagResults: Array<number> = this.results[this.activeTag];
    let activeTagTime: Array<Date> = this._resultsGlobal.getLabels(this.activeTag);
    //let activeTagTime: Array<Date> = this.timeResults[this.activeTag];
    let csvString: string = "" + this.activeTag + ", " + "timestamp\n";
    for (let i = 0; i < activeTagResults.length; i++) {
      csvString = csvString.concat("" + activeTagResults[i] + ", " + activeTagTime[i] + "\n");
    }
    return csvString;
  }
  // events
  public exportAsCSV(): void {
    if (this.collect) {
      this.unsubscribe();
    }
    let csvContent = "data:text/csv;charset=utf-8," + this.getCSVString();
    let encodedUri = encodeURI(csvContent);
    let link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "" + this.activeTag + "-data.csv");
    document.body.appendChild(link); // Required for FF
    link.click();
  }
}
