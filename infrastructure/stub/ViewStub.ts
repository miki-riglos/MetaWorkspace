import { ViewType } from "../server/View";

export type ViewStub = {
  name: string;
  label: string;
  viewType: ViewType;
  isMenuOption: boolean;
};
