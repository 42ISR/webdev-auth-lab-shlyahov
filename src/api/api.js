
import axios from "axios"
import { useUserStore } from "../store/useUserStore"

const apiInstance = axios.create({
  baseURL: "https://api.kitek-pg.ru/api/marketplace/",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
})

// Автоматически добавляем токен авторизации
apiInstance.interceptors.request.use((config) => {
  const { session } = useUserStore.getState()

  if (session?.token) {
    config.headers.Authorization = `Bearer ${session.token}`
  }

  return config
})

// Регистрация
const registerUser = async (user) => {
  const res = await apiInstance.post("/auth/register", user)
  return res.data
}

// Вход
const loginUser = async (user) => {
  const res = await apiInstance.post("/auth/login", user)
  return res.data
}

// Получение всех товаров
const getItems = async () => {
  const res = await apiInstance.get("/items")
  return res.data
}

// Получение статистики
const getStats = async () => {
  const res = await apiInstance.get("/stats")
  return res.data
}

// Получение ставок на конкретный товар
const getItemBids = async (id) => {
  const res = await apiInstance.get(`/items/${id}/bids`)
  return res.data
}

// Получение собственных ставок
const getMyBids = async () => {
  const res = await apiInstance.get("/bids/my")
  return res.data
}

// Создание товара
const sendItems = async (item) => {
  const res = await apiInstance.post("/items", item)
  return res.data
}

// Удаление товара
const deleteItems = async (id) => {
  const res = await apiInstance.delete(`/items/${id}`)
  return res.data
}

// Создание ставки
const createBid = async ({ id, amount }) => {
  const res = await apiInstance.post(`/items/${id}/bids`, {
    amount,
  })
  return res.data
}

// Получение одного товара
const getItem = async (id) => {
  const res = await apiInstance.get(`/items/${id}`)
  return res.data
}

// Экспорт функций
export const api = {
  registerUser,
  loginUser,
  getItems,
  getStats,
  getItemBids,
  getMyBids,
  sendItems,
  deleteItems,
  createBid,
  getItem,
}
