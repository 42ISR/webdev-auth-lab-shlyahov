
import { useEffect, useState } from "react"
import ItemCard from "../components/ItemCard"
import { useItemStore } from "../store/useItemStore"
import { api } from "../api/api"

const ItemsList = () => {
  // Получаем товары и функцию загрузки из Zustand
  const items = useItemStore((state) => state.items)
  const getItems = useItemStore((state) => state.getItems)

  // Храним статистику маркетплейса
  const [stats, setStats] = useState(null)

  // Загружаем товары и статистику при открытии страницы
  useEffect(() => {
    const loadData = async () => {
      try {
        await getItems()

        const data = await api.getStats()
        setStats(data)
      } catch (error) {
        console.error("Ошибка загрузки данных:", error)
      }
    }

    loadData()
  }, [getItems])

  return (
    <div className="container">
      <div className="page-header">
        <h1>Все товары</h1>
      </div>

      <div className="stats">
        <div className="stat-item">
          <span className="stat-value">
            {stats?.totalItems ?? 0}
          </span>
          <span className="stat-label">Товаров</span>
        </div>

        <div className="stat-item">
          <span className="stat-value">
            {stats?.totalBids ?? 0}
          </span>
          <span className="stat-label">Ставок</span>
        </div>

        <div className="stat-item">
          <span className="stat-value">
            {stats?.activeItems ?? 0}
          </span>
          <span className="stat-label">Активных</span>
        </div>

        <div className="stat-item">
          <span className="stat-value">
            {stats?.averageItemPrice ?? 0} ₽
          </span>
          <span className="stat-label">Средняя цена</span>
        </div>
      </div>

      <div className="items-grid">
        {Array.isArray(items) && items.length > 0 ? (
          items.map((item) => (
            <ItemCard
              key={item.id}
              {...item}
            />
          ))
        ) : (
          <p>Товаров пока нет</p>
        )}
      </div>
    </div>
  )
}

export default ItemsList
