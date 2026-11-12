import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import Button from "../components/Button"
import Input from "../components/Input"
import { api } from "../api/api"
import { useUserStore } from "../store/useUserStore"

const Register = () => {
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [password, setPassword] = useState("")
  const navigate = useNavigate()
  const setSession = useUserStore((state) => state.setSession)

  const strength = password.length >= 10 && /[A-ZА-Я]/.test(password) && /\d/.test(password)
    ? "strong"
    : password.length >= 6 ? "medium" : password.length > 0 ? "weak" : ""

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")

    const form = e.currentTarget
    const username = form.elements.namedItem("username").value.trim()
    const email = form.elements.namedItem("email").value.trim()
    const passwordValue = form.elements.namedItem("password").value
    const password2 = form.elements.namedItem("password2").value

    if (passwordValue !== password2) {
      setError("Пароли не совпадают")
      return
    }

    const user = { username, password: passwordValue }
    if (email) user.email = email

    try {
      setIsLoading(true)
      const data = await api.registerUser(user)
      setSession(data)
      navigate("/")
    } catch (err) {
      setError(err.response?.data?.message || "Ошибка регистрации")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container">
      <div className="auth-container">
        <div className="auth-header">
          <div className="auth-icon">👤</div>
          <h1 className="auth-title">Регистрация</h1>
          <p className="auth-subtitle">Создайте новый аккаунт</p>
        </div>

        {error && <div className="alert alert-error active">{error}</div>}

        <form id="register-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label" htmlFor="register-username">Имя пользователя</label>
            <Input
              id="register-username"
              type="text"
              className="form-input"
              name="username"
              placeholder="Введите имя пользователя"
              minLength={3}
              autoComplete="username"
              required
            />
            <div className="form-hint">Минимум 3 символа</div>
            <div className="form-error">Имя пользователя должно быть не менее 3 символов</div>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="register-email">
              Email <span className="optional">(необязательно)</span>
            </label>
            <Input
              id="register-email"
              type="email"
              className="form-input"
              name="email"
              placeholder="example@email.com"
              autoComplete="email"
            />
            <div className="form-error">Введите корректный email</div>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="register-password">Пароль</label>
            <Input
              id="register-password"
              type="password"
              className="form-input"
              name="password"
              placeholder="Введите пароль"
              minLength={6}
              autoComplete="new-password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <div className="password-strength">
              <div className={`password-strength-bar ${strength}`} />
            </div>
            <div className="form-hint">Минимум 6 символов</div>
            <div className="form-error">Пароль должен быть не менее 6 символов</div>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="register-password2">Подтверждение пароля</label>
            <Input
              id="register-password2"
              type="password"
              className="form-input"
              name="password2"
              placeholder="Повторите пароль"
              autoComplete="new-password"
              required
            />
            <div className="form-error">Пароли не совпадают</div>
          </div>

          <Button type="submit" className="btn-submit" disabled={isLoading}>
            {isLoading ? "Регистрация..." : "Зарегистрироваться"}
          </Button>
        </form>

        <div className="auth-divider">или</div>
        <div className="auth-link">
          Уже есть аккаунт? <Link to="/login">Войти</Link>
        </div>
      </div>
    </div>
  )
}

export default Register
