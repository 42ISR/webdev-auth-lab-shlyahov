import { Link } from 'react-router-dom'

const NavBar = () => {
    return (
        <div className="container">
            <header>
                <nav>
                    <a href="/" className="logo">
                        🛒 Маркетплейс
                    </a>

                    <ul className="nav-links" id="guest-nav">
                        <li>
                            <Link to={'/'}>Домой</Link>
                        </li>
                        <li>
                            <Link to={'/login'}>Войти</Link>
                        </li>
                        <>
                            <li>
                                <Link to={'/create-item'}>Создать товар</Link>
                            </li>
                            <li>
                                <Link to={'/logout'}>Выйти</Link>
                            </li>
                        </>
                    </ul>
                </nav>
            </header>
        </div>
    )
}

export default NavBar
