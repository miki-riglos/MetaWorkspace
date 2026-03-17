import { ViewStored } from '@/infrastructure/stored/ViewStored';

export const ViewList: ViewStored = {
  name: 'ViewList',
  label: 'Views',
  viewType: 'LIST',
  modelName: 'View',
  isMenuOption: true,
  parts: [
    {
      componentName: 'DataGrid',
      children: [
        { componentName: 'DisplayField', propertyName: 'label', label: 'View Label' },
        { componentName: 'DisplayField', propertyName: 'type', label: 'Type' },
      ],
    },
  ],
};
