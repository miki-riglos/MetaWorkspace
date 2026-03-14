import { ViewInit } from '@/metadata/View';

export const AddressDetail: ViewInit = {
  name: 'AddressDetail',
  label: 'Address Detail',
  viewType: 'DETAIL',
  modelName: 'Address',
  isMenuOption: false,
  parts: [
    {
      id: 'a2',
      component: 'FormLayout',
      children: [
        { id: 'a2-1', component: 'TextField', propertyName: 'street', props: { label: 'Street' } },
        { id: 'a2-2', component: 'TextField', propertyName: 'city', props: { label: 'City' } },
        { id: 'a2-3', component: 'TextField', propertyName: 'zip', props: { label: 'ZIP Code' } },
        { id: 'a2-4', component: 'LookupField', propertyName: 'customerId', props: { label: 'Customer' } },
      ],
    },
  ],
};
