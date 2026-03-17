import { ModelDto } from './ModelDto';
import { ViewDto } from './ViewDto';

export type ModuleDto = {
  name: string;
  label: string;
  models: ModelDto[];
  views: ViewDto[];
}
