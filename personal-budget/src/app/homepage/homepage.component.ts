import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Chart, ChartItem } from 'chart.js/auto';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss'
})
export class HomepageComponent implements OnInit {

  public dataSource:any =  {
    datasets: [
        {
            data: [],
            backgroundColor: ['#ffcd56', '#ff6384', '#36a2eb', '#fd6b19', '#ababab', '#a03291', '#2910de'],
        }
    ],
    labels: []
};
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get('http://localhost:3000/budget')
    .subscribe((res: any) => {
      for (var i = 0; i < res.myBudget.length; i++) {
        this.dataSource.datasets[0].data[i] = res.myBudget[i].budget;
        this.dataSource.labels[i] = res.myBudget[i].title;

    }
    this.createChart();
    });
  }
  createChart() {
        let chartStatus = Chart.getChart('myChart');
        if (chartStatus != undefined) {
          chartStatus.destroy();
        }
        var ctx = <HTMLCanvasElement>document.getElementById('myChart');
        var myPieChart = new Chart(ctx, {
          type: 'pie',
          data: this.dataSource
        });
      }
}





