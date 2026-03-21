import { ViewType } from '../../server/View';
import { ViewPart } from '../../server/ViewPart';

export type ViewStored = {
  name: string;
  label: string;
  viewType: ViewType;
  modelName: string;
  parts: ViewPart[];
  isMenuOption: boolean;
}
