export type Session = {
  id: number,
  startTime: string, // format: 00:00
  endTime: string, // format: 00:00
  laps: number; // int
  bestLap: number; // float
  avgSpeedInKmh: number; // float
  time: number; // float
};

export type SessionWithToggle = Session & {
  isSelected: boolean;
};

export type Activity = {
  id: number;
  date: string;
  fetchedAt: Date;
  transponderId: string;
  sessions: Session[];
}
