import { ViewRecord } from '@/metadata/View';

export const ModuleList: ViewRecord = {
  name: 'ModuleList',
  label: 'Modules',
  viewType: 'LIST',
  modelName: 'Module',
  isMenuOption: true,
  parts: [
    {
      id: 'm1',
      componentName: 'DataGrid',
      props: {
        columns: [
          { field: 'label', header: 'Module Label' },
          { field: 'name', header: 'System Name' },
        ],
      },
    },
  ],
};
