import { ThemeProvider } from '@mui/material/styles';
import { useTheme } from '@mui/material/styles';
import customTheme from '../customStyles';
import { Button, Typography } from '@mui/material';

export default function Example() {
    const theme = useTheme<any>();
    
    return (
        <ThemeProvider theme={customTheme}>
            <Typography variant="h1">Heading 1</Typography>
            <Typography variant="h2">Heading 2</Typography>
            <Typography variant="h3">Heading 3</Typography>
            <Typography variant="h4">Heading 4</Typography>
            <Typography variant="h5">Heading 5</Typography>
            <Typography variant="h6">Heading 6</Typography>
            <Typography variant="body1">Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni assumenda vel alias autem nostrum! Doloremque maxime minima laudantium, placeat hic sapiente. Minus, et quidem. Quos porro praesentium ullam commodi sit.</Typography>
            <Typography variant="body2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni assumenda vel alias autem nostrum! Doloremque maxime minima laudantium, placeat hic sapiente. Minus, et quidem. Quos porro praesentium ullam commodi sit.</Typography>
            <Button variant="contained" color="primary">Primary</Button>
            <Button variant="contained" sx={{backgroundColor: theme.palette.warning["500"], color: theme.palette.primary.main}}>Sample 500</Button>
            <Button variant="outlined" sx={{backgroundColor: theme.palette.warning["100"]}}>Sample 100</Button>
            <Button variant="text" sx={{color: theme.palette.warning["200"]}}>Sample 900</Button>
        </ThemeProvider>
    )
}