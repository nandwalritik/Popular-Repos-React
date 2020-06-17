import React from 'react'
import Center from 'react-center';
import Typography from '@material-ui/core/Typography';
import Grid   from '@material-ui/core/Grid';
import styles from './theme'
export default function Home (){

    return(
        <Grid  justify="center" alignItems="center" style = {styles.home}>

            <Typography variant="body2" color="textSecondary">
                 Material UI + REACT + SERVER Side Rendering 
            </Typography>
            <Typography variant="body2" color="textSecondary">
                    Server-side rendering (SSR), is the ability of an application to contribute by displaying the web-page on the server instead of rendering it in the browser. Server-side sends a fully rendered page to the client; the client’s JavaScript bundle takes over and allows the SPA framework to operate. There is also client-side rendering which slows down the procedure of viewing and interacting with the web page.
                    Advantages of using server-side rendering
                    It enables pages to load faster which provides a better user experience.
                    It plays an important role in SEO (search engine optimization) and correctly indexes webpages. This happens because Google favors web pages with faster load time.
                    It provides body to the HTML pages for all server ships.
                    It assists with​ loading the page when the user has a​ slow internet connection.
                    It assists in loading the page when the user has an outdated device.
            </Typography>
        
        </Grid>        
    )
}