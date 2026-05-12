import { Component, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import {
  Chart,
  BarController,
  BarElement,
  LineController,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { MonthlyStatDto } from '../../core/models/finance.model';

// Rejestrujemy potrzebne elementy Chart.js
Chart.register(
  BarController, BarElement,
  LineController, LineElement, PointElement,
  CategoryScale, LinearScale,
  Tooltip, Legend, Filler
);

@Component({
  selector: 'app-finance-chart',
  standalone: true,
  imports: [CommonModule, BaseChartDirective],
  templateUrl: './finance-chart.html',
  styleUrl: './finance-chart.css'
})
export class FinanceChartComponent implements OnChanges {

  @Input() monthlyStats: MonthlyStatDto[] = [];
  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  private readonly monthLabels = [
    'Sty', 'Lut', 'Mar', 'Kwi', 'Maj', 'Cze',
    'Lip', 'Sie', 'Wrz', 'Paź', 'Lis', 'Gru'
  ];

  chartType: 'bar' = 'bar';

  chartData: ChartData<'bar'> = {
    labels: this.monthLabels,
    datasets: []
  };

  chartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'index',
      intersect: false,
    },
    plugins: {
      legend: {
        display: true,
        position: 'top',
        align: 'end',
        labels: {
          usePointStyle: true,
          pointStyle: 'circle',
          padding: 20,
          font: {
            family: "'Inter', sans-serif",
            size: 12,
            weight: 500,
          },
          color: '#64748b',
        }
      },
      tooltip: {
        backgroundColor: 'rgba(15, 23, 42, 0.9)',
        titleFont: { family: "'Inter', sans-serif", size: 13, weight: 600 as const },
        bodyFont: { family: "'Inter', sans-serif", size: 12 },
        padding: 12,
        cornerRadius: 10,
        displayColors: true,
        usePointStyle: true,
        callbacks: {
          label: (ctx) => {
            const value = ctx.parsed.y ?? 0;
            return ` ${ctx.dataset.label ?? ''}: ${value.toLocaleString('pl-PL')} PLN`;
          }
        }
      }
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: {
          font: { family: "'Inter', sans-serif", size: 11, weight: 500 },
          color: '#94a3b8'
        },
        border: { display: false }
      },
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(226, 232, 240, 0.6)',
        },
        ticks: {
          font: { family: "'Inter', sans-serif", size: 11 },
          color: '#94a3b8',
          callback: (value) => `${Number(value).toLocaleString('pl-PL')} zł`
        },
        border: { display: false }
      }
    }
  };

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['monthlyStats'] && this.monthlyStats?.length) {
      this.updateChart();
    }
  }

  private updateChart(): void {
    const incomeData = new Array(12).fill(0);
    const expenseData = new Array(12).fill(0);

    this.monthlyStats.forEach(stat => {
      if (stat.month >= 1 && stat.month <= 12) {
        incomeData[stat.month - 1] = stat.income;
        expenseData[stat.month - 1] = stat.expense;
      }
    });

    this.chartData = {
      labels: this.monthLabels,
      datasets: [
        {
          label: 'Przychody',
          data: incomeData,
          backgroundColor: 'rgba(34, 197, 94, 0.75)',
          hoverBackgroundColor: 'rgba(34, 197, 94, 0.95)',
          borderRadius: 8,
          borderSkipped: false,
          barPercentage: 0.6,
          categoryPercentage: 0.7,
        },
        {
          label: 'Wydatki',
          data: expenseData,
          backgroundColor: 'rgba(239, 68, 68, 0.65)',
          hoverBackgroundColor: 'rgba(239, 68, 68, 0.9)',
          borderRadius: 8,
          borderSkipped: false,
          barPercentage: 0.6,
          categoryPercentage: 0.7,
        }
      ]
    };

    // Wymuszamy update renderingu
    setTimeout(() => this.chart?.update(), 0);
  }

  // Oblicza podsumowanie
  get totalIncome(): number {
    return this.monthlyStats.reduce((sum, s) => sum + s.income, 0);
  }

  get totalExpense(): number {
    return this.monthlyStats.reduce((sum, s) => sum + s.expense, 0);
  }

  get netBalance(): number {
    return this.totalIncome - this.totalExpense;
  }
}
