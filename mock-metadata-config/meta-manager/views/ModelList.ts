import { ViewRecord } from '@/metadata/View';

export const ModelList: ViewRecord = {
  name: 'ModelList',
  label: 'Models',
  viewType: 'LIST',
  modelName: 'Model',
  isMenuOption: true,
  parts: [
    {
      id: 'mo1',
      componentName: 'DataGrid',
      props: {
        columns: [
          { field: 'label', header: 'Model Label' },
          { field: 'name', header: 'System Name' },
        ],
      },
    },
  ],
};
