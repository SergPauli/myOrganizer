import {useState, useCallback } from "react";
export const useHttp = () => {
  const [loading, setLoading] = useState(false) //пишем в стэйт флаг загрузки
  const [error, setError] = useState(null) //пишем в стэйт ошибку
  const hRequest = useCallback(async(url, method = 'GET', body = null, headers = {
    'Content-Type': 'application/json;charset=utf-8'
  }) => {
      setLoading(true) // ставим флаг загрузки
      try {  // браузерный метод фетч
        if (body) {
          body = JSON.stringify(body)
        }
        
        const response = await fetch(url, {method: method, body: body, headers: headers}) //запрос к API
        const data = await response.json() //парсим полученный ответ
        if (!response.ok) { // возникла ошибка, если есть месэдж, выводим его
          throw new Error(data.message || 'Что-то пошло не так..');
        }
        setLoading(false) // снимаем флаг загрузки
        return data
      } catch(e) {
        setLoading(false) // снимаем флаг загрузки
        setError(e.message) // пишем ошибку в стэйт
        throw e // выкидываем ошибку для других компонентов
      }
  }, [])
  const clearError = useCallback(() => setError(null),[])
  return {loading, hRequest, error, clearError}
}
