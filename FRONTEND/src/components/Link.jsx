import { Link } from "@tanstack/react-router";

const CustomLink = ({
  to,
  children,
  ...rest
}) => {
  return (
    <Link
      to={to}
      className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition"
      {...rest}
    >
      {children}
    </Link>
  );
};

export default CustomLink;
