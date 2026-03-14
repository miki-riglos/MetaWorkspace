import { ModelRecord } from '@/metadata/Model';

export const ModuleModel: ModelRecord = {
  name: 'Module',
  label: 'Module',
  properties: [
    { name: 'name', label: 'Name', dataType: 'string', required: true, isId: true },
    { name: 'label', label: 'Label', dataType: 'string', required: true },
  ],
};
