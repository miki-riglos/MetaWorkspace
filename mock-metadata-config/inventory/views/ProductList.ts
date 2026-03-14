import { ViewInit } from '@/metadata/View';

export const ProductList: ViewInit = {
  name: 'ProductList',
  label: 'Product List',
  viewType: 'LIST',
  modelName: 'Product',
  isMenuOption: true,
  parts: [
    {
      id: 'p3',
      component: 'DataGrid',
      props: {
        columns: [
          { field: 'sku', header: 'SKU' },
          { field: 'name', header: 'Name' },
          { field: 'price', header: 'Price' },
        ],
      },
    },
  ],
};
