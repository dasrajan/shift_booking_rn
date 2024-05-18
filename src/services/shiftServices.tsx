import { ShiftObject } from 'types/commonTypes';
import apiClient from './apiClient';

export const getAllShifts = async (): Promise<ShiftObject[]> => {
  const response = await apiClient.get<ShiftObject[]>('/shifts');
  return response.data;
};

export const getShiftById = async (shiftId: string): Promise<ShiftObject> => {
  const response = await apiClient.get<ShiftObject>(`/shifts/${shiftId}`, {});
  return response.data;
};

export const bookShiftAPI= async (shiftId: string): Promise<ShiftObject> => {
  console.log("🚀 ~ bookShiftAPI ~ shiftId:", shiftId)
  const response = await apiClient.post<ShiftObject>(`/shifts/${shiftId}/book`);
  console.log("🚀 ~ bookShiftAPI ~ response:", response)
  return response.data;
};
