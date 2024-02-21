import PropTypes from 'prop-types'
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
          src="https://c-phnx.ntk-institute.org/assets/newsletter/dg/logos/ntk-logo-only.svg"
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
ArtCard.propTypes = {
  data: PropTypes.shape({
    title: PropTypes.string,
    body: PropTypes.string
  }),
  setLastElement: PropTypes.func
}
export default ArtCard
