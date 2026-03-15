import { ViewRecord } from '@/metadata/View';

export const AddressDetail: ViewRecord = {
  name: 'AddressDetail',
  label: 'Address Detail',
  viewType: 'DETAIL',
  modelName: 'Address',
  isMenuOption: false,
  parts: [
    {
      componentName: 'FormLayout',
      children: [
        { componentName: 'TextField', propertyName: 'street', label: 'Street' },
        { componentName: 'TextField', propertyName: 'city', label: 'City' },
        { componentName: 'TextField', propertyName: 'zip', label: 'ZIP Code' },
        { componentName: 'LookupField', propertyName: 'customerId', label: 'Customer' },
      ],
    },
  ],
};
