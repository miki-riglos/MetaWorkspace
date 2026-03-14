import { ModelRecord } from '@/metadata/Model';

export const ModelModel: ModelRecord = {
  name: 'Model',
  label: 'Model',
  properties: [
    { name: 'name', label: 'Name', dataType: 'string', required: true, isId: true },
    { name: 'label', label: 'Label', dataType: 'string', required: true },
  ],
};
