export const AdminCustomInput = ({
  label,
  placeholder,
  required,
  style,
}: {
  label: string;

  placeholder: string;
  required?: boolean;
  style?: string;
}) => {
  return (
    <div
      className={`border-border rounded-lg border bg-white px-4 py-2 ${style}`}
    >
      <label htmlFor={label} className="text-text-secondary text-sm">
        {label} {required && <span className="text-error">*</span>}
      </label>
      <input
        type="text"
        id={label}
        placeholder={placeholder}
        className="input input-ghost w-full p-0 focus-within:outline-none"
        required
      />
    </div>
  );
};
