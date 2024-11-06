type InputProps = {
  type?: "text" | "number" | "email" | "password" | "url",
  name?: string,
  value?: string,
  placeholder?: string,
  required?: boolean,
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void,
  className?: string;
}

const Input = ({ type = "text", name, value, placeholder, required = false, onChange, className }: InputProps) => {
  return (
    <input
      type={type}
      name={name}
      value={value}
      placeholder={placeholder}
      required={required}
      onChange={onChange}
      className={`p-4 border-2 border-gray-300 rounded-md text-xl shadow-sm border-opacity-20 ${className}`}
    />
  );
}

export default Input;