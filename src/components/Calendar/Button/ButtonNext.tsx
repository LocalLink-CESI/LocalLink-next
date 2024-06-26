import { IconButton } from '@chakra-ui/react';
import type { FC } from 'react';
import { MdArrowForwardIos } from 'react-icons/md';
import { DefaultTheme } from '../../../assets/styles/theme';

type Props = {
  activeDate: Date;
  onClick: (day: number, month: number) => void;
};

const ButtonNext: FC<Props> = ({ activeDate, onClick }) => {
  return (
    <IconButton
      aria-label="Next Day"
      bg={DefaultTheme.colors.primaryButton}
      color={DefaultTheme.colors.white}
      isRound
      size="xs"
      fontSize="15px"
      icon={<MdArrowForwardIos />}
      onClick={() => onClick(activeDate.getDate(), activeDate.getMonth() + 1)}
    ></IconButton>
  );
};

export default ButtonNext;
