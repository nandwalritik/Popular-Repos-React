import { createMuiTheme } from '@material-ui/core/styles'
const theme = createMuiTheme({
        CardHeader:{
          background: 'linear-gradient(to left, #283048, #859398) !important'
        },
        CardBottom:{
          background: 'linear-gradient(to top, #8e9eab, #eef2f3) !important'
        },
        content:{
          background: 'linear-gradient(to left, #ece9e6, #ffffff !important'
        },
        mainCon:{
          marginTop:65
        },
        iconButton:{
          color: 'black !important'
        },
        large:{
          width:60,
          height:60
        },
        font:{
          fontSize:'1em'
        },
        navbarStyle:{
          background: 'linear-gradient(to right, #fc354c, #0abfbc) !important',
          marginBottom: 10,
          padding:7
      }
  });
  export default theme;