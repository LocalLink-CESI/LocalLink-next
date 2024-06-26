import { IconButton } from '@chakra-ui/react';
import type { FC } from 'react';
import { MdArrowBackIosNew } from 'react-icons/md';
import { DefaultTheme } from '../../../assets/styles/theme';

type Props = {
  activeDate: Date;
  onClick: (day: number, month: number) => void;
};

const ButtonPrevious: FC<Props> = ({ activeDate, onClick }) => {
  return (
    <IconButton
      aria-label="Previous Day"
      bg={DefaultTheme.colors.primaryButton}
      color={DefaultTheme.colors.white}
      isRound
      size="xs"
      fontSize="15px"
      icon={<MdArrowBackIosNew />}
      onClick={() => onClick(activeDate.getDate(), activeDate.getMonth() - 1)}
    ></IconButton>
  );
};

export default ButtonPrevious;
