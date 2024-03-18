import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

interface CalenderProps{};

const CalenderCard: React.FC<CalenderProps> = ({  }) =>  {
  const [value, onChange] = useState<Value>(new Date());
  // console.log({value})
  return (
    <div>
      <Calendar onChange={onChange} value={value} />
    </div>
  );
}

export default CalenderCard;