import { Injectable } from '@angular/core';
import { CREDS } from './cloudant.config';

@Injectable()
export class InteractCloudant {
  private _endpoint: string;
  private _username: string;
  private _password: string;
  constructor() {
    this._endpoint = CREDS.httpApiEndpoint;
    this._username = CREDS.username;
    this._password = CREDS.password;
  }
  public exportAsCSV(): void {
    console.log("export");
  }

}
