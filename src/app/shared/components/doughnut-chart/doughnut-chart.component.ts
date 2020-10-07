import { Component, OnInit, Input, ElementRef, ViewChild } from '@angular/core';
import * as d3 from 'd3';
import { color } from 'd3';

@Component({
  selector: 'app-doughnut-chart',
  templateUrl: './doughnut-chart.component.html',
  styleUrls: ['./doughnut-chart.component.scss']
})
export class DoughnutChartComponent implements OnInit {
  @Input() dataArray: Array<number>;
  @Input() title: string;
  @ViewChild('chart', {static: true}) chartRef: ElementRef;
  value: string;

  constructor() { }

  ngOnInit() {
    this.value = this.dataArray[0] + '/' +  this.dataArray.reduce((a, b) => a + b, 0);
    this.doughnutChart();
  }

  doughnutChart() {
    const node = this.chartRef.nativeElement;
    const element = document.querySelector('.doughnut-chart');
    const style = getComputedStyle(element);
    console.log(parseInt(style.height, 10));
    const width = parseInt(style.width, 10);
    const height = parseInt(style.height, 10);
    const radius = width / 2;

    const colour = d3.scaleLinear<string>()
                     .domain([0, 1])
                     .range(['#3f51b5', '#fff']);

    const pie = d3.pie<any>()
      .sort(null)
      .value((d) => d);

    const canvas = d3.select<any, any>(node)
      .append('svg')
      .attr('width', width)
      .attr('height', height);

    const arcFill = canvas.append('g')
      .attr('transform', 'translate(' + width / 2 + ',' + width / 2 + ')');

    const arcOutline = canvas.append('g')
      .attr('transform', 'translate(' + width / 2 + ',' + width / 2 + ')');

    const arcs = arcOutline.selectAll<any, any>('.arc')
      .data(pie(this.dataArray))
      .enter()
      .append('g')
      .attr('class', 'arc');

    const arc = d3.arc<any>()
      .outerRadius(radius)
      .innerRadius(radius - 15);

    const createGradient = (d: any) => {
      const miniArcs = [];
      const angleExtent = d.endAngle - d.startAngle;
      const noOfArcs = angleExtent * 75;

      colour.domain([0, noOfArcs]);
      const miniArcAngle = angleExtent / noOfArcs;

      for (let j = 0; j < noOfArcs; j++) {
        const startAngle = d.startAngle + (miniArcAngle * j);
        let endAngle = startAngle + miniArcAngle + 0.01;
        endAngle = endAngle > d.endAngle ? d.endAngle : endAngle;
        const miniArc = {
          startAngle,
          endAngle,
          colour: colour(j)
        };
        miniArcs.push(miniArc);
      }

      arcFill.selectAll<any, any>('.arc')
             .data(miniArcs)
             .enter()
             .append('g')
             .append('path')
             .attr('class', 'arc')
             .attr('d', arc)
             .attr('fill', (x) =>  x.colour);

      return 'none';
    };

    arcs.append('path')
      .attr('d', arc)
      .attr('fill', (d: any): any => {
        return d.index === 0 ? createGradient(d) : '#fff';
      });
  }

}
