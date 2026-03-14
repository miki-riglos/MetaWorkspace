import { ViewInit } from '@/metadata/View';

export const CustomerList: ViewInit = {
  name: 'CustomerList',
  label: 'Customer List',
  viewType: 'LIST',
  modelName: 'Customer',
  isMenuOption: true,
  parts: [
    {
      id: 'p1',
      component: 'DataGrid',
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
