import {
  Component,
  Input,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { Chart } from 'angular2-chartjs';

import { PitchEvent } from 'src/app/shared/types';
import { CHART_COLORS } from 'src/app/shared/constants';

/**
 * https://www.npmjs.com/package/angular2-chartjs
 */
@Component({
  selector: 'chart-pitch-types',
  templateUrl: './chart_pitch_types.html',
})
export class ChartPitchTypes implements OnDestroy {
  @Input() title = 'Pitch distribution';
  @Input()
  set pitchEvents(events: PitchEvent[]) {
    if (!Array.isArray(events)) {
      return;
    }
    this.updateChart(events);
  }
  @ViewChild('chart', { static: true })
  chartComponent?: Chart;
  chartType = 'pie';
  chartData = [];
  chartOptions = {
    responsive: false,
  };
  numPitches = 0;

  private pitchTypeCount = new Map<string, number>();

  ngOnDestroy(): void {
    if (this.chartComponent?.chart) {
      this.chartComponent.chart.destroy();
    }
  }

  private updateChart(events: PitchEvent[]): void {
    this.pitchTypeCount = new Map<string, number>();
    for (let i = 0; i < events.length; i++) {
      const p = events[i];

      const pitchTypeCounter =
        this.pitchTypeCount.get(p.pitch_type) || 0;
      this.pitchTypeCount.set(
        p.pitch_type,
        pitchTypeCounter + 1
      );
    }
    const data = Array.from(this.pitchTypeCount.values());
    this.numPitches = data
      .map(((sum) => (value) => (sum += value))(0))
      .pop();
    const labels = Array.from(this.pitchTypeCount.keys()).map(
      (k, i) => {
        const percentage =
          Math.floor((data[i] / this.numPitches) * 100) || 0;
        return `${k} (${percentage}%)`;
      }
    );

    this.chartData = {
      labels: labels,
      datasets: [
        {
          label: 'Pitch Distribution 1',
          data: data,
          backgroundColor: Object.values(CHART_COLORS),
        },
      ],
    };
  }
}
