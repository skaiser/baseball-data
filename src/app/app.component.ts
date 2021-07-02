import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';

import { DataService } from './services/data.service';
import { PitchEvent } from './shared/types';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'Go Astros!';
  isLoaded = false;
  allPitchEvents: PitchEvent[] = [];
  appliedFilters: string[] = [];
  pitchEvents: PitchEvent[] = [];
  players = new Set<string>();
  selectedPlayer: string = '';
  // The id is the pitcher name.
  pitchMap = new Map<string, PitchEvent[]>();

  constructor(private readonly dataService: DataService) {}

  ngOnInit(): void {
    // TODO(kaisers): Need a service that emits new datasets when filters change.
    this.dataService
      .getPitchEvents()
      .pipe(take(1))
      .subscribe((pitchEvents: PitchEvent[]) => {
        this.allPitchEvents = pitchEvents;

        for (let i = 0; i < this.allPitchEvents.length; i++) {
          let p = this.allPitchEvents[i];
          this.players.add(p.pitcher_name);
        }

        this.players.forEach((v, k) => {
          const pitcherPitches = this.allPitchEvents.filter(
            (p) => p.pitcher_name === v
          );
          this.pitchMap.set(v, pitcherPitches);
        });
        console.log('allPitchEvents', this.allPitchEvents);
        this.isLoaded = true;
      });
  }

  updateFilters(filters: string[] | null): void {
    if (!filters) {
      filters = this.appliedFilters;
    }
    this.appliedFilters = filters;
    const pitchEvents = this.pitchMap.get(this.selectedPlayer) || [];
    if (filters[0] === 'all') {
      this.pitchEvents = pitchEvents;
      return;
    }
    this.pitchEvents = pitchEvents.filter((p: PitchEvent) => {
      let found = false;
      for (const filter of filters) {
        if (p.event_type === filter || p.event_result === filter) {
          found = true;
          break;
        }
      }
      return found;
    });
  }

  updateSelectedPlayer(player: string): void {
    console.log('selected player', player, this.pitchMap.get(player));
    this.selectedPlayer = player;
    this.pitchEvents = this.pitchMap.get(player) || [];
    this.updateFilters(null);
  }
}
