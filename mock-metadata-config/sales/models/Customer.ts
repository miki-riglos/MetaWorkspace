import { ModelRecord } from '@/metadata/Model';

export const Customer: ModelRecord = {
  name: 'Customer',
  label: 'Customer',
  properties: [
    { name: 'id', label: 'ID', dataType: 'string', required: true, isId: true },
    { name: 'name', label: 'Name', dataType: 'string', required: true },
    { name: 'email', label: 'Email', dataType: 'string' },
    { name: 'status', label: 'Status', dataType: 'string' },
    {
      name: 'addresses',
      label: 'Addresses',
      dataType: 'relation',
      relation: { targetModel: 'Address', cardinality: 'ONE_TO_MANY' }
    },
  ],
};
