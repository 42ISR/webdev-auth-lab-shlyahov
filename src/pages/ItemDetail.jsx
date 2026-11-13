
import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import Input from "../components/Input"
import Button from "../components/Button"
import { api } from "../api/api"
import { useUserStore } from "../store/useUserStore"
import { useItemStore } from "../store/useItemStore"

const ItemDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const session = useUserStore((state) => state.session)
  const getItems = useItemStore((state) => state.getItems)

  const [item, setItem] = useState(null)
  const [bids, setBids] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")
  const [bidError, setBidError] = useState("")
  const [deleteError, setDeleteError] = useState("")
  const [isBidding, setIsBidding] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  // Загрузка товара и истории ставок
  useEffect(() => {
    let cancelled = false

    const loadData = async () => {
      setIsLoading(true)
      setError("")
      setItem(null)
      setBids([])

      try {
        const [itemData, bidsData] = await Promise.all([
          api.getItem(id),
          api.getItemBids(id),
        ])

        if (!cancelled) {
          setItem(itemData)
          setBids(bidsData)
        }
      } catch (err) {
        console.error("Ошибка загрузки:", err)
        if (!cancelled) {
          setError("Не удалось загрузить товар")
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false)
        }
      }
    }

    loadData()

    return () => {
      cancelled = true
    }
  }, [id])

  // Создание ставки
  const handleBid = async (e) => {
    e.preventDefault()
    setBidError("")

    const form = e.currentTarget
    const amount = Number(
      form.elements.namedItem("bidInput").value
    )

    const minimum = (item.highestBid ?? item.price) + 1

    if (!Number.isFinite(amount) || amount < minimum) {
      setBidError(`Минимальная ставка: ${minimum} ₽`)
      return
    }

    try {
      setIsBidding(true)

      await api.createBid({ id, amount })

      form.reset()

      const [updatedItem, updatedBids] = await Promise.all([
        api.getItem(id),
        api.getItemBids(id),
      ])

      setItem(updatedItem)
      setBids(updatedBids)

      await getItems()
    } catch (err) {
      console.error("Ошибка ставки:", err)

      setBidError(
        err.response?.data?.error ||
        err.response?.data?.message ||
        "Не удалось сделать ставку"
      )
    } finally {
      setIsBidding(false)
    }
  }

  // Удаление товара
  const handleDelete = async () => {
    if (!window.confirm("Вы уверены, что хотите удалить товар?")) {
      return
    }

    setDeleteError("")

    try {
      setIsDeleting(true)

      await api.deleteItems(id)
      await getItems()

      navigate("/")
    } catch (err) {
      console.error("Ошибка удаления товара:", err)

      setDeleteError(
        err.response?.data?.error ||
        err.response?.data?.message ||
        "Не удалось удалить товар"
      )
    } finally {
      setIsDeleting(false)
    }
  }

  if (isLoading) {
    return (
      <div className="container">
        Загрузка товара...
      </div>
    )
  }

  if (error) {
    return (
      <div className="container">
        <div className="alert alert-error active">
          {error}
        </div>
      </div>
    )
  }

  if (!item) {
    return (
      <div className="container">
        Товар не найден
      </div>
    )
  }

  // Определяем владельца товара
  const isOwner =
    session?.user?.id != null &&
    String(session.user.id) === String(item.userId)

  const canBid =
    Boolean(session) &&
    !isOwner &&
    item.status === "active"

  return (
    <div className="container">
      <Link to="/">
        ← Вернуться к списку товаров
      </Link>

      <div className="item-detail">
        <div className="item-header">

          {/* Изображение товара */}
          <div>
            {item.imageUrl ? (
              <img
                src={item.imageUrl}
                className="item-image-large"
                alt={item.title}
              />
            ) : (
              <div className="item-image-large">
                Изображение отсутствует
              </div>
            )}
          </div>

          {/* Информация о товаре */}
          <div className="item-info">
            <span className="item-status">
              {item.status === "active"
                ? "Активное"
                : "Неактивное"}
            </span>

            <h1 className="item-title-large">
              {item.title}
            </h1>

            <div className="item-seller-info">
              <div className="seller-avatar">
                {item.username
                  ?.slice(0, 2)
                  .toUpperCase()}
              </div>

              <div className="seller-details">
                <div className="seller-name">
                  {item.username}
                </div>

                <div className="seller-date">
                  {new Date(
                    item.createdAt
                  ).toLocaleString("ru-RU")}
                </div>
              </div>
            </div>

            <div className="item-description-full">
              {item.description}
            </div>

            {/* Цена и ставки */}
            <div className="price-section">
              <div className="starting-price">
                Начальная цена: {item.price} ₽
              </div>

              <div className="current-price">
                {item.highestBid ?? item.price} ₽
              </div>

              <div className="highest-bid">
                Текущая ставка:{" "}
                {item.highestBid == null
                  ? "ставок нет"
                  : `${item.highestBid} ₽`}
              </div>

              {/* Форма ставки */}
              {canBid && (
                <>
                  <form
                    className="bid-form"
                    onSubmit={handleBid}
                  >
                    <Input
                      type="number"
                      name="bidInput"
                      className="bid-input"
                      placeholder="Введите вашу ставку"
                      min={
                        (item.highestBid ?? item.price) + 1
                      }
                      step="1"
                      required
                    />

                    <Button
                      type="submit"
                      className="btn-bid"
                      disabled={isBidding}
                    >
                      {isBidding
                        ? "Отправка..."
                        : "Сделать ставку"}
                    </Button>
                  </form>

                  {bidError && (
                    <div className="alert alert-error active">
                      {bidError}
                    </div>
                  )}
                </>
              )}

              {!session && (
                <p>
                  Чтобы сделать ставку,{" "}
                  <Link to="/login">войдите в аккаунт</Link>.
                </p>
              )}

              {/* Удаление собственного товара */}
              {isOwner && (
                <div className="form-actions">
                  <button
                    type="button"
                    className="btn-delete"
                    onClick={handleDelete}
                    disabled={isDeleting}
                  >
                    {isDeleting
                      ? "Удаление..."
                      : "Удалить товар"}
                  </button>
                </div>
              )}

              {deleteError && (
                <div className="alert alert-error active">
                  {deleteError}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* История ставок */}
        <div className="bids-section">
          <div className="bids-header">
            <h2 className="bids-title">
              История ставок
            </h2>

            <span className="bids-count">
              {bids.length}
            </span>
          </div>

          <div className="bids-list">
            {bids.length === 0 ? (
              <p>На этот товар пока нет ставок</p>
            ) : (
              bids.map((bid, index) => (
                <div
                  key={bid.id}
                  className={
                    index === 0
                      ? "bid-item highest-bid-item"
                      : "bid-item"
                  }
                >
                  <div className="bid-user">
                    <div className="bid-avatar">
                      {bid.username
                        ?.slice(0, 2)
                        .toUpperCase()}
                    </div>

                    <div className="bid-details">
                      <span className="bid-username">
                        {bid.username}
                      </span>

                      <span className="bid-time">
                        {new Date(
                          bid.createdAt
                        ).toLocaleString("ru-RU")}
                      </span>
                    </div>

                    {index === 0 && (
                      <span className="highest-badge">
                        🏆 Лидирует
                      </span>
                    )}
                  </div>

                  <div className="bid-amount">
                    {bid.amount} ₽
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ItemDetail
