const API_URL = process.env.REACT_APP_API_URL;

export const URL = {
  BASE_URL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
};

export const isOneDaySlot = false; // select date and time or only date

export const config = {
    title: 'Bicycle rent',
    subtitle: 'Sport bike VTT,Item code: 65L',
    placeHolderTextTel: 'Phone number*', 
    placeHolderTextName: 'Name*', 
    textButtonLeft: 'Pick-up date*', 
    textButtonRight: 'Drop-off date*',
    book: 'Book',
    bookNow: 'Book now',
    priceFrom:  'from',
    priceDay: 'day',
    textButtonHours: 'Time'
  };
//
export const nameMonth = {'Jan' : 0, 'Feb' : 1, 'Mar' : 2, 'Apr': 3, 'May' : 4, 'Jun' : 5, 'Jul' : 6,
        'Aug' : 7, 'Sep' : 8, 'Oct' : 9, 'Nov' : 10, 'Dec': 11};
//
export const nameDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
//
export const monthNamesFull = ['January', 'February', 'March', 'April', 'May', 'June', 'July',
  'August', 'September', 'October', 'November', 'December'];
//
export function filterAllDatesArray(array, isAvailable, is_open_for_booking) {
  return array
      .filter(item => {
          return item.is_available === isAvailable && item.is_open_for_booking === is_open_for_booking;
      })
};
//
export function filterIsOpenForBookingArray(array, is_open_for_booking) {
  return array
      .filter(item => {
          return item.is_open_for_booking === is_open_for_booking;
      })
};