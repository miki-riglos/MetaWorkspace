export const tenantAdminData = {
  'meta-manager:Module': [
    { id: 'm1', name: 'sales', label: 'Sales Management' },
    { id: 'm2', name: 'inventory', label: 'Inventory Control' },
  ],
  'meta-manager:Model': [
    { 
      id: 'mo1', 
      name: 'Customer', 
      label: 'Customer',
      properties: [
        { label: 'Name', type: 'string' },
        { label: 'Orders', type: 'relation', relation: { targetModel: 'Order', cardinality: 'ONE_TO_MANY' } }
      ]
    },
    { 
      id: 'mo2', 
      name: 'Product', 
      label: 'Product',
      properties: [
        { label: 'SKU', type: 'string' },
        { label: 'Category', type: 'relation', relation: { targetModel: 'Category', cardinality: 'MANY_TO_ONE' } }
      ]
    },
  ],
  'meta-manager:View': [
    { id: 'v1', name: 'CustomerList', label: 'Customer List', type: 'LIST' },
    { id: 'v2', name: 'ProductList', label: 'Product List', type: 'LIST' },
  ],
};
