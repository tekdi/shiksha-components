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

// debounce function
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number,
  immediate?: boolean
) => {
  let timeout: ReturnType<typeof setTimeout> | undefined;
  return function (this: ThisParameterType<T>, ...args: Parameters<T>) {
    const context = this;
    clearTimeout(timeout!);
    if (immediate && !timeout) func.apply(context, args);
    timeout = setTimeout(() => {
      timeout = undefined;
      if (!immediate) func.apply(context, args);
    }, wait);
  };
};
export const getTodayDate = () => {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Adding 1 as month is zero-indexed
  const day = String(currentDate.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};
