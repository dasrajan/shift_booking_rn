export interface ShiftObject {
  id: string;
  booked: boolean;
  area: string;
  startTime: any;
  endTime: any;
}

export interface ShiftCardType {
  time: any;
  area?: string;
  booked: boolean;
  isOverlapping?: boolean;
  isDisable?: boolean;
  onhandleBook?: () => void;
  onhandleCancel?: () => void;
}

export interface CityObject {
  city: string;
  count: number;
}
