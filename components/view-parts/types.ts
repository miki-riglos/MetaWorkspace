import React from 'react';

export type ViewPartProps = {
  props: any;
  data?: any[];
  value?: any;
  onChange?: (v: any) => void;
  children?: React.ReactNode;
};

export type ViewPartComponent = React.FC<ViewPartProps>;
