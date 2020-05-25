import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
    root: {
      maxWidth: 345,
      maxHeight:400
    },
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
    }
  }));
  
export default function GridStyle() {
    return (
        <div>
            
        </div>
    )
}
