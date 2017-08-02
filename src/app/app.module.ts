import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '@angular/material';
import 'hammerjs';
import { RouterModule, Routes } from '@angular/router';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { HttpModule } from '@angular/http';
import { FormsModule }   from '@angular/forms';
import { IonRangeSliderModule } from 'ng2-ion-range-slider';
import { GaugeModule } from 'ng-gauge';
import { JustgageModule } from 'angular2-justgage';

import { AppComponent } from './app.component';
import { PageNotFoundComponent, LiveDataComponent, SummaryComponent, ChartComponent, GaugeComponent } from './components';

import { IOTProvider, ResultsGlobal } from './services';

import {
  MqttMessage,
  MqttModule,
  MqttService,
  OnMessageEvent
} from 'ngx-mqtt';

import { MQTT_SERVICE_OPTIONS, mqttServiceFactory } from './services/iot-provider/iot.config'

const routes: Routes = [
  { path: '', redirectTo: '/live_data', pathMatch: 'full'},
  { path: 'live_data', component: LiveDataComponent },
  { path: 'summary', component: SummaryComponent },
  { path: '**', component: PageNotFoundComponent }
]

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    LiveDataComponent,
    SummaryComponent,
    ChartComponent,
    GaugeComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    RouterModule.forRoot(routes),
    ChartsModule,
    HttpModule,
    MqttModule.forRoot({
      provide: MqttService,
      useFactory: mqttServiceFactory
    }),
    FormsModule,
    IonRangeSliderModule,
    GaugeModule,
    JustgageModule
  ],
  providers: [
    IOTProvider,
    ResultsGlobal
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
