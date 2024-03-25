import React from 'react';
import { Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import Checkbox from '@mui/material/Checkbox';

const PREFIX = 'StudentList';

const classes = {
  root: `${PREFIX}-root`,
  content: `${PREFIX}-content`
};

const Root = styled('div')(({}) => ({
  [`&.${classes.root}`]: {
    display: 'flex',
    height: 56,
    borderBottom: '1px solid #EDE1CF',
    padding: 8
  },
  [`& .${classes.content}`]: {
    display: 'flex',
    alignItems: 'center',
    flexGrow: 1,
    fontSize: 16,
    fontWeight: 400,
    color: '#1F1B13'
  }
}));

interface StudentListProps {
  isSelected: boolean;
  studentName: string;
}

const StudentList: React.FC<StudentListProps> = ({ isSelected, studentName }) => {
  const [checked, setChecked] = React.useState(isSelected);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };
  return (
    <Root className={classes.root}>
      <Typography className={classes.content}>{studentName}</Typography>
      <Checkbox
        checked={checked}
        onChange={handleChange}
        inputProps={{ 'aria-label': 'controlled' }}
      />
    </Root>
  );
};

export default StudentList;
