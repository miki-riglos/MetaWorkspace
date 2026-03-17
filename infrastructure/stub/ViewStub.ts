import { ViewType } from "../View";

export type ViewStub = {
  name: string;
  label: string;
  viewType: ViewType;
  isMenuOption: boolean;
};
