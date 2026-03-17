import { ViewStored } from '@/infrastructure/stored/ViewStored';

export const ModuleDetail: ViewStored = {
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
