import { ViewStored } from '@/infrastructure/stored/ViewStored';

export const ModuleList: ViewStored = {
  name: 'ModuleList',
  label: 'Modules',
  viewType: 'LIST',
  modelName: 'Module',
  isMenuOption: true,
  parts: [
    {
      componentName: 'DataGrid',
      children: [
        { componentName: 'DisplayField', propertyName: 'label', label: 'Module Label' },
        { componentName: 'DisplayField', propertyName: 'name', label: 'System Name' },
      ],
    },
  ],
};
