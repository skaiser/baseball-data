/** Defines types and interfaces. */

export enum TeamName {}
export enum TeamCode {
  TB = 'TB',
}

export enum EventType {
  BALL = 'ball',
  CALLED_STRIKE = 'called_strike',
}

export enum EventResult {
  NONE = '',
  IN_PLAY = 'in_play',
}

export enum UmpireCall {
  X = 'X',
  B = 'B',
}

export enum BatSide {
  BOTH = 'BOTH',
  L = 'L',
  R = 'R',
}

export enum ThrowSide {
  BOTH = 'BOTH',
  L = 'L',
  R = 'R',
}

export enum PitchType {
  CH = 'CH',
  CU = 'CU',
  FC = 'FC',
  FF = 'FF',
  FT = 'FT',
  SL = 'SL',
}

export enum PitchName {
  CH = 'Changeup',
  CU = 'Curveball',
  FC = 'Cutter',
  FF = 'Four-seam FB',
  FT = 'Two-seam FB',
  SL = 'Slider',
}

export declare interface RawPitchData {
  queryResults: {
    row: Array<PitchEvent>;
  };
}

export declare interface PitchEvent {
  game_pk: number;
  game_id: string;
  away_team_name: string;
  away_team_code: string;
  home_team_name: string;
  home_team_code: string;
  play_id: string;
  sv_pitch_id: number;
  sequence_number: number;
  at_bat_number: number;
  pitch_number: number;
  event_pitch_number: number;
  inning: number;
  inning_half: number;
  batting_team_name: string;
  batting_team_code: string;
  fielding_team_name: string;
  fielding_team_code: string;
  event_number: number;
  event_type: EventType;
  pbp_number: number;
  event_result: EventResult;
  umpire_id: number;
  umpire_call: UmpireCall;
  batter_id: number;
  batter_name: string;
  bat_side: BatSide;
  p_bat_side: BatSide;
  pitcher_id: number;
  pitcher_name: string;
  pitcher_throws: ThrowSide;
  sz_top: number;
  sz_bottom: number;
  inning_at_bat_number: number;
  pitcher_at_bat_number: number;
  balls: number;
  strikes: number;
  outs: number;
  initial_speed: number;
  init_pos_x: number;
  init_pos_y: number;
  init_pos_z: number;
  init_vel_x: number;
  init_vel_y: number;
  init_vel_z: number;
  init_accel_x: number;
  init_accel_y: number;
  init_accel_z: number;
  plate_speed: number;
  plate_x: number;
  plate_y: number;
  plate_z: number;
  break_x: number;
  break_z: number;
  pitch_type: PitchType;
  pitch_name: PitchName;
  time_stamp: number;
  game_date: string | Date;
  game_nbr: number;
  year: number;
  // TODO(kaisers): what would these options be?
  game_type: string;
  event_id: number;
  time_code: string | Date;
}
