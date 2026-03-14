import { ViewInit } from '@/metadata/View';

export const ModelDetail: ViewInit = {
  name: 'ModelDetail',
  label: 'Model Detail',
  viewType: 'DETAIL',
  modelName: 'Model',
  isMenuOption: false,
  parts: [
    {
      id: 'mo-d1',
      component: 'FormLayout',
      children: [
        { id: 'mo-d1-1', component: 'TextField', propertyName: 'label', props: { label: 'Model Label' } },
        { id: 'mo-d1-2', component: 'TextField', propertyName: 'name', props: { label: 'System Name' } },
      ],
    },
    {
      id: 'mo-d2',
      component: 'DataGrid',
      propertyName: 'properties',
      props: {
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
