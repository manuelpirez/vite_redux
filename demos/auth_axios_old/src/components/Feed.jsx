import { useRef, useState, useEffect } from 'react'
import useApiRequest from '../hooks/useApiRequest.jsx'
import LinkPage from './LinkPage.jsx'
import useTracking from '../hooks/useTracking.jsx'

const FEED_TOTAL_PAGES = 5
const FEED_AD_INDEX = 2
const RIVER_URL = '/site_river'
const AD = {
  type: 'AD',
  title: 'AD Title',
  body: 'AD BODY'
}

const Feed = () => {
  const apiRequest = useApiRequest()
  const { trackAction } = useTracking()

  const [initial, setInitial] = useState(true)
  const [articles, setArticles] = useState([])

  const [loading, setLoading] = useState(true)
  const [pageNum, setPageNum] = useState(1)
  const [lastElement, setLastElement] = useState(null)

  const observer = useRef(
    new IntersectionObserver(entries => {
      const first = entries[0]
      if (first.isIntersecting) setPageNum(no => no + 1)
    })
  )

  const callFeed = async () => {
    setLoading(true)
    let response = await apiRequest.get(RIVER_URL)

    trackAction({ action: 'feed', extra: `${pageNum}` })

    const newList = response.data.results

    if (initial) {
      newList.splice(FEED_AD_INDEX, 0, AD)
      setInitial(false)
    }

    let all = new Set([...articles, ...response.data.results])
    setArticles([...all])
    setLoading(false)
  }

  useEffect(() => {
    if (pageNum <= FEED_TOTAL_PAGES) callFeed()
  }, [pageNum])

  useEffect(() => {
    const currentElement = lastElement
    const currentObserver = observer.current

    if (currentElement) currentObserver.observe(currentElement)

    return () => {
      if (currentElement) currentObserver.unobserve(currentElement)
    }
  }, [lastElement])

  return (
    <div>
      {!loading && <LinkPage />}
      <h1>Article Feed</h1>
      <div>
        {articles.length > 0 &&
          articles.map((item, i) => {
            return i === articles.length - 1 &&
              !loading &&
              pageNum <= FEED_TOTAL_PAGES ? (
              <ArtCard
                data={item}
                key={`${item.id}-${i}`}
                setLastElement={setLastElement}
              />
            ) : (
              <ArtCard data={item} key={`${item.id}-${i}`} />
            )
          })}
      </div>
      {loading && <p>Loading...</p>}
      {pageNum - 1 === FEED_TOTAL_PAGES && <p>HELL</p>}
    </div>
  )
}

const ArtCard = ({ data, setLastElement }) => {
  return (
    <div
      ref={setLastElement}
      style={{
        border: '2px solid black',
        marginBottom: '20px',
        padding: '10px'
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          borderBottom: '1px solid white',
          marginBottom: '20px'
        }}
      >
        <img
          src="https://staging.c-phnx.ntk-institute.org/assets/newsletter/dg/logos/ntk-logo-only.svg"
          style={{ height: '50px', paddingRight: '10px' }}
          alt="icon"
        />
        <p>{data?.title}</p>
      </div>

      <div>
        <p>{data?.body?.slice(0, 100)}</p>
      </div>
    </div>
  )
}

export default Feed
