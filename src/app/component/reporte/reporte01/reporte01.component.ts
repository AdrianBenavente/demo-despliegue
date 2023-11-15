import { Component, OnInit } from '@angular/core';
import { ChartType } from 'chart.js';
import { ChartOptions, ChartDataset } from 'chart.js';
import { TaskService } from 'src/app/service/task.service';

@Component({
  selector: 'app-reporte01',
  templateUrl: './reporte01.component.html',
  styleUrls: ['./reporte01.component.css'],
})
export class Reporte01Component implements OnInit {
  barChartOptions: ChartOptions = {
    responsive: true,
  };
  barChartLabels: string[] = [];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartData: ChartDataset[] = [];
  constructor(private tS: TaskService) {}
  ngOnInit(): void {
    this.tS.getSuma().subscribe((data) => {
      this.barChartLabels = data.map((item) => item.namePerson);
      this.barChartData=[
        {
          data:data.map(item=>item.totalDifficuty),label:'Total Dificultad asignada',
          backgroundColor:'rgba(255,0,0,0.5)'
        }
      ]
    });
  }
}
