import ntk from './ntk.js'
import dg from './dg'
const getTheme = theme => {
  switch (theme) {
    case 'ntk':
      return ntk
    case 'dg':
      return dg
  }
}

export default getTheme
