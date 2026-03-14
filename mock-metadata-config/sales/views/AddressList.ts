import { ViewRecord } from '@/metadata/View';

export const AddressList: ViewRecord = {
  name: 'AddressList',
  label: 'Address List',
  viewType: 'LIST',
  modelName: 'Address',
  isMenuOption: true,
  parts: [
    {
      id: 'a1',
      componentName: 'DataGrid',
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
