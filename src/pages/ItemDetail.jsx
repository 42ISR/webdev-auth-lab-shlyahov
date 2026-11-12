import { Link } from 'react-router-dom'
import Input from '../components/Input'
import Button from '../components/Button'

const ItemDetail = () => {

    return (
        <div className="container">
            <Link to={'/'}>← Вернуться к списку товаров</Link>

            <div className="item-detail">
                <div className="item-header">
                    <div>
                        <img src="https:/..." className="item-image-large" />
                    </div>

                    <div className="item-info">
                        <span className="item-status">Активное</span>

                        <h1 className="item-title-large">Название</h1>

                        <div className="item-seller-info">
                            <div className="seller-avatar">Первые 2 символа с юзернейма</div>
                            <div className="seller-details">
                                <div className="seller-name">
Юзернейм
                                </div>
                                <div className="seller-date">
Когда создан
                                </div>
                            </div>
                        </div>

                        <div className="item-description-full">
Описание
                        </div>

                        <div className="price-section">
                            <div className="starting-price">Начальная цена:</div>
                            <div className="current-price">Цена</div>
                            <div className="highest-bid">
                                Текущая ставка: Ставка
                            </div>

                            <form className="bid-form">
                                <Input
                                    type="number"
                                    name="bidInput"
                                    className="bid-input"
                                    placeholder="Введите вашу ставку (мин. стоимость + 1 рубль ₽)"
                                    min={0}
                                    step="100"
                                />
                                <Button type="submit" className="btn-bid">
                                    Сделать ставку
                                </Button>
                            </form>
                        </div>
                    </div>
                </div>

                <div className="bids-section">
                    <div className="bids-header">
                        <h2 className="bids-title">История ставок</h2>
                        <span className="bids-count">5</span>
                    </div>

                    <div className="bids-list">
                        <div className="bid-item highest-bid-item">
                            <div className="bid-user">
                                <div className="bid-avatar">BB</div>
                                <div className="bid-details">
                                    <span className="bid-username">buyer_best</span>
                                    <span className="bid-time">2 часа назад</span>
                                </div>
                                <span className="highest-badge">🏆 Лидирует</span>
                            </div>
                            <div className="bid-amount">70 000 ₽</div>
                        </div>

                        <div className="bid-item">
                            <div className="bid-user">
                                <div className="bid-avatar">JD</div>
                                <div className="bid-details">
                                    <span className="bid-username">john_doe</span>
                                    <span className="bid-time">5 часов назад</span>
                                </div>
                            </div>
                            <div className="bid-amount">68 000 ₽</div>
                        </div>

                        <div className="bid-item">
                            <div className="bid-user">
                                <div className="bid-avatar">AL</div>
                                <div className="bid-details">
                                    <span className="bid-username">alice_tech</span>
                                    <span className="bid-time">1 день назад</span>
                                </div>
                            </div>
                            <div className="bid-amount">67 000 ₽</div>
                        </div>

                        <div className="bid-item">
                            <div className="bid-user">
                                <div className="bid-avatar">MK</div>
                                <div className="bid-details">
                                    <span className="bid-username">mike_k</span>
                                    <span className="bid-time">1 день назад</span>
                                </div>
                            </div>
                            <div className="bid-amount">66 000 ₽</div>
                        </div>

                        <div className="bid-item">
                            <div className="bid-user">
                                <div className="bid-avatar">ST</div>
                                <div className="bid-details">
                                    <span className="bid-username">sarah_tech</span>
                                    <span className="bid-time">2 дня назад</span>
                                </div>
                            </div>
                            <div className="bid-amount">65 500 ₽</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ItemDetail
