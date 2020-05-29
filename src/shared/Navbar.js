import React from 'react'
import styles from '../../theme'
import Tab from '@material-ui/core/Tab'
import Tabs from '@material-ui/core/Tabs'
import AppBar from '@material-ui/core/AppBar'
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
            <AppBar position='fixed' style={styles.navbarStyle}>
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
