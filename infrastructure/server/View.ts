import { ViewStored } from '../stored/metadata/ViewStored';
import { ViewPart } from './ViewPart';
import { ViewDto } from '../dto/ViewDto';
import { ViewStub } from '../stub/ViewStub';

export type ViewType = 'LIST' | 'DETAIL';

export class View {
  public readonly name: string;
  public readonly label: string;
  public readonly viewType: ViewType;
  public readonly modelName: string;
  public readonly parts: ViewPart[];
  public readonly isMenuOption: boolean;

  constructor(stored: ViewStored) {
    this.name = stored.name;
    this.label = stored.label;
    this.viewType = stored.viewType;
    this.modelName = stored.modelName;
    this.parts = stored.parts;
    this.isMenuOption = stored.isMenuOption;
  }

  toStub(): ViewStub {
    return {
      name: this.name,
      label: this.label,
      viewType: this.viewType,
      isMenuOption: this.isMenuOption,
    };
  }

  toDto(): ViewDto {
    return {
      name: this.name,
      label: this.label,
      viewType: this.viewType,
      modelName: this.modelName,
      parts: this.parts,
      isMenuOption: this.isMenuOption,
    };
  }
}
