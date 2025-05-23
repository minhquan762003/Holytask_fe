export interface Priest {
  id: number;
  fullName: string;
}

export interface ScheduleItem {
  id: number;
  datetime: Date;
  address: string;
  notes: string;
  visitType: string;
  createdAt: Date;
  updatedAt: Date;
  createdUser: string;
  priest: Priest;
  class: string;
  label: string;
  status:number;
  headline:string;
}
