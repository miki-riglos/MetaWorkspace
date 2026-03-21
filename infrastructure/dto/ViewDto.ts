import { ViewType } from '@/infrastructure/server/View';
import { ViewPart } from '../server/ViewPart';

export type ViewDto = {
  name: string;
  label: string;
  viewType: ViewType;
  modelName: string;
  parts: ViewPart[];
  isMenuOption: boolean;
}