import { Component, OnInit } from '@angular/core';
// import * as CanvasJS from './canvasjs.min.js';
// import * as JQuery from "jquery";

// declare var JQuery: any;
// const $ = JQuery.default;

declare var CanvasJS: any;
@Component({
  selector: 'app-home-admin',
  templateUrl: './home-admin.component.html',
  styleUrls: ['./home-admin.component.css']
})
export class HomeAdminComponent {

  constructor() { }

  ngOnInit() {
    let chart = new CanvasJS.Chart('chartContainer', {
      theme: 'light1', // "light2", "dark1", "dark2"
      title: {
        text: '',
      },
      data: [
        {
          type: 'column', // Change type to "bar", "area", "spline", "pie",etc.
          dataPoints: [
            { label: 'apple', y: 10 },
            { label: 'orange', y: 15 },
            { label: 'banana', y: 25 },
            { label: 'mango', y: 30 },
            { label: 'grape', y: 28 },
          ],
        },
      ],
    });
    chart.render();


    let chart2 = new CanvasJS.Chart('chartContainer1', {
      theme: 'light1', // "light2", "dark1", "dark2"
      title: {
        text: '',
      },
      data: [
        {
          type: 'pie', // Change type to "bar", "area", "spline", "pie",etc.
          dataPoints: [
            { label: 'apple', y: 10 },
            { label: 'orange', y: 15 },
            { label: 'banana', y: 25 },
            { label: 'mango', y: 30 },
            { label: 'grape', y: 28 },
          ],
        },
      ],
    });
    chart2.render();
  
  }
  

}
