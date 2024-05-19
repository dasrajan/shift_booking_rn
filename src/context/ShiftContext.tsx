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
  allBookedListItem: number[];
  fetchShifts: () => void;

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
  allBookedListItem:[],

  fetchShifts: () => {},
  getAvailableShiftsForCity: () => {},
});

const useShiftContext = () => useContext(ShiftContext);

//Shift Provider
const ShiftProvider = ({children}: {children: ReactNode}) => {
  const [isLoading, setisLoading] = useState<boolean>(false);
  const [shifts, setShifts] = useState<ShiftObject[]>([]);
  const [myBookedShifts, setmybookedShifts] = useState<any>([]);
  const [overlappingList, setoverlappingList] = useState<any>([]);
  const [allBookedListItem, setallBookedListItem] = useState<any>([]);
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
      setallBookedListItem(bookedShifts)
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
        allBookedListItem,
        fetchShifts,
        getAvailableShiftsForCity,
      }}>
      {children}
    </ShiftContext.Provider>
  );
};

export {ShiftContext, ShiftProvider, useShiftContext};
