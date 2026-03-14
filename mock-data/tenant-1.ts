export const tenant1Data = {
  'sales:Customer': [
    { 
      id: '1', 
      name: 'John Doe', 
      email: 'john@example.com', 
      status: 'Active',
      addresses: [
        { street: '123 Main St', city: 'New York', zip: '10001' },
        { street: '456 Park Ave', city: 'New York', zip: '10022' },
      ]
    },
    { 
      id: '2', 
      name: 'Jane Smith', 
      email: 'jane@example.com', 
      status: 'Inactive',
      addresses: [
        { street: '789 Broadway', city: 'Los Angeles', zip: '90001' },
      ]
    },
  ],
  'sales:Address': [
    { id: 'a1', street: '123 Main St', city: 'New York', zip: '10001', customerId: '1' },
    { id: 'a2', street: '456 Park Ave', city: 'New York', zip: '10022', customerId: '1' },
    { id: 'a3', street: '789 Broadway', city: 'Los Angeles', zip: '90001', customerId: '2' },
  ],
};
