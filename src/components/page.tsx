import { Page as _Page } from '@geist-ui/core';
import React from 'react';

type Props = {
  children?: React.ReactNode;
};

export default function Page({ children }: Props) {
  return (
    <_Page
      dotBackdrop
      unit="8px"
      w="calc(100% - 50pt)"
      // style={{ width: 'calc(100% - 50pt)' }}
    >
      {children}
    </_Page>
  );
}
