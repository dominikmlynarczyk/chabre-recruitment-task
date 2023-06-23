import { useQuery } from '@tanstack/react-query'
import { useRef } from 'react'

const COUNT_TO_INDEX_OFFSET = 1

const queryPhoto = async (photoPath: string) => {
  const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/${photoPath}`)
  const data: { message: string; status: string } = await res.json()
  return data.message
}

export const useDogPhotos = ({
  queryThreshold = 9,
  queryTimeout = 3_000,
  replaceIndex = 6,
  photoPath = 'breeds/image/random',
} = {}) => {
  const internalQueryState = useRef({
    queryCount: 0,
    photoURLs: [] as string[],
  })

  const { data: photoURL, ...query } = useQuery({
    queryKey: ['dogPhotoUrls', photoPath],
    queryFn: () => queryPhoto(photoPath),
    refetchInterval: (_, { state: { dataUpdateCount } }) => {
      internalQueryState.current.queryCount = dataUpdateCount
      return dataUpdateCount < queryThreshold ? queryTimeout : false
    },
  })

  const { queryCount, photoURLs } = internalQueryState.current
  const data = !photoURL
    ? internalQueryState.current.photoURLs
    : (() => {
        photoURLs[(queryCount - COUNT_TO_INDEX_OFFSET) % replaceIndex] =
          photoURL
        return photoURLs
      })()

  return {
    data,
    ...query,
  }
}
