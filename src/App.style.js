import { makeStyles } from '@material-ui/core/styles'

const AppStyle = makeStyles(theme => ({
  blog:{
    margin:'10px'
  },
  user:{
    fontStyle:'bold',
    fontFamily:'sans-serif'
  },
  button: {
    marginLeft: theme.spacing(5),
    display:'flex'
  },
  root:{
    display:'flex',
    flexDirection:'row',
    margin:theme.spacing(10),

  }


}))

export default AppStyle