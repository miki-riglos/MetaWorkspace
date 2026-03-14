import { ViewInit } from '@/metadata/View';

export const ViewDetail: ViewInit = {
  name: 'ViewDetail',
  label: 'View Detail',
  viewType: 'DETAIL',
  modelName: 'View',
  isMenuOption: false,
  parts: [
    {
      id: 'v-d1',
      component: 'FormLayout',
      children: [
        { id: 'v-d1-1', component: 'TextField', propertyName: 'label', props: { label: 'View Label' } },
        { id: 'v-d1-2', component: 'TextField', propertyName: 'name', props: { label: 'System Name' } },
        { id: 'v-d1-3', component: 'SelectField', propertyName: 'type', props: { label: 'View Type', options: ['LIST', 'DETAIL'] } },
      ],
    },
  ],
};
