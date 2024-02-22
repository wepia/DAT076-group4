function InputField({
    label,
    type,
    id,
    name,
    required,
    setInputs,
    inputs,
  }: {
    label: string;
    type: string;
    id: string;
    name: string;
    required: boolean;
    setInputs: Function;
    inputs: any;
  }) {
    return (
      <div className="">
        <label htmlFor={id} className="form-label">
          {label}
        </label>
        <input
          type={type}
          id={id}
          name={name}
          className="form-control"
          onChange={(e) => {
            setInputs({ ...inputs, [name]: e.target.value });
          }}
          required={required}
        />
      </div>
    );
  }

  export default InputField;
