
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import Input from "./Input"
import { api } from "../api/api"
import { useItemStore } from "../store/useItemStore"

const CreateItem = () => {
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [imageUrl, setImageUrl] = useState("")

  const navigate = useNavigate()
  const getItems = useItemStore((state) => state.getItems)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")

    const form = e.currentTarget

    const item = {
      title: form.elements.namedItem("title").value.trim(),
      description: form.elements.namedItem("description").value.trim(),
      price: Number(form.elements.namedItem("price").value),
    }

    const image = form.elements.namedItem("imageUrl").value.trim()
    if (image) item.imageUrl = image

    try {
      setIsLoading(true)
      await api.sendItems(item)
      await getItems()
      navigate("/")
    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Не удалось создать товар"
      )
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container">
      <div className="page-header">
        <h1>Создать новый товар</h1>
      </div>

      <div className="form-container">
        {error && (
          <div className="alert alert-error active">
            {error}
          </div>
        )}

        <form id="create-item-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">
              Название товара <span className="required">*</span>
            </label>
            <Input
              type="text"
              className="form-input"
              name="title"
              placeholder="Например: iPhone 14 Pro 256GB"
              maxLength={100}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <div className="char-counter">
              {title.length} / 100
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">
              Описание <span className="required">*</span>
            </label>
            <textarea
              className="form-textarea"
              name="description"
              placeholder="Подробно опишите товар, его состояние, характеристики..."
              maxLength={1000}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
            <div className="char-counter">
              {description.length} / 1000
            </div>
            <div className="form-hint">
              Чем подробнее описание, тем больше шансов продать товар
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">
              Начальная цена <span className="required">*</span>
            </label>
            <div className="input-group">
              <Input
                type="number"
                className="form-input with-prefix"
                name="price"
                placeholder="5000"
                min="1"
                step="any"
                required
              />
              <span className="input-prefix">₽</span>
            </div>
            <div className="form-hint">
              Укажите минимальную цену, с которой начнутся торги
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">
              URL изображения
            </label>
            <Input
              type="url"
              className="form-input"
              name="imageUrl"
              placeholder="https://example.com/image.jpg"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
            />
            <div className="form-hint">
              Вставьте ссылку на изображение товара (опционально)
            </div>
            {imageUrl && (
              <div className="image-preview active">
                <img src={imageUrl} alt="Предпросмотр" />
              </div>
            )}
          </div>

          <div className="form-actions">
            <Link to="/" className="btn-cancel">
              Отмена
            </Link>
            <button
              type="submit"
              className="btn-submit"
              disabled={isLoading}
            >
              {isLoading ? "Создание..." : "Создать товар"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreateItem
