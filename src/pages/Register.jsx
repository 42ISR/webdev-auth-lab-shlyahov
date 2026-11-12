
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import Button from "../components/Button"
import Input from "../components/Input"
import { api } from "../api/api"
import { useUserStore } from "../store/useUserStore"

const Register = () => {
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const setSession = useUserStore((state) => state.setSession)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")

    const form = e.currentTarget

    const username = form.elements.namedItem("username").value.trim()
    const email = form.elements.namedItem("email").value.trim()
    const password = form.elements.namedItem("password").value
    const password2 = form.elements.namedItem("password2").value

    if (password !== password2) {
      setError("Пароли не совпадают")
      return
    }

    const user = { username, password }

    if (email) {
      user.email = email
    }

    try {
      setIsLoading(true)
      const data = await api.registerUser(user)
      setSession(data)
      navigate("/")
    } catch (err) {
      setError(
        err.response?.data?.message || "Ошибка регистрации"
      )
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

        {error && (
          <div className="alert alert-error active">{error}</div>
        )}

        <form id="register-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Имя пользователя</label>
            <Input
              type="text"
              name="username"
              placeholder="Введите имя пользователя"
              minLength={3}
              autoComplete="username"
              required
            />
            <div className="form-hint">Минимум 3 символа</div>
          </div>

          <div className="form-group">
            <label className="form-label">
              Email <span className="optional">(необязательно)</span>
            </label>
            <Input
              type="email"
              name="email"
              placeholder="example@email.com"
              autoComplete="email"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Пароль</label>
            <Input
              type="password"
              name="password"
              placeholder="Введите пароль"
              minLength={6}
              autoComplete="new-password"
              required
            />
            <div className="form-hint">Минимум 6 символов</div>
          </div>

          <div className="form-group">
            <label className="form-label">Подтверждение пароля</label>
            <Input
              type="password"
              name="password2"
              placeholder="Повторите пароль"
              autoComplete="new-password"
              required
            />
          </div>

          <Button type="submit" disabled={isLoading}>
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
