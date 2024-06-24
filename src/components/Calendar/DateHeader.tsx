import type { FC } from 'react';
import { Box, Text } from '@chakra-ui/react';
import { DefaultTheme } from '../../assets/styles/theme';
import { months } from './CalendarHeader';
type Props = {
  activeDate: Date;
};

const DateHeader: FC<Props> = ({ activeDate }) => {
  return (
    <Box marginLeft="22px" marginBottom="10px">
      <Text
        fontSize={DefaultTheme.fontSize.l}
        fontFamily={DefaultTheme.fontFamily.light}
      >{`${months[activeDate.getMonth()]} ${activeDate.getDate()}`}</Text>
    </Box>
  );
};

export default DateHeader;
