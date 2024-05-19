import {useShiftContext} from 'context/ShiftContext';
import {useState, useCallback} from 'react';
import {bookShiftAPI, cancelShiftAPI} from 'services/shiftServices';

interface UseTicketApiReturn<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  bookShift: (shiftIndex: number) => void;
  cancelShift: (shiftIndex: number) => void;
}

const useTicketApi = <T,>(): UseTicketApiReturn<T> => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const {shifts, overlappingList, fetchShifts} = useShiftContext();

  const apiCall = useCallback(async (type: string, shiftId: any) => {
    console.log('TYPE', type, shiftId);
    setLoading(true);
    setError(null);

    try {
      const shiftItemId = shifts[shiftId]?.id;
      if (shiftItemId) {
        let response: any;
        if (type === 'book') {
          response = await bookShiftAPI(shiftItemId);
        } else {
          response = await cancelShiftAPI(shiftItemId);
        }
        if (response) {
          setData(response);
          fetchShifts();
        } else {
          throw new Error('Network response was not ok');
        }
      }
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  }, []);

  const bookShift = useCallback(
    (shiftIndex: number) => {
      apiCall('book', shiftIndex);
    },
    [apiCall],
  );

  const cancelShift = useCallback(
    (shiftIndex: number) => {
      apiCall('cancel', shiftIndex);
    },
    [apiCall],
  );

  return {data, loading, error, bookShift, cancelShift};
};

export default useTicketApi;
