import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import {makeStyles} from "@material-ui/core/styles";

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
    buttonColorDay:{
        backgroundColor:"white",
        color:"yellow"
    },
    buttonColorNight:{
        backgroundColor:"black",
        color:"white"
    }


}));


const ButtonAppBar=(props)=> {
    const classes = useStyles();
        const buttonColor=()=>{
            if (Math.round(Math.round(props.LightStatus)) === 1) {
                return <Button style={{
                    backgroundColor:"black",
                    color:"white"

                }}>
                    Night
                    </Button>
            } else {
                return <Button
                               style={{
                                   backgroundColor:"white",

                               }}>
                    Day
                </Button>
            }
        }
        return (
            <div className={classes.root}>
                <AppBar position="static" style={{
                    backgroundColor:"white",
                    color:"black"
                }}>
                    <Toolbar>
                        <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                            <MenuIcon/>
                        </IconButton>
                        <Typography variant="h6" style={{
                            fontFamily:"'Roboto Slab', serif",
                            flex:'1'
                        }}>
                            Weatherie
                        </Typography>
                        {buttonColor()}
                    </Toolbar>
                </AppBar>
            </div>
        );
    }


export default ButtonAppBar;
