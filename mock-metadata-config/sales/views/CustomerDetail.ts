import { ViewInit } from '@/metadata/View';

export const CustomerDetail: ViewInit = {
  name: 'CustomerDetail',
  label: 'Customer Detail',
  viewType: 'DETAIL',
  modelName: 'Customer',
  isMenuOption: false,
  parts: [
    {
      id: 'p2',
      component: 'FormLayout',
      children: [
        { id: 'p2-1', component: 'TextField', propertyName: 'name', props: { label: 'Full Name' } },
        { id: 'p2-2', component: 'TextField', propertyName: 'email', props: { label: 'Email Address' } },
        { id: 'p2-3', component: 'SelectField', propertyName: 'status', props: { label: 'Status', options: ['Active', 'Inactive'] } },
      ],
    },
    {
      id: 'p2-4',
      component: 'RelationGrid',
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
