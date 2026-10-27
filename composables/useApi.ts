// frontend/composables/useApi.ts
export const useApi = () => {
  const config = useRuntimeConfig()
  const apiBase = config.public.apiBase || 'http://127.0.0.1:8000/api/v1'
  const backendBase = 'http://127.0.0.1:8000'

  const fetchApi = async (endpoint: string) => {
    const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`
    return await useFetch(`${apiBase}${cleanEndpoint}`)
  }

  const getMediaUrl = (path: string | null | undefined) => {
    if (!path) return 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?q=80&w=800'
    
    // Nếu là URL online (Unsplash, Cloudinary, AWS S3...) -> Trả về trực tiếp
    if (path.startsWith('http://') || path.startsWith('https://')) {
      return path
    }

    // Nếu là đường dẫn cục bộ do Django trả về (ví dụ: /media/drawings/abc.pdf)
    const cleanPath = path.startsWith('/') ? path : `/${path}`
    return `${backendBase}${cleanPath}`
  }

  return { fetchApi, getMediaUrl, apiBase }
}