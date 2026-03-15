import { ViewRecord } from '@/metadata/View';

export const ViewList: ViewRecord = {
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
