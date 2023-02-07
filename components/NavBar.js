import React from 'react';
import Link from 'next/link'
import {
    AppBar,
    Button,
    Divider,
    Drawer,
    Hidden,
    IconButton,
    List, ListItem,
    ListItemText,
    makeStyles,
    Toolbar
} from "@mui/material";

const navList = [
    {
        name: "Home",
        path: "/"
    },
    {
        name: "Schedule",
        path: "/schedule"
    },
    {
        name: "About Us",
        path: "/aboutus"
    },
    {
        name: "Projects",
        path: "/projects"
    },
    {
        name: "Contact",
        path: "/contact"
    },
]

const drawerWidth = 240;

// const useStyles = makeStyles((theme) => ({
//     drawerPaper: {
//         width: drawerWidth,
//     },
// }));

const NavBar = () => {
    // const classes = useStyles();

    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const drawer = (
        <div>
            <Toolbar
                style={{ backgroundColor: "#222220" }}
            >
            </Toolbar>
            <Divider/>
            <List>
                {navList.map((navItem, index) => (
                    <Link href={navItem.path} key={navItem.path}>
                        <ListItem button>
                            <ListItemText primary={navItem.name}/>
                        </ListItem>
                    </Link>
                ))}
            </List>
        </div>
    );

    return (
        <div>
            <AppBar position="static">
                <Toolbar>
                    <img src="gt-webdev-logo.png" alt="GT WebDev" height="35" />
                    <Hidden smDown>
                        {navList.map((navItem, index) => (
                            <Button color="inherit" href={navItem.path} key={navItem.path}>
                                {navItem.name}
                            </Button>
                        ))}
                    </Hidden>
                    <Hidden mdUp>
                    <IconButton
                        size="large"
                        aria-label="menu button"
                        onClick={handleDrawerToggle}
                        color="inherit"
                        style={{ marginLeft: "auto" }}
                    >
                        {/*<MenuIcon/>*/}
                    </IconButton>
                    </Hidden>
                </Toolbar>
            </AppBar>
            <Drawer
                variant="temporary"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                classes={{
                    paper: {
                        width: drawerWidth
                    },
                }}
                ModalProps={{
                    keepMounted: true, // Better open performance on mobile.
                }}
            >
                {drawer}
            </Drawer>
        </div>
    );
}

export default NavBar;
