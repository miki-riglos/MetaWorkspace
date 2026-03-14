import { ViewInit } from '@/metadata/View';

export const ModelList: ViewInit = {
  name: 'ModelList',
  label: 'Models',
  viewType: 'LIST',
  modelName: 'Model',
  isMenuOption: true,
  parts: [
    {
      id: 'mo1',
      component: 'DataGrid',
      props: {
        columns: [
          { field: 'label', header: 'Model Label' },
          { field: 'name', header: 'System Name' },
        ],
      },
    },
  ],
};
