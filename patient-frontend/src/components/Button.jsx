function Button({
  label,
  type = "button",
  className,
  onClick,
}) {
  return (
    <button type={type} className={className} onClick={onClick}>
      {label}
    </button>
  );
}

export default Button;
