export const data = [
  {
    name: 'ananyaj',
    value1: '34',
    label1: 'Attendance',
    value2: '7',
    label2: 'Class Missed'
  },
  {
    name: 'Upendra',
    value1: '74',
    label1: 'Attendance',
    value2: '7',
    label2: 'Class Missed'
  },
  {
    name: 'Upendra1',
    value1: '79',
    label1: 'Attendance',
    value2: '0',
    label2: 'Class Missed'
  },
  {
    name: 'Upendra2',
    value1: '74',
    label1: 'Attendance',
    value2: '7',
    label2: 'Class Missed'
  },
  {
    name: 'Upendra3',
    value1: '74',
    label1: 'Attendance',
    value2: '7',
    label2: 'Class Missed'
  },
  {
    name: 'Upendra4',
    value1: '74',
    label1: 'Attendance',
    value2: '7',
    label2: 'Class Missed'
  },
  {
    name: 'Upendra4',
    value1: '74',
    label1: 'Attendance',
    value2: '7',
    label2: 'Class Missed'
  },
  {
    name: 'Upendra5',
    value1: '74',
    label1: 'Attendance',
    value2: '7',
    label2: 'Class Missed'
  }
];

export const getClassDetails = (): Promise<any[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data);
    }, 1000);
  });
};
