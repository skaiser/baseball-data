import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// import { PitchEvent, RawPitchData } from '../shared/types';

@Injectable()
export class PitchAdapterService {
  constructor(private http: HttpClient) {}
}
