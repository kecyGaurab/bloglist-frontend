import { makeStyles } from '@material-ui/core/styles'
import 'typeface-roboto'

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection:'column',
  },
  textField: {
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    width: 100,
    height: 5
  },
  dense: {
    marginTop: 10,
  },
  menu: {
    width: 200,
  },
  form:{
    display:'flex'
  },
  login:{
    fontFamily:'Staatliches',
  }
}))




export default useStyles