import dayjs from 'dayjs';
import {ShiftObject} from 'types/commonTypes';

export const formatSimpleTime = (timestamp1: string, timestamp2: string) => {
  const t1 = dayjs(timestamp1);
  const t2 = dayjs(timestamp2);

  return `${t1.format('HH:mm')} - ${t2.format('HH:mm')}`;
};

export const formatTime = (timestamp: string) => {
  const t = dayjs(timestamp);

  if (isToday(t)) return 'Today';
  if (isTomorrow(t)) return 'Tomorrow';

  return `${t.format('MMMM DD')}`;
};

export const isToday = (timestamp: string) => {
  return (
    ['$y', '$D', '$M'].filter((key: any) => {
      return dayjs()[key] !== dayjs(timestamp)[key];
    }).length === 0
  );
};

export const isTomorrow = (timestamp: string) => {
  return (
    ['$y', '$D', '$M'].filter(key => {
      return dayjs().add(1, 'day')[key] !== dayjs(timestamp)[key];
    }).length === 0
  );
};

export const isOverlapping = (timeInterval1: any, timeInterval2: any) => {
  return (
    timeInterval1.startTime < timeInterval2.endTime &&
    timeInterval1.endTime > timeInterval2.startTime
  );
};

interface FormattedDataType {
  bookedShifts: any;
  areas: any;
  possibleDates: any;
  availableShiftsList: any;
  bookedList: any;
  overlappingList: any;
}

export const getFormattedData = (data: ShiftObject[]): FormattedDataType => {
  let bookedShifts: any = [],
    overlappingList: any = [],
    availableShiftsList: any = [],
    bookedList: any = {},
    areas: any = [],
    possibleDates: any = [];

  if (data?.length > 0) {
    bookedShifts = Object.keys(data).filter(
      (id: any) => data[id].booked === true,
    );

    //Need to find out areas and possible available shifts for vailable shift tab
    areas = [...new Set(Object.keys(data).map((id: any) => data[id].area))]; // unique set of areas

    //Finding possible unique dates for available slots
    possibleDates = [
      ...new Set(
        Object.keys(data).map((id: any) => formatTime(data[id].startTime)),
      ),
    ];

    //initializing available shifts array list for individual dates
    areas.map((area: any) => {
      availableShiftsList[area] = {};
      possibleDates.map((date: any) => {
        availableShiftsList[area][date] = [];
      });
    });

    //initializing booked shifts array list for Booked dates
    possibleDates.map((date: any) => {
      bookedList[date] = [];
    });

    Object.keys(data).map((id: any) => {
      const shift = data[id];

      if (Date.now() < shift.startTime)
        availableShiftsList[shift.area][formatTime(shift.startTime)] = [
          ...availableShiftsList[shift.area][formatTime(shift.startTime)],
          id,
        ];
      bookedShifts.map((bid: any) => {
        // Building booked shifts list
        if (bid === id)
          bookedList[formatTime(shift.startTime)] = [
            ...bookedList[formatTime(shift.startTime)],
            bid,
          ];
        // Building our list of overlapping shifts
        const timestamp1 = {
          startTime: shift.startTime,
          endTime: shift.endTime,
        };
        const timestamp2 = {
          startTime: data[bid].startTime,
          endTime: data[bid].endTime,
        };
        if (
          isOverlapping(timestamp1, timestamp2) &&
          !overlappingList.includes(id) &&
          !bookedShifts.includes(id)
        )
          overlappingList.push(id);
      });
    });

    //Adding shift availability counts to area
    areas = areas.map((area: any) => {
      const count = Object.keys(availableShiftsList[area])
        .map(timestamp => availableShiftsList[area][timestamp].length)
        .reduce((total, shifts) => {
          return total + shifts;
        });
      return {
        city: area,
        count,
      };
    });

    // console.log('🚀 ~ fetchShifts ~ bookedShifts:', {
    //   bookedShifts,
    //   areas,
    //   possibleDates,
    //   availableShiftsList,
    //   bookedList,
    //   overlappingList,
    // });
  }
  return {
    bookedShifts,
    areas,
    possibleDates,
    availableShiftsList,
    bookedList,
    overlappingList,
  };
};

export const getFormattedShift = (shifts: any) => {
  const res = Object.keys(shifts).map(timestamp => ({
    title: timestamp,
    data: shifts[timestamp],
  }));
  return res;
};

export const timeDiffBetween = (startTime: any, endTime: any) => {
  return dayjs(endTime).diff(dayjs(startTime), 'minute');
};

export const minutesToTime = (minutesNumber: number) => {
  const hours = Math.floor(minutesNumber / 60);
  const minutes = minutesNumber % 60;
  return `${hours > 0 ? `${hours} h` : ''}${
    hours > 0 && minutes > 0 ? ` and ` : ''
  }${minutes > 0 ? `${minutes} min` : ''}`;
};
