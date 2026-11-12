
import { Link } from "react-router-dom"
import { useUserStore } from "../store/useUserStore"

const NavBar = () => {
  const session = useUserStore((state) => state.session)

  return (
    <div className="container">
      <header>
        <nav>
          <Link to="/" className="logo">
            🛒 Маркетплейс
          </Link>

          <ul className="nav-links">
            <li>
              <Link to="/">Домой</Link>
            </li>

            {session ? (
              <>
                <li>
                  <Link to="/create-item">Создать товар</Link>
                </li>
                <li>
                  <Link to="/bids">Мои ставки</Link>
                </li>
                <li>
                  <Link to="/logout">Выйти</Link>
                </li>
              </>
            ) : (
              <li>
                <Link to="/login">Войти</Link>
              </li>
            )}
          </ul>
        </nav>
      </header>
    </div>
  )
}

export default NavBar
