const TextInput = ({
  value,
  onChange,
  placeholder,
  type = "text",
  name,
  required = false,
  className = "",
}) => {
  return (
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required={required}
      className={`p-3 border rounded focus:outline-none focus:ring-2 focus:ring-purple-400 ${className}`}
    />
  );
};

export default TextInput;
