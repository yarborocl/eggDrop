import { Component, OnInit } from '@angular/core';
import { ResultsGlobal } from '../../services';
import {Router, ActivatedRoute, Params} from '@angular/router';

@Component({
  selector: 'ed-summary',
  templateUrl: "./summary.component.html",
  styleUrls: ["./summary.component.scss"],
})
export class SummaryComponent {
  public results: Array<number>;
  public time: Array<string>;
  public tags: Array<string>;
  public activeTag: string;
  constructor(private _resultsGlobal: ResultsGlobal, private _activatedRoute: ActivatedRoute, private _router: Router) {
    this.results = [];
    this.tags = [];
    this.time = [];
  }
  public ngOnInit() {
    console.log(this.activeTag);
    console.log(this);
    console.log(this._resultsGlobal.getLabels(this.activeTag));
    this.tags = this._resultsGlobal.getTags();
    if (this.activeTag) {
      this.results = this._resultsGlobal.getResults(this.activeTag);
      this.time = this._resultsGlobal.getLabels(this.activeTag);
    }
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
  public getChartData() {
    if (this.activeTag) {
      this.results = this._resultsGlobal.getResults(this.activeTag);
      return this.results;
    }
    else {
      return [];
    }
  }
  public getMaxIndex():number {
    let index: number = -1;
    let maxAccel: number = 0;
    for (let i = 0; i < this.results.length; i++) {
      if (this.results[i] > maxAccel) {
        maxAccel = this.results[i];
        index = i;
      }
    }
    return index;
  }
  public getChartStart(): number {
    // let subIndex = 10 / 4.5;
    let index = this.getMaxIndex() - 10;
    return index < 0 ? 0 : index;
  }
  public getMaxAccel(): number {
    return this.results[this.getMaxIndex()];
  }
  // events
  public exportAsCSV(): void {
    let csvContent = "data:text/csv;charset=utf-8," + this.getCSVString();
    let encodedUri = encodeURI(csvContent);
    let link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "" + this.activeTag + "-data.csv");
    document.body.appendChild(link); // Required for FF
    link.click();
  }
  private getCSVString(): string {
    let activeTagResults: Array<number> = this.results;
    //let activeTagResults: Array<number> = this.results[this.activeTag];
    let activeTagTime: Array<string> = this.time;
    //let activeTagTime: Array<Date> = this.timeResults[this.activeTag];
    let csvString: string = "" + this.activeTag + ", " + "timestamp\n";
    for (let i = 0; i < activeTagResults.length; i++) {
      csvString = csvString.concat("" + activeTagResults[i] + ", " + activeTagTime[i] + "\n");
    }
    return csvString;
  }
}
