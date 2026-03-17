import { ViewType } from '../View';
import { ViewPart } from '../ViewPart';

export type ViewStored = {
  name: string;
  label: string;
  viewType: ViewType;
  modelName: string;
  parts: ViewPart[];
  isMenuOption: boolean;
}
