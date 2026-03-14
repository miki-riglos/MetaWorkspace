import { ViewRecord } from '@/metadata/View';

export const ViewDetail: ViewRecord = {
  name: 'ViewDetail',
  label: 'View Detail',
  viewType: 'DETAIL',
  modelName: 'View',
  isMenuOption: false,
  parts: [
    {
      id: 'v-d1',
      componentName: 'FormLayout',
      children: [
        { id: 'v-d1-1', componentName: 'TextField', propertyName: 'label', props: { label: 'View Label' } },
        { id: 'v-d1-2', componentName: 'TextField', propertyName: 'name', props: { label: 'System Name' } },
        { id: 'v-d1-3', componentName: 'SelectField', propertyName: 'type', props: { label: 'View Type', options: ['LIST', 'DETAIL'] } },
      ],
    },
  ],
};
