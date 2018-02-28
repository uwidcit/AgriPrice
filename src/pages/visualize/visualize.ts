import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Chart } from 'chart.js';

@IonicPage()
@Component({
  selector: 'page-visualize',
  templateUrl: 'visualize.html',
})
export class VisualizePage {

  @ViewChild('lineCanvas2') lineCanvas2;
  @ViewChild('lineCanvas') lineCanvas;

  lineChart2: any;
  lineChart: any;
  graphData = [];
  graphLabels = [];
  monthlyGraphData = [];
  monthyLabels = [];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.graphData = navParams.get('param1');
    this.graphLabels = navParams.get('param2');
    this.monthlyGraphData = navParams.get('param3');
    this.monthyLabels = navParams.get('param4');
  }

  ionViewDidLoad() {

    this.lineChart2 = new Chart(this.lineCanvas2.nativeElement, {

        type: 'line',
        data: {
            labels: this.monthyLabels,
            datasets: [
                {
                    label: "TTD per pound(Monthly)",
                    fill: true,
                    lineTension: 0.1,
                    backgroundColor: "rgba(75,192,192,0.4)",
                    borderColor: "rgba(75,192,192,1)",
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: "rgba(75,192,192,1)",
                    pointBackgroundColor: "#fff",
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: "rgba(75,192,192,1)",
                    pointHoverBorderColor: "rgba(220,220,220,1)",
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    data: this.monthlyGraphData,
                    spanGaps: false,
                }
            ]
        }

    });

    this.lineChart = new Chart(this.lineCanvas.nativeElement, {

        type: 'line',
        data: {
            labels: this.graphLabels,
            datasets: [
                {
                    label: "TTD per pound(Daily)",
                    fill: false,
                    lineTension: 0.1,
                    backgroundColor: "rgba(75,192,192,0.4)",
                    borderColor: "rgba(75,192,192,1)",
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: "rgba(75,192,192,1)",
                    pointBackgroundColor: "#fff",
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: "rgba(75,192,192,1)",
                    pointHoverBorderColor: "rgba(220,220,220,1)",
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    data: this.graphData,
                    spanGaps: false,
                }
            ]
        }

    });

  }

}
