
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useUserStore } from "../store/useUserStore"

const Logout = () => {
  const navigate = useNavigate()
  const clearSession = useUserStore((state) => state.clearSession)

  useEffect(() => {
    clearSession()
    navigate("/", { replace: true })
  }, [clearSession, navigate])

  return <div className="container">Выход из аккаунта...</div>
}

export default Logout
