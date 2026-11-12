
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import Button from "../components/Button"
import Input from "../components/Input"
import { api } from "../api/api"
import { useUserStore } from "../store/useUserStore"

const Login = () => {
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const setSession = useUserStore((state) => state.setSession)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")

    const form = e.currentTarget
    const user = {
      username: form.elements.namedItem("username").value,
      password: form.elements.namedItem("password").value,
    }

    try {
      setIsLoading(true)
      const data = await api.loginUser(user)
      setSession(data)
      navigate("/")
    } catch (err) {
      setError(err.response?.data?.message || "Ошибка входа")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container">
      <div className="auth-container">
        <div className="auth-header">
          <div className="auth-icon">🔐</div>
          <h1 className="auth-title">Вход</h1>
          <p className="auth-subtitle">Войдите в свой аккаунт</p>
        </div>

        {error && (
          <div className="alert alert-error active">{error}</div>
        )}

        <form id="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Имя пользователя</label>
            <Input
              type="text"
              name="username"
              placeholder="Введите имя пользователя"
              autoComplete="username"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Пароль</label>
            <Input
              type="password"
              name="password"
              placeholder="Введите пароль"
              autoComplete="current-password"
              required
            />
          </div>

          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Выполняется вход..." : "Войти"}
          </Button>
        </form>

        <div className="auth-divider">или</div>

        <div className="auth-link">
          Нет аккаунта?{" "}
          <Link to="/register">Зарегистрироваться</Link>
        </div>
      </div>
    </div>
  )
}

export default Login
