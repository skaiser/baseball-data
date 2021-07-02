import { Component, ElementRef, Input, ViewChild } from '@angular/core';

import { EventType, PitchEvent, ThrowSide } from 'src/app/shared/types';
import { CHART_COLORS, strikeTypes } from 'src/app/shared/constants';

const HOME_PLATE_INCHES = 17;
const DEFAULT_PITCH_RADIUS = 4;
const HIGHLIGHTED_PITCH_RADIUS = 6;
// Batter's boxes and home plate are 125 inches wide.
// https://miro.medium.com/max/3400/0*U5Lb957NqbWW_bPZ.jpg
const BATTING_AREA_INCHES = 125;

function feetToInches(feet): number {
  return feet * 12;
}

/**
 * Component that draws pitch locations.
 */
@Component({
  selector: 'chart-pitch-zone',
  templateUrl: './chart_pitch_zone.component.html',
  styleUrls: ['./chart_pitch_zone.component.css'],
})
export class ChartPitchZoneComponent {
  @ViewChild('pitchzone', { static: true })
  pitchZone?: ElementRef;
  @Input()
  set pitchEvents(events: PitchEvent[]) {
    if (!Array.isArray(events)) {
      return;
    }
    this.pitchEventsInternal = events;
    this.activePitchEvents = events;
    this.draw();
  }
  get pitchEvents(): PitchEvent[] {
    return this.pitchEventsInternal;
  }

  private activePitchEvents: PitchEvent[] = [];
  private pitchEventsInternal: PitchEvent[] = [];
  // TODO(kaisers): Replace this with activePitchEvents.
  private highlightedPitch: number | null = null;

  deselectItem(index: number): void {
    this.highlightedPitch = null;
    this.draw();
  }

  selectItem(index: number): void {
    this.highlightedPitch = index;
    this.draw();
  }

  getPlayString(play: PitchEvent): string {
    let inning = 'Top';
    if (play.inning_half === 1) {
      inning = 'Bot';
    }
    return `${inning} ${play.inning} (${play.balls} - ${play.strikes}) `;
  }

  getPitchTypeString(play: PitchEvent): string {
    const speed = Number(play.initial_speed).toFixed(0);
    return `${play.pitch_type} ${speed} mph`;
  }

  private normalizePosition(xyz): number {
    return feetToInches(xyz) * this.getCanvasSizeRatio();
  }

  private getCanvasSizeRatio(): number {
    let canvas = this.pitchZone?.nativeElement;
    if (!canvas) {
      return 0;
    }
    return canvas.width / BATTING_AREA_INCHES;
  }

  private draw(): void {
    requestAnimationFrame(() => {
      const canvas: HTMLCanvasElement | undefined | null = this.pitchZone
        ?.nativeElement;
      if (!canvas) {
        return;
      }
      const ctx = canvas.getContext('2d');
      const canvasCenterX = canvas.width / 2;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#e1e2db';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      let kZoneTop = 0;
      let kZoneBottom = canvas.height;
      const ratio = this.getCanvasSizeRatio();

      // Draw some simulated path for ball as a bottom "layer".
      for (let i = 0; i < this.activePitchEvents.length; i++) {
        let p = this.activePitchEvents[i];

        ctx.beginPath();
        ctx.moveTo(
          this.normalizePosition(p.init_pos_x) + canvasCenterX,
          canvas.height - this.normalizePosition(p.init_pos_z)
        );
        //ctx.quadraticCurveTo(normalizePosition(p.init_pos_x) + canvasCenterX - 50, canvasEl.height - normalizePosition(p.init_pos_z) - 50, normalizePosition(p.plate_x) + canvasCenterX, canvasEl.height - normalizePosition(p.plate_z));
        let curveOffset = 8 * ratio;
        if (p.pitcher_throws === ThrowSide.R) {
          curveOffset = -curveOffset;
        }
        //ctx.quadraticCurveTo(normalizePosition(p.plate_x) + (4 * ratio), normalizePosition(p.plate_z) - (4 * ratio), normalizePosition(p.plate_x) + canvasCenterX, canvasEl.height - normalizePosition(p.plate_z));
        // TODO(kaisers): Take into account release point being in distance
        ctx.quadraticCurveTo(
          this.normalizePosition(p.init_pos_x) + canvasCenterX + curveOffset,
          canvas.height - this.normalizePosition(p.init_pos_z) - curveOffset,
          this.normalizePosition(p.plate_x) + canvasCenterX,
          canvas.height - this.normalizePosition(p.plate_z)
        );
        //ctx.bezierCurveTo(normalizePosition(p.init_pos_x) + (4 * ratio), normalizePosition(p.init_pos_z), normalizePosition(p.plate_x), normalizePosition(p.plate_z) - (5 * ratio), normalizePosition(p.plate_x) + canvasCenterX, canvasEl.height - normalizePosition(p.plate_z));
        // TODO(kaisers): This needs to stack the highlight on top or draw a single pitch.
        if (i === this.highlightedPitch) {
          ctx.strokeStyle = CHART_COLORS.orange;
          ctx.lineWidth = 4;
        } else {
          ctx.strokeStyle = '#514e49';
          ctx.lineWidth = 1;
        }
        ctx.stroke();
      }

      for (let i = 0; i < this.activePitchEvents.length; i++) {
        let p = this.activePitchEvents[i];
        const radius =
          i === this.highlightedPitch
            ? HIGHLIGHTED_PITCH_RADIUS
            : DEFAULT_PITCH_RADIUS;

        // Pitcher release point
        ctx.beginPath();
        ctx.arc(
          this.normalizePosition(p.init_pos_x) + canvasCenterX,
          canvas.height - this.normalizePosition(p.init_pos_z),
          radius,
          0,
          2 * Math.PI
        );
        // TODO(kaisers): Handle colors better and add a legend
        switch (p.pitch_type) {
          case 'CU':
            ctx.fillStyle = CHART_COLORS.blue;
            break;
          case 'SL':
            ctx.fillStyle = CHART_COLORS.red;
            break;
          case 'CH':
            ctx.fillStyle = CHART_COLORS.yellow;
            break;
          default:
            ctx.fillStyle = CHART_COLORS.purple;
            break;
        }
        if (i === this.highlightedPitch) {
          ctx.fillStyle = CHART_COLORS.orange;
        }
        ctx.fill();

        // ball position end position over plate
        ctx.beginPath();
        // TODO(kaisers): Need to subtract pos_y for balls that bounced in the dirt?
        ctx.arc(
          this.normalizePosition(p.plate_x) + canvasCenterX,
          canvas.height - this.normalizePosition(p.plate_z),
          radius,
          0,
          2 * Math.PI
        );
        // TODO(kaisers): Handle colors better
        if (p.event_type === EventType.BALL) {
          ctx.fillStyle = CHART_COLORS.yellow;
        } else if (strikeTypes.includes(p.event_type)) {
          ctx.fillStyle = CHART_COLORS.red;
        } else {
          ctx.fillStyle = CHART_COLORS.blue;
        }
        if (i === this.highlightedPitch) {
          ctx.fillStyle = CHART_COLORS.orange;
        }
        ctx.fill();
        // $pitchEvents.append(`<li class="events-list-item">${getPlayString(p)}</li>`);

        // Draw strike zone last.
        // Use first batter's strike zone for simplicity.
        p = this.activePitchEvents[0];
        kZoneTop = feetToInches(p.sz_top);
        kZoneBottom = feetToInches(p.sz_bottom);
        const homePlateSize = HOME_PLATE_INCHES * ratio;
        ctx.lineWidth = 2;
        ctx.strokeStyle = '#eeeeee';
        ctx.strokeRect(
          canvasCenterX - homePlateSize / 2,
          canvas.height - kZoneTop * ratio,
          homePlateSize,
          (kZoneTop - kZoneBottom) * ratio
        );
      }
    });
  }
}
