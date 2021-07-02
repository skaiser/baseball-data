import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomMaterialModule } from 'src/app/material.module';

import { ChartPitchZoneComponent } from './chart_pitch_zone.component';

@NgModule({
  declarations: [ChartPitchZoneComponent],
  imports: [CommonModule, CustomMaterialModule],
  exports: [ChartPitchZoneComponent],
})
export class ChartPitchZoneModule {}
