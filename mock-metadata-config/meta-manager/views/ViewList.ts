import { ViewRecord } from '@/metadata/View';

export const ViewList: ViewRecord = {
  name: 'ViewList',
  label: 'Views',
  viewType: 'LIST',
  modelName: 'View',
  isMenuOption: true,
  parts: [
    {
      id: 'v1',
      componentName: 'DataGrid',
      props: {
        columns: [
          { field: 'label', header: 'View Label' },
          { field: 'type', header: 'Type' },
        ],
      },
    },
  ],
};
