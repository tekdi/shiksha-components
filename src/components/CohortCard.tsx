import React from 'react';
import { CardContent, CardMedia, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ApartmentIcon from '@mui/icons-material/Apartment';
import SmartDisplayIcon from '@mui/icons-material/SmartDisplay';

const PREFIX = "CohortCard";

const classes = {
  root: `${PREFIX}-root`,
  media: `${PREFIX}-media`,
  content: `${PREFIX}-content`,
  arrow: `${PREFIX}-arrow`,
};

const Root = styled('div')(({ }) => ({
  [`&.${classes.root}`]: {
    display: 'flex',
    height: 56,
    // width: 296,
    border: '1px solid #EDE1CF',
    borderRadius: 8,
    cursor: 'pointer'
  },
  [`& .${classes.media}`]: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: 54,
    height: 56,
    borderRadius: '8px 0px 0px 8px',
  },
  [`& .${classes.content}`]: {
    display: 'flex',
    alignItems: 'center',
    fontSize: 16,
    fontWeight: 400,
    color: "#1F1B13",
    flexGrow: 1,
  },
  [`& .${classes.arrow}`]: {
    alignSelf: 'center',
    marginLeft: 'auto',
    height: 12,
    width: 8,
    marginRight: 10,
  },
}))


interface CohortCardProps {
  isNewCohort: boolean;
  isRemote: boolean;
  cohortName: string;
}

const CohortCard: React.FC<CohortCardProps> = ({ isNewCohort, isRemote, cohortName }) => {

  return (
    <Root className={classes.root}>
      <CardMedia
        className={classes.media}
        sx={{backgroundColor: isNewCohort ? "#FFFFFF" : "#FFDEA1"}}
        title="Class Image">
        {isRemote ? <SmartDisplayIcon /> : <ApartmentIcon />}
      </CardMedia>
      <CardContent className={classes.content}>
        <Typography>
        {isNewCohort ? isRemote ? "New Remote Class" : "New Physical Class" : `${cohortName}`}
        </Typography>
      </CardContent>
      <ArrowForwardIosIcon className={classes.arrow} sx={{display: isNewCohort ? 'none' : 'block'}} />
    </Root>
  );
};

export default CohortCard;
