import { ModelStored } from './ModelStored';
import { ViewStored } from './ViewStored';

export type ModuleStored = {
  name: string;
  label: string;
  models: ModelStored[];
  views: ViewStored[];
}
