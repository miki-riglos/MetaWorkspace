import { ViewRecord } from '@/metadata/View';

export const ModelList: ViewRecord = {
  name: 'ModelList',
  label: 'Models',
  viewType: 'LIST',
  modelName: 'Model',
  isMenuOption: true,
  parts: [
    {
      componentName: 'DataGrid',
      children: [
        { componentName: 'DisplayField', propertyName: 'label', label: 'Model Label' },
        { componentName: 'DisplayField', propertyName: 'name', label: 'System Name' },
      ],
    },
  ],
};
