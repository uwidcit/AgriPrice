import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Chart } from 'chart.js';
import { Firebase } from '@ionic-native/firebase';

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
  crop: any;
  period: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,private firebase: Firebase) {
    this.graphData = navParams.get('param1');
    this.graphLabels = navParams.get('param2');
    this.monthlyGraphData = navParams.get('param3');
    this.monthyLabels = navParams.get('param4');
    this.crop = navParams.get('param5');
    this.period = navParams.get('param6');
    firebase.logEvent("VisualizePage", {content_type: "page_view", item_id: "VisualizePage"});
  }

  ionViewDidLoad() {

    var label1,label2;

    if (this.crop.unit == "Kg"){
      if(this.period.fMonth == this.period.lMonth){
        label2 = "TTD per pound "+this.period.fMonth+" (Daily)";
      }else{
        label2 = "TTD per pound "+this.period.fMonth+"/"+this.period.lMonth+" (Daily)";
      }
      if (this.period.fYear == this.period.lYear){
        label1 = "TTD per pound "+this.period.fYear+" (Monthly)";
      }else{
        label1 = "TTD per pound "+this.period.fYear+"/"+this.period.lYear+" (Monthly)";
      }
    }else{
      if(this.period.fMonth == this.period.lMonth){
        label2 = "TTD per "+this.crop.unit+" "+this.period.fMonth+"(Daily)";
      }else{
        label2 = "TTD per "+this.crop.unit+" "+this.period.fMonth+"/"+this.period.lMonth+" (Daily)";
      }
      if (this.period.fYear == this.period.lYear){
        label1 = "TTD per "+this.crop.unit+" "+this.period.fYear+" (Monthly)";
      }else{
        label1 = "TTD per "+this.crop.unit+" "+this.period.fYear+"/"+this.period.lYear+" (Monthly)";
      }
    }


    this.lineChart2 = new Chart(this.lineCanvas2.nativeElement, {

        type: 'line',
        data: {
            labels: this.monthyLabels,
            datasets: [
                {
                    label:label1,
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
                    label: label2,
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
