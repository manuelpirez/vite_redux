import ntk from './ntk'
import dg from './dg'
// TODO check dynamic theme
const getTheme = theme => {
  switch (theme) {
    case 'ntk':
      return ntk
    case 'dg':
      return dg
  }
}

export default getTheme
