import { Button } from '@material-ui/core'
import React from 'react'
import { Link} from 'react-router-dom'
function CheckOut() {
    return (
        <div>
            <Button component={Link} to="/" color="secondary" variant="contained">Go Back</Button>
            <h1>CheckOut Component</h1>
        </div>
    )
}

export default CheckOut
