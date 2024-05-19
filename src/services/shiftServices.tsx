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
  const response = await apiClient.get<ShiftObject>(`/shifts/${shiftId}/book`);
  return response.data;
};

export const cancelShiftAPI= async (shiftId: string): Promise<ShiftObject> => {
  const response = await apiClient.get<ShiftObject>(`/shifts/${shiftId}/cancel`);
  return response.data;
};
