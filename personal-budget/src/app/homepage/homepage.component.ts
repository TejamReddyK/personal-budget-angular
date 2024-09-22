import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Chart } from 'chart.js/auto';
import { DataService } from '../data.service'; // Import your DataService

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {

  public dataSource: any = {
    datasets: [
      {
        data: [],
        backgroundColor: ['#ffcd56', '#ff6384', '#36a2eb', '#fd6b19', '#ababab', '#a03291', '#2910de'],
      }
    ],
    labels: []
  };

  constructor(private dataService: DataService, @Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit(): void {
    this.dataService.fetchData().subscribe((res: any) => {
      this.dataService.setData(res.myBudget); // Save data to the DataService
      for (let i = 0; i < res.myBudget.length; i++) {
        this.dataSource.datasets[0].data[i] = res.myBudget[i].budget;
        this.dataSource.labels[i] = res.myBudget[i].title;
      }
      this.createChart();
    });
  }

  createChart() {
    if (isPlatformBrowser(this.platformId)) {
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
}
