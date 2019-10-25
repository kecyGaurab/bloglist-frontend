import {makeStyles} from '@material-ui/core/styles'

const useStylesBlog = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3, 2),
    margin: 0,
    height: '2em',
  },

  blog: {
    marginTop:'15px',
    marginBottom:'15px'
  },
}))

export default {useStylesBlog}
