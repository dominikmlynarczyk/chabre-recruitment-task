import { renderHook, waitFor } from '@testing-library/react'
import { useDogPhotos } from './useDogPhotos'
import { vi } from 'vitest'
import { createWrapper } from '../utils/test.utils'

describe('useDogPhotos - hook', () => {
  beforeEach(() => {
    fetchMock.resetMocks()
    vi.useFakeTimers({ shouldAdvanceTime: true })
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should aggregate all query results into list', async () => {
    // Arrange
    const MOCK_IMAGES_COUNT = 9
    const MOCK_TIMEOUT = 100
    const MOCK_API_PATH = 'mock/photos'
    const MOCK_RESPONSE = Array.from(
      { length: 9 },
      (_, i): [string, { status: number }] => [
        JSON.stringify({
          message: `${import.meta.env.VITE_API_BASE_URL}/${MOCK_API_PATH}/${
            i + 1
          }`,
          status: 'success',
        }),
        { status: 200 },
      ],
    )
    fetchMock.mockResponses(...MOCK_RESPONSE)

    const { result } = renderHook(
      () =>
        useDogPhotos({ photoPath: MOCK_API_PATH, queryTimeout: MOCK_TIMEOUT }),
      {
        wrapper: createWrapper(),
      },
    )

    // Assert
    await waitFor(async () => {
      await vi.advanceTimersByTimeAsync(MOCK_IMAGES_COUNT * MOCK_TIMEOUT)
      expect(fetch).toHaveBeenCalledWith(
        `${import.meta.env.VITE_API_BASE_URL}/${MOCK_API_PATH}`,
      )
      expect(result.current.isSuccess).toBe(true)
      expect(result.current.data).toEqual([
        'https://dog.ceo/api/mock/photos/7',
        'https://dog.ceo/api/mock/photos/8',
        'https://dog.ceo/api/mock/photos/9',
        'https://dog.ceo/api/mock/photos/4',
        'https://dog.ceo/api/mock/photos/5',
        'https://dog.ceo/api/mock/photos/6',
      ])
    })
  })
})
