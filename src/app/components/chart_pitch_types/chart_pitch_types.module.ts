import { NgModule } from '@angular/core';
import { ChartModule } from 'angular2-chartjs';

import { ChartPitchTypes } from './chart_pitch_types';

@NgModule({
  declarations: [ChartPitchTypes],
  imports: [ChartModule],
  exports: [ChartPitchTypes],
})
export class ChartPitchTypesModule {}
