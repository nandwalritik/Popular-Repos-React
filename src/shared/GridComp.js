import React, { Component } from 'react';
import CardHeader from '@material-ui/core/CardHeader';
import Card from '@material-ui/core/Card';
import Grid   from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import InfoIcon from '@material-ui/icons/Info';
import IconButton from '@material-ui/core/IconButton';
import CardContent from '@material-ui/core/CardContent';
import StarIcon from '@material-ui/icons/Star';
import Typography from '@material-ui/core/Typography';
import HomeIcon from '@material-ui/icons/Home';
import CardMedia from '@material-ui/core/CardMedia';
import Tooltip from '@material-ui/core/Tooltip';
import  CardActions from '@material-ui/core/CardActions';
import Box from '@material-ui/core/Box';
import Skeleton from '@material-ui/lab/Skeleton'
import Loader from 'react-loader-spinner'
import Center from 'react-center';  
import classes from "./theme"


export class GridComp extends Component {
    constructor(props){
        super(props);
        let repos
        if(__isBrowser__){
            repos   = window.__INITIAL_DATA__
            delete  window.__INITIAL_DATA__
        }else{
            repos = this.props.staticContext.data
        }
        this.state={
            repos,
            loading:repos?false:true
        }
        this.fetchRepos = this.fetchRepos.bind(this)

    }
    fetchRepos(lang){
        // window.location.reload(false);

        // console.log("In fetch Repos");
        this.setState(() =>({
            loading:true
        }))
        this.props.fetchInitialData(lang)
        .then((repos) => this.setState(()=>({
            repos,
            loading:false,
        })))

    }
    componentDidMount(){

        if(!this.state.repos){
            this.fetchRepos(this.props.match.params.id)
        }
    }
    componentDidUpdate(prevProps,prevState){
        window.location.reload(false);
        if (prevProps.match.params.id !== this.props.match.params.id) {
            this.fetchRepos(this.props.match.params.id)
          }
    }
    

    render() {
        const {repos, loading} = this.state;
        

        function FormRow(repo) {
            return (
                <React.Fragment>
                <Grid item xs={4}>
                  <div margin={20}>
                  <Card>
                    <CardHeader style={classes.CardHeader}
                       avatar={
                        <Avatar style={classes.large} src={repo.repo.owner.avatar_url}/>
                      }
                      action={
                        <Tooltip title="Github">
                            <IconButton style={classes.iconButton}>
                                <InfoIcon onClick={() => window.open(repo.repo.html_url)}/>
                            </IconButton>
                        </Tooltip>
                      }
                      titleTypographyProps={{variant:'h6' }}
                      title={repo.repo.name}
                      subheader={repo.repo.created_at.substr(0,10)}
                    />
                    <CardMedia
                    />
                    <CardContent style={classes.content}>
                      <Typography variant="body2" color="textSecondary" component="p">
                          {repo.repo.description}
                      </Typography>
                    </CardContent>
                    <CardActions style={classes.CardBottom}>
                        <Tooltip title={`Starred : ${repo.repo.stargazers_count}`}>
                            <IconButton style={classes.iconButton}>
                              <StarIcon />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Homepage">
                            <IconButton style={classes.iconButton}>
                                <HomeIcon onClick={() => window.open(repo.repo.homepage)}/>
                            </IconButton>
                        </Tooltip>
                    </CardActions>
                  </Card>
                  </div>
                </Grid>
              </React.Fragment>
            )
            // return (
            //   (loading?(
            //         <React.Fragment>
            //             <Grid item xs={4}>
            //                 <div margin={20}>
            //                     <Box display="flex" alignItems="center">
            //                         <Box margin={1}>
            //                             <Skeleton variant="circle" width={60} height={60} animation="wave"/>
            //                         </Box>
            //                         <Box>
            //                             <Skeleton variant="text" width={320} animation="wave"/>
            //                             <Skeleton variant="text" width={220} animation="wave"/> 
            //                         </Box>
            //                     </Box>
            //                     <Skeleton variant="rect" width={400} height={150} animation="wave"/>
            //                 </div>
            //             </Grid>
            //         </React.Fragment>
                
            //    ):(
                
            //   ))
            // );
          }

        if(loading===true){
                return    <Center style={{margin:300}}><Loader type="Puff"
                                                              color="#AAAAAA"
                                                              height={100}
                                                              width={100}/>
                                                              </Center>
                
        }
        // console.log(this.props);
        return (
            <div style={classes.mainCon}>
                <Grid container spacing={3} >
                  <Grid container item xs={28} spacing={2}>
                     
                      {repos.map((repo) =>(
                              <FormRow repo={repo}/>
                          ))}
                  </Grid>
                </Grid>
            </div>
                
        )
    }
}
export default GridComp

