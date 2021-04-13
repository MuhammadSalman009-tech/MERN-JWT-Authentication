import { Button } from '@material-ui/core'
import React,{useEffect} from 'react'
import { Link, useHistory} from 'react-router-dom'
function CheckOut() {
    const history = useHistory();
    useEffect(() => {
        const user=JSON.parse(localStorage.getItem("profile"));
        if(user===null){
            history.push("/signin");
        } 
    },[]);
    return (
        <div>
            <Button component={Link} to="/" color="secondary" variant="contained">Go Back</Button>
            <h1>CheckOut Component</h1>
        </div>
    )
}

export default CheckOut
