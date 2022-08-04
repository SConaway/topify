import { Page as _Page } from '@geist-ui/core';
import React from 'react';

type Props = {
  children?: React.ReactNode;
};

export default function Page({ children }: Props) {
  return (
    <_Page
      dotBackdrop
      dotSpace={0.5}
      unit="8px"
      w="calc(100% - 50pt)"
      // style={{ width: 'calc(100% - 50pt)' }}
    >
      {children}
    </_Page>
  );
}
