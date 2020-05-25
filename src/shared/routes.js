import Home from './Home'
import GridComp from './GridComp'
import { fetchPopularRepos } from './api'
const routes = [
    {
        path:'/',
        exact:true,
        component:Home,
    },
    {
        path:'/popular/:id',
        component:GridComp, 
        fetchInitialData:( path = '') => fetchPopularRepos(path.split('/').pop())
    }
]

export default routes