import { ViewRecord } from '@/metadata/View';

export const CustomerDetail: ViewRecord = {
  name: 'CustomerDetail',
  label: 'Customer Detail',
  viewType: 'DETAIL',
  modelName: 'Customer',
  isMenuOption: false,
  parts: [
    {
      id: 'p2',
      componentName: 'FormLayout',
      children: [
        { id: 'p2-1', componentName: 'TextField', propertyName: 'name', options: { label: 'Full Name' } },
        { id: 'p2-2', componentName: 'TextField', propertyName: 'email', options: { label: 'Email Address' } },
        { id: 'p2-3', componentName: 'SelectField', propertyName: 'status', options: { label: 'Status', options: ['Active', 'Inactive'] } },
      ],
    },
    {
      id: 'p2-4',
      componentName: 'RelationGrid',
      propertyName: 'addresses',
      options: {
        label: 'Customer Addresses',
        columns: [
          { field: 'street', header: 'Street' },
          { field: 'city', header: 'City' },
          { field: 'zip', header: 'ZIP' },
        ],
      },
    },
  ],
};
