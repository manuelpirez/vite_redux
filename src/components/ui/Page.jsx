import PropTypes from 'prop-types'

/**
 * Renders a UI container
 * @param props
 * @param props.children
 * @param props.subHeader
 * @param props.showHero
 * @param props.specialContainer
 * @param props.showHeader
 * @param props.showFooter
 * @param props.withoutWrap
 * @param props.isFeed
 * @returns {JSX.Element}
 * @constructor
 */
const Page = ({
  children,
  subHeader,
  showHero = false,
  specialContainer = false,
  showHeader = true,
  showFooter = true,
  withoutWrap = false,
  isFeed = false
}) => {
  console.log({
    subHeader,
    showHero,
    specialContainer,
    showHeader,
    showFooter,
    withoutWrap,
    isFeed
  })
  return <div>{children}</div>
}
export default Page

Page.propTypes = {
  specialContainer: PropTypes.bool,
  children: PropTypes.node.isRequired,
  headerClassName: PropTypes.string,
  title: PropTypes.string,
  subHeader: PropTypes.string,
  showHero: PropTypes.bool,
  showHeader: PropTypes.bool,
  showFooter: PropTypes.bool,
  withoutWrap: PropTypes.bool,
  isFeed: PropTypes.bool
}
