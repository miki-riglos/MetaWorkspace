import { ViewRecord } from '@/metadata/View';

export const AddressDetail: ViewRecord = {
  name: 'AddressDetail',
  label: 'Address Detail',
  viewType: 'DETAIL',
  modelName: 'Address',
  isMenuOption: false,
  parts: [
    {
      id: 'a2',
      componentName: 'FormLayout',
      children: [
        { id: 'a2-1', componentName: 'TextField', propertyName: 'street', props: { label: 'Street' } },
        { id: 'a2-2', componentName: 'TextField', propertyName: 'city', props: { label: 'City' } },
        { id: 'a2-3', componentName: 'TextField', propertyName: 'zip', props: { label: 'ZIP Code' } },
        { id: 'a2-4', componentName: 'LookupField', propertyName: 'customerId', props: { label: 'Customer' } },
      ],
    },
  ],
};
