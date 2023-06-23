import './App.css'
import { useDogPhotos } from './hooks/useDogPhotos'

const render = (
  photoURLs: string[],
): Record<'loading' | 'error' | 'success', JSX.Element> => ({
  loading: <h1 data-testid="loader">Loading dog photos app...</h1>,
  error: <h1 data-testid="error">Unexpected error occurred.</h1>,
  success: (
    <section data-testid="success">
      <h1>Chabre - Recruitment task</h1>
      <div>
        {photoURLs.map(photoUrl => (
          <img key={photoUrl} src={photoUrl} />
        ))}
      </div>
    </section>
  ),
})

export const App = () => {
  const { data: photoURLs, status } = useDogPhotos({
    queryTimeout: 500,
    // 🤷‍♂️ You can override threshold and/or replaceStartingIndex 🤷‍♂️
    // queryThreshold: 15,
    // replaceIndex: 2,
  })
  return render(photoURLs)[status]
}
