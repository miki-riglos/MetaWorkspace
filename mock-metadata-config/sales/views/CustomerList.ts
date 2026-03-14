import { ViewRecord } from '@/metadata/View';

export const CustomerList: ViewRecord = {
  name: 'CustomerList',
  label: 'Customer List',
  viewType: 'LIST',
  modelName: 'Customer',
  isMenuOption: true,
  parts: [
    {
      id: 'p1',
      componentName: 'DataGrid',
      props: {
        columns: [
          { field: 'name', header: 'Name' },
          { field: 'email', header: 'Email' },
          { field: 'status', header: 'Status' },
        ],
      },
    },
  ],
};
