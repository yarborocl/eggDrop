import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: "ed-page-not-found",
  templateUrl: "./page-not-found.component.html",
  styleUrls: ["./page-not-found.component.scss"],
})
export class PageNotFoundComponent {
  public url: string;

  constructor(private _router: Router) {
    this.url = "";
  }

  public ngOnInit(): void {
      this.url = this._router.url;
      console.log(this.url);
  }
}
