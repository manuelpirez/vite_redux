import { useRef, useState, useEffect } from 'react'

import ArtCard from './ArtCard.jsx'
import { useGetFeedMutation } from '@features/content/feedSlice.js'
import { Link } from 'react-router-dom'
import useTracking from '@hooks/tracking/useTracking.js'

const FEED_TOTAL_PAGES = 5
const FEED_AD_INDEX = 2
const AD = {
  type: 'AD',
  title: 'AD Title',
  body: 'AD BODY'
}

const Feed = () => {
  const { trackAction } = useTracking()

  const [getFeed] = useGetFeedMutation()

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
    try {
      setLoading(true)
      let response = await getFeed({ query: 123 })

      trackAction({ action: 'feed', extra: `${pageNum}` })

      if (initial) {
        ;[...response.data.results].splice(FEED_AD_INDEX, 0, AD)
        setInitial(false)
      }

      let all = new Set([...articles, ...response.data.results])
      setArticles([...all])
    } catch (error) {
      console.log({ error })
      alert('Could not load feed :c')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (pageNum <= FEED_TOTAL_PAGES) callFeed()
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      <div className="flexGrow">
        <Link to="/">Home</Link>
      </div>
      <h1>Article Feed</h1>
      <div>
        {articles.length > 0 &&
          articles.map((item, i) => {
            return i === articles.length - 1 &&
              !loading &&
              pageNum <= FEED_TOTAL_PAGES ? (
              <ArtCard
                data={item}
                key={`${item.id}-top${i}`}
                setLastElement={setLastElement}
              />
            ) : (
              <ArtCard data={item} key={`${item.id}-bot${i}`} />
            )
          })}
      </div>
      {loading && <p>Loading...</p>}
      {pageNum - 1 === FEED_TOTAL_PAGES && <p>HELL</p>}
    </div>
  )
}

export default Feed
