import React, { Component } from 'react';
import {Card,CardHeader} from '@material-ui/core';
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

export class GridComp extends Component {
    constructor(props){
        super(props);
        let repos
        if(__isBrowser__){
            repos   = window.__INITIAL_DATA__
            delete  window.__INITIAL_DATA__
        }else{
            repos = props.staticContext.data
        }
        this.state={
            repos,
            loading:repos?false:true
        }
        this.fetchRepos = this.fetchRepos.bind(this)

    }
    fetchRepos(lang){
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
    componentWillReceiveProps(nextProps){
        const {match,fetchInitialData} = this.props
        if(nextProps.match.params.id !== match.params.id){
            this.fetchRepos(nextProps.match.params.id)
        }

    }
   
    render() {
        const {repos, loading} = this.state;

        function FormRow(repo) {
          console.log(repo)
            return (
              <React.Fragment>
                <Grid item xs={4}>
                  <div margin={20}>
                  <Card>
                    <CardHeader style={styles.CardHeader}
                       avatar={
                        <Avatar style={styles.large} src={repo.repo.owner.avatar_url}/>
                      }
                      action={
                        <Tooltip title="Github">
                            <IconButton style={styles.iconButton}>
                              
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
                    <CardContent style={styles.content}>
                      <Typography variant="body2" color="textSecondary" component="p">
                          {repo.repo.description}
                      </Typography>
                    </CardContent>
                    <CardActions style={styles.CardBottom}>
                        <Tooltip title={`Starred : ${repo.repo.stargazers_count}`}>
                            <IconButton style={styles.iconButton}>
                              <StarIcon />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Homepage">
                            <IconButton style={styles.iconButton}>
                                <HomeIcon onClick={() => window.open(repo.repo.homepage)}/>
                            </IconButton>
                        </Tooltip>
                    </CardActions>
                  </Card>
                  </div>
                </Grid>
              </React.Fragment>
            );
          }
        if(loading===true){
            return <h1>Loading....</h1>
        }
        return (
          
                <Grid container spacing={1} style={styles.mainCon}>
                  <Grid container item xs={28} spacing={3}>
                      {repos.map((repo) =>(
                              <FormRow repo={repo}></FormRow>
                          ))}
                  </Grid>
                </Grid>
         
            
        )
    }
}

export default GridComp

const styles={
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
  }
}
