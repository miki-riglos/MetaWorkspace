import { ModelRecord } from '@/infrastructure/types';
import { Model } from '@/infrastructure/server/Model';

export interface ValidationError {
  field: string;
  message: string;
}

export function validateRecord(model: Model, record: ModelRecord): ValidationError[] {
  const errors: ValidationError[] = [];

  model.properties.forEach((prop) => {
    const value = record[prop.name];

    // Check required fields
    if (prop.required && (value === undefined || value === null || value === '')) {
      errors.push({ field: prop.name, message: `${prop.label} is required` });
      return;
    }

    // Skip further validation if value is empty and not required
    if (value === undefined || value === null || value === '') {
      return;
    }

    // Type validation
    switch (prop.dataType) {
      case 'string':
        if (typeof value !== 'string') {
          errors.push({ field: prop.name, message: `${prop.label} must be a string` });
        }
        break;
      case 'number':
        if (typeof value !== 'number' || isNaN(value)) {
          errors.push({ field: prop.name, message: `${prop.label} must be a number` });
        }
        break;
      case 'boolean':
        if (typeof value !== 'boolean') {
          errors.push({ field: prop.name, message: `${prop.label} must be a boolean` });
        }
        break;
      case 'date':
        if (isNaN(Date.parse(value))) {
          errors.push({ field: prop.name, message: `${prop.label} must be a valid date` });
        }
        break;
      case 'relation':
        // For relations, we might expect an ID or an object depending on implementation
        // For now, just basic check if it's present
        break;
    }
  });

  return errors;
}
