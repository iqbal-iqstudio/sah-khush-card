"use client";

interface FormFieldProps {
  label: string;
  children: React.ReactNode;
  className?: string;
  hint?: string;
}

export function FormField({ label, children, className = "", hint }: FormFieldProps) {
  return (
    <div className={className}>
      <label className="mb-1.5 block text-xs font-medium text-taupe">{label}</label>
      {children}
      {hint && <p className="mt-1 text-xs text-taupe/60">{hint}</p>}
    </div>
  );
}

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  hint?: string;
}

export function InputField({ label, hint, className = "", ...props }: InputFieldProps) {
  return (
    <FormField label={label} hint={hint}>
      <input
        {...props}
        className={`w-full rounded-xl border border-taupe/20 bg-ivory px-4 py-2.5 text-sm outline-none transition placeholder:text-taupe/50 focus:border-gold focus:ring-1 focus:ring-gold/30 ${className}`}
      />
    </FormField>
  );
}

interface TextareaFieldProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  hint?: string;
}

export function TextareaField({ label, hint, className = "", ...props }: TextareaFieldProps) {
  return (
    <FormField label={label} hint={hint}>
      <textarea
        {...props}
        className={`w-full rounded-xl border border-taupe/20 bg-ivory px-4 py-2.5 text-sm outline-none transition placeholder:text-taupe/50 focus:border-gold focus:ring-1 focus:ring-gold/30 resize-none ${className}`}
      />
    </FormField>
  );
}

interface SelectFieldProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: { value: string; label: string }[];
}

export function SelectField({ label, options, className = "", ...props }: SelectFieldProps) {
  return (
    <FormField label={label}>
      <select
        {...props}
        className={`w-full rounded-xl border border-taupe/20 bg-ivory px-4 py-2.5 text-sm outline-none transition focus:border-gold focus:ring-1 focus:ring-gold/30 ${className}`}
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>
    </FormField>
  );
}
