import { ModuleConfig } from '@/metadata/Module';
import { ModuleModel } from './models/Module';
import { ModelModel } from './models/Model';
import { ViewModel } from './models/View';
import { ModuleList } from './views/ModuleList';
import { ModelList } from './views/ModelList';
import { ViewList } from './views/ViewList';
import { ModelDetail } from './views/ModelDetail';
import { ViewDetail } from './views/ViewDetail';
import { ModuleDetail } from './views/ModuleDetail';

export const metaManagerModule: ModuleConfig = {
  name: 'meta-manager',
  label: 'Metadata Manager',
  models: [ModuleModel, ModelModel, ViewModel],
  views: [ModuleList, ModelList, ViewList, ModelDetail, ViewDetail, ModuleDetail],
};
