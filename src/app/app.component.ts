import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public listOptions: Array<Object>;
  title = 'app';

  constructor() {
    this.listOptions = [
      {
        label: "Live Data",
        link: "/live_data"
      },
      {
        label: "Summary",
        link: "/summary"
      }
    ]
  }

}
