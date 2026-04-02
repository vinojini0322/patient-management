function FormInput({
  label,
  name,
  type = "text",
  value,
  placeHolder,
  onChange,
  required = false,
  error,
}) {
  return (
    <div className="col-md-6 mb-3">
      <label className="form-label">{label}</label>
      <input
        type={type}
        name={name}
        className={`form-control ${error ? "is-invalid" : ""}`}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={placeHolder}
      />
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
}

export default FormInput;
