export type ViewPart = {
  componentName: string;
  modelName?: string;
  propertyName?: string;  // of the parent part model
  label?: string;
  children?: ViewPart[];
  options?: Record<string, any>;
}
