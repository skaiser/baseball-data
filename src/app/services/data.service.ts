import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import {
  PitchEvent,
  RawPitchData,
} from '../shared/types';

@Injectable()
export class DataService {
  constructor(private http: HttpClient) {}

  getPitchEvents(): Observable<PitchEvent[]> {
    return this.http
      .get(
        'https://raw.githubusercontent.com/rd-astros/hiring-resources/master/pitches.json',
      )
      .pipe(
        map(
          (data: RawPitchData) =>
            data.queryResults.row,
        ),
      );
  }
}
