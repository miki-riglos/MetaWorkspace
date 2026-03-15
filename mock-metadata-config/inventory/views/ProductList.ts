import { ViewRecord } from '@/metadata/View';

export const ProductList: ViewRecord = {
  name: 'ProductList',
  label: 'Product List',
  viewType: 'LIST',
  modelName: 'Product',
  isMenuOption: true,
  parts: [
    {
      id: 'p3',
      componentName: 'DataGrid',
      options: {
        columns: [
          { field: 'sku', header: 'SKU' },
          { field: 'name', header: 'Name' },
          { field: 'price', header: 'Price' },
        ],
      },
    },
  ],
};
