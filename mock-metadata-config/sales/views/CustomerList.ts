import { ViewStored } from '@/infrastructure/stored/ViewStored';

export const CustomerList: ViewStored = {
  name: 'CustomerList',
  label: 'Customer List',
  viewType: 'LIST',
  modelName: 'Customer',
  isMenuOption: true,
  parts: [
    {
      componentName: 'DataGrid',
      children: [
        { componentName: 'DisplayField', propertyName: 'name', label: 'Name' },
        { componentName: 'DisplayField', propertyName: 'email', label: 'Email' },
        { componentName: 'DisplayField', propertyName: 'status', label: 'Status' },
      ],
    },
  ],
};
