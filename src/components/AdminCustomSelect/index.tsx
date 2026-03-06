import type { IOption } from "@/types/type";

export const AdminCustomSelect = ({
  label,
  required,
  style,
  value,
  setValue,
  options,
}: {
  label: string;
  required?: boolean;
  style?: string;
  value?: string;
  setValue?: (value: string) => void;
  options: IOption[];
}) => {
  return (
    <div
      className={`border-border rounded-lg border bg-white px-4 py-2 ${style}`}
    >
      <label htmlFor={label} className="text-text-secondary text-sm">
        {label} {required && <span className="text-error">*</span>}
      </label>

      <select
        id={label}
        className="select select-ghost w-full p-0 focus-within:outline-none"
        value={value}
        onChange={(e) => setValue?.(e.target.value)}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};
