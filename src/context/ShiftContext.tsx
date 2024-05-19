import axios from 'axios';
import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
} from 'react';
import apiClient from 'services/apiClient';
import {
  bookShiftAPI,
  cancelShiftAPI,
  getAllShifts,
} from 'services/shiftServices';
import {ShiftObject} from 'types/commonTypes';
import {getFormattedData, getFormattedShift} from 'utils/helper';

// Context data type definition
interface ShiftContextType {
  isLoading: boolean;
  shifts: ShiftObject[];
  myBookedShifts: any;
  availableData: {
    areas: any[];
    availableShiftsList: any[];
  };
  overlappingList: any[];
  fetchShifts: () => void;
  bookShift: (shiftId: number) => void;
  cancelShift: (shiftId: number) => void;

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
  isLoading: false,

  fetchShifts: () => {},
  bookShift: () => {},
  cancelShift: () => {},
  getAvailableShiftsForCity: () => {},
});

const useShiftContext = () => useContext(ShiftContext);

//Shift Provider
const ShiftProvider = ({children}: {children: ReactNode}) => {
  const [isLoading, setisLoading] = useState<boolean>(false);
  const [shifts, setShifts] = useState<ShiftObject[]>([]);
  const [myBookedShifts, setmybookedShifts] = useState<any>([]);
  const [overlappingList, setoverlappingList] = useState<any>([]);
  const [availableData, setavailableData] = useState<any>({
    areas: [],
    availableShiftsList: [],
  });

  // Function to fetch shifts from API
  const fetchShifts = async () => {
    setisLoading(true);
    const data = await getAllShifts();
    setisLoading(false);
    if (data?.length > 0) {
      const {
        bookedShifts,
        areas,
        possibleDates,
        availableShiftsList,
        bookedList,
        overlappingList,
      } = getFormattedData(data);
      setShifts(data);
      setmybookedShifts(bookedList);
      setoverlappingList(overlappingList);
      setavailableData({
        areas,
        availableShiftsList,
      });
    }
  };

  const getAvailableShiftsForCity = (cityName: string) => {
    const list = availableData?.availableShiftsList[cityName];
    return getFormattedShift(list);
  };

  // Function to update shift
  const bookShift = async (shiftIndex: number) => {
    const shiftItemId = shifts[shiftIndex]?.id;
    if (shiftItemId) {
      setisLoading(true);
      const response = await bookShiftAPI(shiftItemId);
      setisLoading(false);
      if (response) {
        fetchShifts();
      }
    }
  };

  const cancelShift = async (shiftIndex: number) => {
    const shiftItemId = shifts[shiftIndex]?.id;
    if (shiftItemId) {
      setisLoading(true);
      const response = await cancelShiftAPI(shiftItemId);
      setisLoading(false);
      if (response) {
        fetchShifts();
      }
    }
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
        isLoading,
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
