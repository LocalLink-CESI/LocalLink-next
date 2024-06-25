import type { FC } from 'react';
import { Box } from '@chakra-ui/react';
import { DefaultTheme } from '../../assets/styles/theme';
import CalendarHeader from './CalendarHeader';
import DateHeader from './DateHeader';
import CalendarDays from './CalendarDays';
import { shadow } from '../../../theme';

type Props = {
  activeDate: Date;
  onClick: (day: number, month: number) => void;
};

const Calendar: FC<Props> = ({ activeDate, onClick }) => {
  const today = new Date();
  return (
    <Box
      w="100%"
      p={5}
      px={0}
      bg={DefaultTheme.colors.white}
      borderRadius="25px"
      overflow={"hidden"}
      boxShadow={shadow}
      mb="10"
      display="flex"
      flexDirection="column"
      justifyContent="center"
    >
      <CalendarHeader activeDate={activeDate} onClick={onClick} />
      <CalendarDays activeDate={activeDate} today={today} onClick={onClick} />
    </Box>
  );
};

export default Calendar;
