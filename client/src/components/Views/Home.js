import { Button } from '@material-ui/core'
import React from 'react'
import { Link} from 'react-router-dom'

function Home() {
    
    return (
        <div>
            <h1>Home Component</h1>
            <Button component={Link} to="/checkout" color="secondary" variant="contained">Go to CheckOut</Button>
        </div>
    )
}

export default Home
