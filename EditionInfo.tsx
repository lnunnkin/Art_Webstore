import React from 'react';
import { EditionInfo as EditionInfoType } from '../types';

interface EditionInfoProps {
  info: EditionInfoType;
}

export const EditionInfo: React.FC<EditionInfoProps> = ({ info }) => {
  return (
    <span className="text-[#8B7355] text-sm">
      Edition {info.current} of {info.total}
    </span>
  );
};