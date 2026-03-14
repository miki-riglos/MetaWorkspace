import { ViewInit } from '@/metadata/View';

export const ModuleDetail: ViewInit = {
  name: 'ModuleDetail',
  label: 'Module Detail',
  viewType: 'DETAIL',
  modelName: 'Module',
  isMenuOption: false,
  parts: [
    {
      id: 'md1',
      component: 'FormLayout',
      children: [
        { id: 'md1-1', component: 'TextField', propertyName: 'label', props: { label: 'Module Label' } },
        { id: 'md1-2', component: 'TextField', propertyName: 'name', props: { label: 'System Name' } },
      ],
    },
  ],
};
