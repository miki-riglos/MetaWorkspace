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
        { id: 'p2-1', componentName: 'TextField', propertyName: 'name', props: { label: 'Full Name' } },
        { id: 'p2-2', componentName: 'TextField', propertyName: 'email', props: { label: 'Email Address' } },
        { id: 'p2-3', componentName: 'SelectField', propertyName: 'status', props: { label: 'Status', options: ['Active', 'Inactive'] } },
      ],
    },
    {
      id: 'p2-4',
      componentName: 'RelationGrid',
      propertyName: 'addresses',
      props: {
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
