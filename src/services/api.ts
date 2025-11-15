// src/services/api.ts
const API_BASE_URL = 'https://cinemaguide.skillbox.cc'
// services/api.ts
export interface Movie {
  id: number
  title: string
  plot: string
  relaseYear: number
  genres: string[]
  runtime: number
  tmdbRating: number
  posterUrl: string
  trailerUrl?: string
  backdropUrl: string
  director: string
  cast: string[]
  language: string
  // Добавьте недостающие поля
  budget?: string
  revenue?: string
  original_language?: string
  production_companies?: Array<{ name: string }>
  production_countries?: Array<{ name: string }>
  awards?: string
}
// Убираем интерфейс Genre, так как API возвращает строки
// export interface Genre {
//   id: number
//   name: string
// }

export const apiService = {
  async getTopMovies(): Promise<Movie[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/movie/top10`)

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      console.log('API Response:', data)
      return data
    } catch (error) {
      console.error('Error fetching top movies:', error)
      return []
    }
  },

  async getGenres(): Promise<string[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/movie/genres`)

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      console.log('Genres API Response:', data)
      return data
    } catch (error) {
      console.error('Error fetching genres:', error)
      return []
    }
  },

  async getMovieRandom(): Promise<Movie> {
    try {
      console.log('Отправляем запрос к:', `${API_BASE_URL}/movie/random`)
      const response = await fetch(`${API_BASE_URL}/movie/random`)

      console.log('Статус ответа:', response.status)
      console.log('OK:', response.ok)

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()

      return data
    } catch (error) {
      console.error('❌ Ошибка при загрузке случайного фильма:', error)
      throw error
    }
  },

  async searchMovies(query: string): Promise<Movie[]> {
    try {
      const cleanQuery = query.trim()

      if (!cleanQuery) {
        return []
      }

      const response = await fetch(
        `https://cinemaguide.skillbox.cc/movie?title=${cleanQuery}&count=20`,
      )

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const allMovies = await response.json()

      const filteredByTitle = allMovies.filter((movie: Movie) => {
        const searchLower = cleanQuery.toLowerCase()
        const title = movie.title?.toLowerCase() || ''
        // const originalTitle = movie.original_title?.toLowerCase() || ''

        const titleMatch = title.startsWith(searchLower)
        // const originalTitleMatch = originalTitle.includes(searchLower)
        return titleMatch
      })
      return filteredByTitle.slice(0, 5)
    } catch (error) {
      console.error('Ошибка поиска фильмов:', error)
      return []
    }
  },

  async getMovieById(movieId: number): Promise<Movie> {
    try {
      console.log('Отправляем запрос к:', `${API_BASE_URL}/movie/${movieId}`)
      const response = await fetch(`${API_BASE_URL}/movie/${movieId}`)

      console.log('Статус ответа:', response.status)
      console.log('OK:', response.ok)

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      console.log('✅ Данные фильма получены:', data)

      return data
    } catch (error) {
      console.error(`❌ Ошибка при загрузке фильма ${movieId}:`, error)
      throw error
    }
  },
}
