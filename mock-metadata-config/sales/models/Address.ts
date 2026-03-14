import { ModelRecord } from '@/metadata/Model';

export const Address: ModelRecord = {
  name: 'Address',
  label: 'Address',
  properties: [
    { name: 'id', label: 'ID', dataType: 'string', required: true, isId: true },
    { name: 'street', label: 'Street', dataType: 'string', required: true },
    { name: 'city', label: 'City', dataType: 'string', required: true },
    { name: 'zip', label: 'ZIP Code', dataType: 'string' },
    {
      name: 'customerId',
      label: 'Customer',
      dataType: 'relation',
      relation: { targetModel: 'Customer', cardinality: 'MANY_TO_ONE' }
    },
  ],
};
