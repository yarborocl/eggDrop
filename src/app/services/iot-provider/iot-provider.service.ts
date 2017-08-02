import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, URLSearchParams } from '@angular/http';

import { Observable } from 'rxjs/Rx';

import { CREDS } from './iot.config';
import { sprintf } from "sprintf-js";

import 'rxjs/add/operator/map';

import {
  MqttMessage,
  MqttModule,
  MqttService
} from 'ngx-mqtt';

@Injectable()
export class IOTProvider {
  private _endpoint: string;
  private _key: string;
  private _token: string;
  public myMessage;


  constructor(private _http: Http, private _mqttService: MqttService) {
    this._endpoint = CREDS.httpApiEndpoint;
    this._key = CREDS.apiKey;
    this._token = CREDS.apiToken;
  }

  public getMQTTStream(path: string=this.getPath()): Observable<MqttMessage> {
    return this._mqttService.observe(path);
  }

  public unsafePublish(topic: string, message: string): void {
    this._mqttService.unsafePublish(topic, message, {qos: 1, retain: true});
  }

  private getAuthToken(): string {
    let token = btoa(this._key + ":" + this._token);
    //console.log(token);
    return token;
  }
  private getPath(deviceType:string="SensortagType", deviceId:string="+", eventId:string="+", formatString:string="+"): string {
    let path = sprintf('iot-2/type/%s/id/%s/evt/%s/fmt/%s', deviceType, deviceId, eventId, formatString);
    return path;
  }
}
