const Button = ({ children, className = "", ...props }) => {
  return (
    <button {...props} className={`button ${className}`.trim()}>
      {children}
    </button>
  )
}

export default Button
