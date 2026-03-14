import React from 'react';
import { ViewPartComponent } from './types';

export const LookupField: ViewPartComponent = ({ props, value, onChange }) => {
  const [options, setOptions] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    if (props.targetModel && props.tenantId && props.moduleName) {
      setLoading(true);
      fetch(`/api/${props.tenantId}/${props.moduleName}/${props.targetModel}`)
        .then(res => res.json())
        .then(data => {
          setOptions(data);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [props.targetModel, props.tenantId, props.moduleName]);

  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-semibold uppercase tracking-wider text-gray-500">{props.label}</label>
      <select
        value={value || ''}
        onChange={(e) => onChange?.(e.target.value)}
        disabled={loading}
        className="px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all disabled:opacity-50"
      >
        <option value="">Select {props.targetModel}...</option>
        {options.map((opt: any) => (
          <option key={opt.id} value={opt.id}>{opt.name || opt.label || opt.id}</option>
        ))}
      </select>
    </div>
  );
};
