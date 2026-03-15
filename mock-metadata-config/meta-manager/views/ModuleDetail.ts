import { ViewRecord } from '@/metadata/View';

export const ModuleDetail: ViewRecord = {
  name: 'ModuleDetail',
  label: 'Module Detail',
  viewType: 'DETAIL',
  modelName: 'Module',
  isMenuOption: false,
  parts: [
    {
      id: 'md1',
      componentName: 'FormLayout',
      children: [
        { id: 'md1-1', componentName: 'TextField', propertyName: 'label', options: { label: 'Module Label' } },
        { id: 'md1-2', componentName: 'TextField', propertyName: 'name', options: { label: 'System Name' } },
      ],
    },
  ],
};
