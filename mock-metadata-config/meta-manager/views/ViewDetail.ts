import { ViewStored } from '@/infrastructure/stored/ViewStored';

export const ViewDetail: ViewStored = {
  name: 'ViewDetail',
  label: 'View Detail',
  viewType: 'DETAIL',
  modelName: 'View',
  isMenuOption: false,
  parts: [
    {
      componentName: 'FormLayout',
      children: [
        { componentName: 'TextField', propertyName: 'label', label: 'View Label' },
        { componentName: 'TextField', propertyName: 'name', label: 'System Name' },
        { componentName: 'SelectField', propertyName: 'type', label: 'View Type', options: ['LIST', 'DETAIL'] },
      ],
    },
  ],
};
