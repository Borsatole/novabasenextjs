import { Tooltip as FlowbiteTooltip } from 'flowbite-react';
import { ReactNode } from 'react';


type Props = {
  tooltip: string;
  position?: 'top' | 'bottom' | 'left' | 'right';
  children: ReactNode;
};

export default function Tooltip({ tooltip, position = 'top', children }: Props) {
  

  return (
    <FlowbiteTooltip content={tooltip} placement={position} >
      {children}
    </FlowbiteTooltip>
  );
}
