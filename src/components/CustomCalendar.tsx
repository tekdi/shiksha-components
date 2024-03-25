import '@mobiscroll/react/dist/css/mobiscroll.min.css';
import {
  Datepicker,
  MbscCalendarColor,
  MbscCalendarLabel,
  MbscCalendarMarked,
  Page,
  setOptions,
} from '@mobiscroll/react';
import { FC, useMemo } from 'react';

setOptions({
  theme: 'ios',
  themeVariant: 'light'
});

const CustomCalendar: FC = () => {
  const myMarked = useMemo<MbscCalendarMarked[]>(
    () => [
      { recurring: { repeat: 'yearly', month: 5, day: 1 }, color: '#ffc400' },
      { recurring: { repeat: 'yearly', month: 12, day: 24 }, color: '#ffee00' },
      { recurring: { repeat: 'yearly', month: 12, day: 25 }, color: 'red' },
      { date: '2024-04-04T00:00' },
      { date: '2024-01-13T00:00' },
      { date: '2024-03-02T00:00', color: '#46c4f3' },
      { date: '2024-03-06T00:00', color: '#7e56bd' },
      { date: '2024-03-11T00:00', color: '#7e56bd' },
      { date: '2024-03-19T00:00', color: '#89d7c9' },
      { date: '2024-03-28T00:00', color: '#ea4986' },
      { date: '2024-03-13T00:00', color: '#7e56bd' },
      { date: '2024-03-13T00:00', color: '#f13f77' },
      { date: '2024-03-13T00:00', color: '#89d7c9' },
      { date: '2024-03-13T00:00', color: '#8dec7d' },
      { date: '2024-03-21T00:00', color: '#ffc400' },
      { date: '2024-03-21T00:00', color: '#8dec7d' },
      { start: '2024-04-15T00:00', end: '2024-04-18T00:00', color: '#f4511e' },
    ],
    [],
  );

  const myColors = useMemo<MbscCalendarColor[]>(
    () => [
      { recurring: { repeat: 'yearly', month: 12, day: 8 }, background: '#9ccc65' },
      { recurring: { repeat: 'yearly', month: 5, day: 1 }, background: 'red' },
      { recurring: { repeat: 'yearly', month: 12, day: 24 }, background: '#fff568' },
      { recurring: { repeat: 'yearly', month: 12, day: 25 }, background: '#e88080' },
      { date: '2024-04-04T00:00', background: '#cfd8dc' },
      { date: '2024-05-24T00:00', background: '#9575cd' },
      { date: '2024-01-13T00:00', background: '#d4e157' },
      { date: '2024-02-06T00:00', background: '#f4511e' },
      { date: '2024-04-06T00:00', background: '#46c4f3' },
      { date: '2024-04-22T00:00', background: '#7e56bd' },
      { date: '2024-02-11T00:00', background: '#46c4f3' },
      { date: '2024-02-29T00:00', background: '#7e56bd' },
      { date: '2024-03-02T00:00', background: '#46c4f3' },
      { date: '2024-03-03T00:00', background: '#7e56bd' },
      { date: '2024-03-11T00:00', background: '#f13f77' },
      { date: '2024-03-19T00:00', background: '#8dec7d' },
      { date: '2024-03-21T00:00', background: '#7e56bd' },
      { date: '2024-03-28T00:00', background: '#ea4986' },
      { start: '2024-04-15T00:00', end: '2024-04-18T00:00', text: 'Conference', background: '#f4511e' },
    ],
    [],
  );

  const myLabels = useMemo<MbscCalendarLabel[]>(
    () => [
      { recurring: { repeat: 'yearly', month: 12, day: 25 }, title: 'Christmas', color: '#f48fb1' },
      { recurring: { repeat: 'yearly', month: 1, day: 1 }, title: 'New year' },
      { recurring: { repeat: 'yearly', month: 12, day: 1 }, title: 'Meeting', color: '#ffc400' },
      { date: '2024-04-04T00:00', text: 'Spa day', color: '#cfd8dc' },
      { date: '2024-05-24T00:00', text: 'BD Party', color: '#9ccc65' },
      { date: '2024-01-13T00:00', text: 'Exams', color: '#d4e157' },
      { date: '2024-02-06T00:00', text: 'Trip', color: '#f4511e' },
      { date: '2024-04-06T00:00', color: '#46c4f3', text: 'Pizza Night' },
      { date: '2024-04-22T00:00', color: '#7e56bd', text: 'Beerpong' },
      { date: '2024-02-11T00:00', color: '#46c4f3', text: 'Anniversary' },
      { date: '2024-02-29T00:00', color: '#7e56bd', text: 'Pete BD' },
      { date: '2024-03-02T00:00', color: '#46c4f3', text: 'Ana BD' },
      { date: '2024-03-03T00:00', color: '#7e56bd', text: 'Concert' },
      { date: '2024-03-11T00:00', color: '#f13f77', text: 'Trip' },
      { date: '2024-03-19T00:00', color: '#8dec7d', text: 'Math exam' },
      { date: '2024-03-28T00:00', color: '#ea4986', text: 'Party' },
      { start: '2024-04-15T00:00', end: '2024-04-18T00:00', text: 'Conference', color: '#f4511e' },
    ],
    [],
  );

  return (
    // <Page>
      <div className="mbsc-grid">
        <div className="mbsc-row">
          <div className="mbsc-col-sm-12 mbsc-col-md-12">
            <div className="mbsc-form-group">
              <div className="mbsc-form-group-title">Marked days</div>
              <Datepicker display="inline" marked={myMarked} />
            </div>
          </div>
          <div className="mbsc-col-sm-12 mbsc-col-md-12">
            <div className="mbsc-form-group">
              <div className="mbsc-form-group-title">Colored days</div>
              <Datepicker display="inline" colors={myColors} />
            </div>
          </div>
          <div className="mbsc-col-sm-12 mbsc-col-md-12">
            <div className="mbsc-form-group">
              <div className="mbsc-form-group-title">Labels</div>
              <Datepicker display="inline" labels={myLabels} />
            </div>
          </div>
        </div>
      </div>
    //</Page>
  );
};
export default CustomCalendar;