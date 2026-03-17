import { ViewType } from '@/infrastructure/View';
import { ViewPart } from '../ViewPart';

export type ViewDto = {
  name: string;
  label: string;
  viewType: ViewType;
  modelName: string;
  parts: ViewPart[];
  isMenuOption: boolean;
}