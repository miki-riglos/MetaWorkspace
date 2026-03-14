import { ModelConfig } from '@/metadata/Model';

export const ModelModel: ModelConfig = {
  name: 'Model',
  label: 'Model',
  properties: [
    { name: 'name', label: 'Name', dataType: 'string', required: true, isId: true },
    { name: 'label', label: 'Label', dataType: 'string', required: true },
  ],
};
