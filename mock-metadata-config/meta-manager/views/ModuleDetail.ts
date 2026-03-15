import { ViewRecord } from '@/metadata/View';

export const ModuleDetail: ViewRecord = {
  name: 'ModuleDetail',
  label: 'Module Detail',
  viewType: 'DETAIL',
  modelName: 'Module',
  isMenuOption: false,
  parts: [
    {
      componentName: 'FormLayout',
      children: [
        { componentName: 'TextField', propertyName: 'label', label: 'Module Label' },
        { componentName: 'TextField', propertyName: 'name', label: 'System Name' },
      ],
    },
  ],
};
