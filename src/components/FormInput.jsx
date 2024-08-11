
function FormInput({ label, name, type, defaultValue, size }) {
  return (
    <label className="form-control">
      <div className="label">
        <span className="label-text">{ label }</span>
      </div>
      <input 
        name={ name }
        type={ type } 
        defaultValue={ defaultValue }
        className={`input input-bordered ${ size }`} 
      />
    </label>
  )
}

export default FormInput
