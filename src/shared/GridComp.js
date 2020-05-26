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
            return (
              <React.Fragment>
                <Grid item xs={4}>
                  <div margin={20}>
                  <Card>
                    <CardHeader
                       avatar={
                        <Avatar src={repo.repo.owner.avatar_url}/>
                      }
                      action={
                        <Tooltip title="Github">
                            <IconButton>
                            <a href={repo.repo.html_url} target="_blank">
                               <InfoIcon />
                            </a>  
                        </IconButton>
                        </Tooltip>
                        
                      }
                      title={repo.repo.name}
                      subheader={repo.repo.created_at.substr(0,10)}
                      
                    />
                    <CardMedia
                      src="https://images.unsplash.com/photo-1495567720989-cebdbdd97913?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
                    />
                    <CardContent>
                      <Typography variant="body2" color="textSecondary" component="p">
                          {repo.repo.description}
                      </Typography>
                    </CardContent>
                    <Tooltip title={`Starred : ${repo.repo.stargazers_count}`}>
                      <IconButton>
                        <StarIcon/>
                      </IconButton>
                    </Tooltip>
                    
                    <Tooltip title="Homepage">
                        <IconButton>
                          <a href={repo.repo.homepage} target="_blank">
                            <HomeIcon/>
                          </a>
                        </IconButton>
                    </Tooltip>
                    
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
            <Grid container spacing={1}>
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
