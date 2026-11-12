const Input = ({ label, className = "", id, ...props }) => {
  return (
    <div className="input-group">
      {label && <label htmlFor={id} className="input-label">{label}</label>}
      <input
        id={id}
        {...props}
        className={`input-field ${className}`.trim()}
      />
    </div>
  )
}

export default Input
