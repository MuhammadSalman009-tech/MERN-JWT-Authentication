import React,{useState,useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import {Link, useLocation} from "react-router-dom";
import {useDispatch} from "react-redux"

//material-ui navbar styles
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  signin:{
      marginRight:'10px'
  }
}));
function Navbar() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const location=useLocation();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const logout=()=>{
    dispatch({type:"LOGOUT"});
    setUser(null);
  }
  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("profile")));
  },[location])
  return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              News
            </Typography>
            {user?
              <React.Fragment>
                <span className={classes.signin}>{user?.result.name}</span>
                <Button variant="contained" color="secondary" onClick={logout}>logout</Button>
              </React.Fragment>
              :
              <React.Fragment>
                <Button variant="contained" className={classes.signin} component={Link} to="/signin">Sign In</Button>
                <Button variant="contained" color="secondary" component={Link} to="/signup">Sign Up</Button>
              </React.Fragment>}
            </Toolbar>
        </AppBar>
      </div>
    );
}

export default Navbar
