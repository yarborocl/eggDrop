import { Injectable } from '@angular/core';

@Injectable()
export class ResultsGlobal {
  private resultsGlobal: Object;
  constructor() {
    this.resultsGlobal = {};
  }
  public getTags() {
    return Object.keys(this.resultsGlobal).sort();
  }
  public getResults(tag: string) {
    if (this.verifyTag(tag)) {
      return this.resultsGlobal[tag].values;
    }
    return [];
  }
  public getLabels(tag: string) {
    if (this.verifyTag(tag)) {
      return this.resultsGlobal[tag].labels;
    }
    return [];
  }
  public setResults(tag: string, array: Array<any>) {
    if (this.verifyTag(tag)) {
      this.resultsGlobal[tag].values = array;
    }
  }
  public setLabels(tag: string, array: Array<any>) {
    if (this.verifyTag(tag)) {
      this.resultsGlobal[tag].labels = array;
    }
  }
  public push(tag: string, value: any): void {
    if (this.verifyTag(tag)) {
      if (typeof value === 'number') {
        console.log('pushing value');
        this.resultsGlobal[tag].values.push(value);
      }
      else if (typeof value === 'string') {
        console.log('pushing label');
        this.resultsGlobal[tag].labels.push(value);
      }
      else if (typeof value === 'object') {
        this.resultsGlobal[tag].values.push(value.value);
        this.resultsGlobal[tag].labels.push(value.label);
      }
    }
  }
  private verifyTag(tag: string): boolean {
    if (tag === undefined) {
      return false;
    }
    if (!this.resultsGlobal[tag] && typeof tag === 'string') {
      this.resultsGlobal[tag] = {
        values: [],
        labels: []
      }
    }
    return true;
  }
}

type Sensortag = {
  values: Array<number>,
  labels: Array<string> //time
}
