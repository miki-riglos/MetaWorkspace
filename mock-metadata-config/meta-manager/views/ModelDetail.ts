import { ViewRecord } from '@/metadata/View';

export const ModelDetail: ViewRecord = {
  name: 'ModelDetail',
  label: 'Model Detail',
  viewType: 'DETAIL',
  modelName: 'Model',
  isMenuOption: false,
  parts: [
    {
      id: 'mo-d1',
      componentName: 'FormLayout',
      children: [
        { id: 'mo-d1-1', componentName: 'TextField', propertyName: 'label', options: { label: 'Model Label' } },
        { id: 'mo-d1-2', componentName: 'TextField', propertyName: 'name', options: { label: 'System Name' } },
      ],
    },
    {
      id: 'mo-d2',
      componentName: 'DataGrid',
      propertyName: 'properties',
      options: {
        columns: [
          { field: 'label', header: 'Property Label' },
          { field: 'dataType', header: 'Type' },
          { field: 'relation.targetModel', header: 'Target Model' },
          { field: 'relation.cardinality', header: 'Cardinality' },
        ],
      },
    },
  ],
};
