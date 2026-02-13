export interface Timer {
  id: number;
  title?: string;
  duration: string;
  startTime: Date;
  endTime: Date;
  lead?: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
}

export interface PostTimer {
  title?: string | null;
  duration: string;
  startTime: string;
  endTime: string;
  lead?: string | null;
}
