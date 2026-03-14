import { ModuleRecord } from '@/metadata/Module';
import { Customer } from './models/Customer';
import { Address } from './models/Address';
import { CustomerList } from './views/CustomerList';
import { CustomerDetail } from './views/CustomerDetail';
import { AddressList } from './views/AddressList';
import { AddressDetail } from './views/AddressDetail';

export const salesModule: ModuleRecord = {
  name: 'sales',
  label: 'Sales Management',
  models: [Customer, Address],
  views: [CustomerList, CustomerDetail, AddressList, AddressDetail],
};
