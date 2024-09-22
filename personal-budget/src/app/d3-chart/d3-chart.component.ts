import { Component, OnInit, ElementRef } from '@angular/core';
import { DataService } from '../data.service'; // Import the DataService
import * as d3 from 'd3';

@Component({
  selector: 'app-d3-chart',
  templateUrl: './d3-chart.component.html',
  styleUrls: ['./d3-chart.component.scss']
})
export class D3ChartComponent implements OnInit {
  private data: any[] = []; // Array to hold the fetched data

  constructor(private elementRef: ElementRef, private dataService: DataService) {}

  ngOnInit(): void {
    // Check if data is already populated
    if (!this.dataService.getData()) {
      // Fetch data from the service
      this.dataService.fetchData().subscribe((res: any) => {
        this.dataService.setData(res.myBudget); // Store the data in the service
        this.data = res.myBudget; // Assuming the response structure
        this.createChart();
      });
    } else {
      // If data is already present, use it directly
      this.data = this.dataService.getData();
      this.createChart();
    }
  }

  private createChart(): void {
    const width = 400;
    const height = 200;

    const svg = d3.select(this.elementRef.nativeElement)
      .select('svg')
      .attr('width', width)
      .attr('height', height);

    svg.selectAll('*').remove(); // Clear previous drawings

    const barHeight = height / this.data.length;

    const bars = svg.selectAll('rect')
      .data(this.data)
      .enter()
      .append('rect')
      .attr('width', (d: any) => d.budget) // Assuming budget is the value
      .attr('height', barHeight - 1)
      .attr('y', (d: any, i: number) => i * barHeight)
      .attr('fill', 'steelblue');
  }
}
