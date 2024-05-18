import axios from 'axios';
import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
} from 'react';
import apiClient from 'services/apiClient';
import {bookShiftAPI, getAllShifts} from 'services/shiftServices';
import {ShiftObject} from 'types/commonTypes';
import {getFormattedData} from 'utils/helper';

// Context data type definition
interface ShiftContextType {
  shifts: ShiftObject[];
  myBookedShifts: any;
  availableData: {
    areas: any[];
    availableShiftsList: any[];
  };
  overlappingList: any[];
  fetchShifts: () => void;
  bookShift: (shiftId: number) => void;
  cancelShift: (shiftId: string) => void;

  //Helper methods
  getAvailableShiftsForCity: (cityName: string) => void;
}

//Shift Context creation
const ShiftContext = createContext<ShiftContextType>({
  shifts: [],
  myBookedShifts: [],
  availableData: {
    areas: [],
    availableShiftsList: [],
  },
  overlappingList: [],
  fetchShifts: () => {},
  bookShift: () => {},
  cancelShift: () => {},
  getAvailableShiftsForCity: () => {},
});

const useShiftContext = () => useContext(ShiftContext);

//Shift Provider
const ShiftProvider = ({children}: {children: ReactNode}) => {
  const [shifts, setShifts] = useState<ShiftObject[]>([]);
  const [myBookedShifts, setmybookedShifts] = useState<any>([]);
  const [overlappingList, setoverlappingList] = useState<any>([]);
  const [availableData, setavailableData] = useState<any>({
    areas: [],
    availableShiftsList: [],
  });

  // Function to fetch shifts from API
  const fetchShifts = async () => {
    const data = await getAllShifts();
    if (data?.length > 0) {
      const {
        bookedShifts,
        areas,
        possibleDates,
        availableShiftsList,
        bookedList,
        overlappingList,
      } = getFormattedData(data);
      console.log('FINAL', {
        bookedShifts,
        areas,
        possibleDates,
        availableShiftsList,
        bookedList,
        overlappingList,
      });
      setShifts(data);
      setmybookedShifts(bookedShifts);
      setoverlappingList(overlappingList);
      setavailableData({
        areas,
        availableShiftsList,
      });
    }
  };

  const getAvailableShiftsForCity = (cityName: string) => {
    const list = availableData?.availableShiftsList[cityName];
    console.log('🚀 ~ getAvailableShiftsForCity ~ list:', list);
    const res = Object.keys(list).map(timestamp => ({
      title: timestamp,
      data: list[timestamp],
    }));
    return res;
  };

  // Function to update shift
  const bookShift = async (shiftIndex: number) => {
    const shiftItemId = shifts[shiftIndex]?.id;
    console.log('BOOK SHIFT', shiftIndex, shiftItemId);
    if (shiftItemId) {
      const response = await bookShiftAPI(shiftItemId);
      if (response) {
        fetchShifts();
      }
    }
  };

  const cancelShift = async (shiftId: string) => {
    console.log('CANCEL SHIFT', shiftId);
  };

  useEffect(() => {
    fetchShifts(); // Fetch shifts when component mounts
  }, []);

  return (
    <ShiftContext.Provider
      value={{
        shifts,
        myBookedShifts,
        availableData,
        overlappingList,
        fetchShifts,
        bookShift,
        cancelShift,
        getAvailableShiftsForCity,
      }}>
      {children}
    </ShiftContext.Provider>
  );
};

export {ShiftContext, ShiftProvider, useShiftContext};
