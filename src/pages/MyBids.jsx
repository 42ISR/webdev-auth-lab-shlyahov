
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { api } from "../api/api"

const MyBids = () => {
  const [bids, setBids] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    let cancelled = false

    const loadBids = async () => {
      try {
        const data = await api.getMyBids()

        if (!cancelled) {
          setBids(data)
        }
      } catch (err) {
        console.error("Ошибка загрузки ставок:", err)

        if (!cancelled) {
          setError(
            err.response?.data?.message ||
            "Не удалось загрузить ставки"
          )
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false)
        }
      }
    }

    loadBids()

    return () => {
      cancelled = true
    }
  }, [])

  const winningCount = bids.filter(
    (bid) => bid.isWinning
  ).length

  const totalAmount = bids.reduce(
    (sum, bid) => sum + Number(bid.amount),
    0
  )

  const formatPrice = (value) =>
    Number(value).toLocaleString("ru-RU") + " ₽"

  return (
    <div className="container">
      <div className="page-header">
        <h1>Мои ставки</h1>
        <p className="page-subtitle">
          История ваших ставок на товары
        </p>
      </div>

      <div className="bids-summary">
        <div className="summary-card">
          <span className="summary-value">
            {bids.length}
          </span>
          <span className="summary-label">
            Всего ставок
          </span>
        </div>

        <div className="summary-card winning">
          <span className="summary-value">
            {winningCount}
          </span>
          <span className="summary-label">
            Лидирующих ставок
          </span>
        </div>

        <div className="summary-card">
          <span className="summary-value">
            {formatPrice(totalAmount)}
          </span>
          <span className="summary-label">
            Общая сумма
          </span>
        </div>
      </div>

      {error && (
        <div className="alert alert-error active">
          {error}
        </div>
      )}

      {isLoading ? (
        <p>Загрузка ставок...</p>
      ) : !error && bids.length === 0 ? (
        <p>Вы пока не сделали ни одной ставки.</p>
      ) : (
        <div className="bids-list">
          {bids.map((bid) => (
            <div
              key={bid.id}
              className={
                bid.isWinning
                  ? "bid-item winning"
                  : "bid-item"
              }
            >
              <div className="bid-item-content">
                <div className="bid-item-header">
                  <Link
                    to={`/item/${bid.itemId}`}
                    className="bid-item-title"
                  >
                    {bid.itemTitle}
                  </Link>

                  {bid.isWinning ? (
                    <span className="winning-badge">
                      🏆 Лидирую
                    </span>
                  ) : (
                    <span className="outbid-badge">
                      Перебита
                    </span>
                  )}
                </div>

                <div className="bid-item-meta">
                  <span>
                    ⏰ {new Date(
                      bid.createdAt
                    ).toLocaleString("ru-RU")}
                  </span>
                </div>
              </div>

              <div className="bid-item-amount">
                <span className="bid-amount">
                  {formatPrice(bid.amount)}
                </span>

                <span className="bid-status">
                  Моя ставка
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default MyBids
