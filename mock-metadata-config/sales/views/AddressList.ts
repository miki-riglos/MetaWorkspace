import { ViewInit } from '@/metadata/View';

export const AddressList: ViewInit = {
  name: 'AddressList',
  label: 'Address List',
  viewType: 'LIST',
  modelName: 'Address',
  isMenuOption: true,
  parts: [
    {
      id: 'a1',
      component: 'DataGrid',
      props: {
        columns: [
          { field: 'street', header: 'Street' },
          { field: 'city', header: 'City' },
          { field: 'zip', header: 'ZIP' },
        ],
      },
    },
  ],
};
