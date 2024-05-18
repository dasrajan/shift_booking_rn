import apiClient from './apiClient';

interface ShiftObject {
  id: string;
  booked: boolean;
  area: string;
  startTime: string;
  endTime: string;
}

export const getAllShifts = async (): Promise<ShiftObject[]> => {
  const response = await apiClient.get<ShiftObject[]>('/shifts', {});
  return response.data;
};

export const getShiftById = async (shiftId: string): Promise<ShiftObject> => {
  const response = await apiClient.get<ShiftObject>(`/shifts/${shiftId}`, {});
  return response.data;
};
