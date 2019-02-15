import { Component, ViewChild } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'codaemon-assignment';
  search: any = {};
  progressPer: number = 0;
  isInProgress: boolean = false;
  headers: Array<any> = [
    { displayName: 'List No.', keyName: 'list_no' },
    { displayName: 'Exam No.', keyName: 'exam_no' },
    { displayName: 'Fist Name', keyName: 'first_name' },
    { displayName: 'Last Name', keyName: 'last_name' },
    { displayName: 'List Agenct Desc.', keyName: 'list_agency_desc' },
    { displayName: 'List Title Desc.', keyName: 'list_title_desc' },
    { displayName: 'Published Date', keyName: 'published_date' },
  ]
  tableData: Array<any> = [];
  constructor(public http: HttpClient) { }

  getData(params: any = { first_name: null, last_name: null }) {
    this.tableData = []; this.progressPer = 0;
    this.setProgressBar();
    this.http.get(`${environment.API_BASEURL}?${this.getURLQueryParams(params)}`)
      .subscribe(res => {
        this.tableData = JSON.parse(JSON.stringify(res));
      });
  }
  getURLQueryParams(options) {
    let params = new URLSearchParams();
    for (let key in options) {
      if (options[key]) params.set(key, options[key].toUpperCase())
    }
    return params;
  }

  setProgressBar() {
    this.isInProgress = true;
    let progress = setInterval(() => {
      let rVal = Math.floor(Math.random() * 10);
      if ((this.progressPer + rVal) < 100) this.progressPer += rVal;
      else {
        this.progressPer = 100;
        setTimeout(()=>{
          this.isInProgress = false;
          clearInterval(progress);
        },500);
      }
    }, 200);
  }

}
