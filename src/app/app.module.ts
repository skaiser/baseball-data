import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import {
  FormsModule as AngularFormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ChartPitchTypesModule } from './components/chart_pitch_types/chart_pitch_types.module';
import { ChartPitchZoneModule } from './components/chart_pitch_zone/chart_pitch_zone.module';
import { CustomMaterialModule } from './material.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FiltersComponent } from './components/filters/filters.component';
import { FilterOptionPipe } from './pipes/filter_option.pipe';
import { SearchComponent } from './components/search/search.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { DataService } from './services/data.service';

@NgModule({
  declarations: [
    AppComponent,
    FiltersComponent,
    FilterOptionPipe,
    HeaderComponent,
    SearchComponent,
    SpinnerComponent,
  ],
  imports: [
    AngularFormsModule,
    BrowserAnimationsModule,
    BrowserModule,
    ChartPitchZoneModule,
    ChartPitchTypesModule,
    CustomMaterialModule,
    FlexLayoutModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [DataService],
  bootstrap: [AppComponent],
})
export class AppModule {}
