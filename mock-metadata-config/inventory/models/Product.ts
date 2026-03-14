import { ModelConfig } from '@/metadata/Model';

export const Product: ModelConfig = {
  name: 'Product',
  label: 'Product',
  properties: [
    { name: 'id', label: 'ID', dataType: 'string', required: true, isId: true },
    { name: 'sku', label: 'SKU', dataType: 'string', required: true },
    { name: 'name', label: 'Product Name', dataType: 'string', required: true },
    { name: 'price', label: 'Price', dataType: 'number' },
  ],
};
