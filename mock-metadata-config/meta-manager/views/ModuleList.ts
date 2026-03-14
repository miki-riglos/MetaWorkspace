import { ViewInit } from '@/metadata/View';

export const ModuleList: ViewInit = {
  name: 'ModuleList',
  label: 'Modules',
  viewType: 'LIST',
  modelName: 'Module',
  isMenuOption: true,
  parts: [
    {
      id: 'm1',
      component: 'DataGrid',
      props: {
        columns: [
          { field: 'label', header: 'Module Label' },
          { field: 'name', header: 'System Name' },
        ],
      },
    },
  ],
};
