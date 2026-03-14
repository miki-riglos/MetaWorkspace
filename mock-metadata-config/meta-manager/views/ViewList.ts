import { ViewInit } from '@/metadata/View';

export const ViewList: ViewInit = {
  name: 'ViewList',
  label: 'Views',
  viewType: 'LIST',
  modelName: 'View',
  isMenuOption: true,
  parts: [
    {
      id: 'v1',
      component: 'DataGrid',
      props: {
        columns: [
          { field: 'label', header: 'View Label' },
          { field: 'type', header: 'Type' },
        ],
      },
    },
  ],
};
