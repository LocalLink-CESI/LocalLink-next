import type { FC } from 'react';
import { Box } from '@chakra-ui/react';
import { DefaultTheme } from '../../assets/styles/theme';
import CalendarHeader from './CalendarHeader';
import DateHeader from './DateHeader';
import CalendarDays from './CalendarDays';

type Props = {
  activeDate: Date;
  onClick: (day: number, month: number) => void;
};

const Calendar: FC<Props> = ({ activeDate, onClick }) => {
  return (
    <Box>
      <Box
        w="504px"
        bg={DefaultTheme.colors.white}
        h="390px"
        borderRadius="13px"
        boxShadow={`0 0 99px 0px ${DefaultTheme.colors.boxShadow}`}
        mb="10"
        display="flex"
        flexDirection="column"
        justifyContent="center"
      >
        <CalendarHeader activeDate={activeDate} onClick={onClick} />
        <CalendarDays activeDate={activeDate} onClick={onClick} />
      </Box>
      <DateHeader activeDate={activeDate} />
    </Box>
  );
};

export default Calendar;
