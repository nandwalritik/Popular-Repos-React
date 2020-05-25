import React from 'react'

import {AppBar,Tabs,Tab} from '@material-ui/core'
import { Link } from 'react-router-dom'

export default function Navbar(){
    const languages=[
        {
            name:'All',
            param:'all'
        },{
            name:'JavaScript',
            param:'javascript'
        },{
            name:'Ruby',
            param:'ruby'
        },{
            name:'Python',
            param:'python'
        },{
            name:'Java',
            param:'java'
        }
    ]

    const [value, setValue] = React.useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    
return(
        
        <div>
            <AppBar position='static'>
                <Tabs  value={value} onChange={handleChange} centered>
                {languages.map(({name,param})=>(
                        <Tab key={name} 
                             label={name}
                             className
                             component={Link} 
                             to={`/popular/${param}`}
                             selected={true}/>
            ))}
                </Tabs>
            
            </AppBar>
            
        </div>

)}
