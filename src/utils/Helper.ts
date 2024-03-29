export const decodeToken = (token: string) => {
  try {
    console.log(token);
    const tokenParts = token.split('.');
    if (tokenParts.length === 3) {
      const payload = JSON.parse(atob(tokenParts[1]));
      return payload;
    }
    return null;
  } catch (error) {
    console.error(error);
  }
};

export const ATTENDANCE_ENUM = {
  PRESENT: 'present',
  ABSENT: 'absent',
  HALF_DAY: 'half-day',
  NOT_MARKED: 'notmarked',
  ON_LEAVE: 'on-leave'
};

export const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
];

export const formatDate = (dateString: string) => {
  const [year, monthIndex, day] = dateString.split('-');
  const month = MONTHS[parseInt(monthIndex, 10) - 1];
  return `${day} ${month}, ${year}`;
};
