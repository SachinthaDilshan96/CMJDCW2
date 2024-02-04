import "./CSS/SideDrawer.css"
import HomeIcon from '@mui/icons-material/Home';
import CategoryIcon from '@mui/icons-material/Category';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import MenuIcon from '@mui/icons-material/Menu';
import {NavLink, useNavigate} from "react-router-dom";
import {useState} from "react";
import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Drawer} from "@mui/material";
import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import PersonIcon from '@mui/icons-material/Person';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import InventoryIcon from '@mui/icons-material/Inventory';
import AssessmentIcon from '@mui/icons-material/Assessment';
import Menu from "@mui/material/Menu";
import Button from "@mui/material/Button";


DialogContent.propTypes = {children: PropTypes.node};
export const SideDrawer = (props) => {
    const drawerWidth = 200;
    const sidebarData = [
        {   path:"",
            title:"Home",
            icon:<HomeIcon/>
        }, {path:"categories",
            title:"Categories",
            icon:<CategoryIcon/>
        }, {path:"inventory",
            title:"Inventory",
            icon:<InventoryIcon/>
        }, {
            path:"products",
            title:"Products",
            icon:<AddShoppingCartIcon/>
        },{
            path:"reports",
            title:"Reports",
            icon:<AssessmentIcon/>
        },
    ];

    const { window } = props;
    const [mobileOpen, setMobileOpen] = useState(false);
    const [isClosing, setIsClosing] = useState(false);
    const [navbarTitle, setNavBarTitle] = useState("Home");
    const [anchorElNav, setAnchorElNav] = useState(null);
    const [openLogoutModal , setOpenLogoutModal]  = useState(false);

    const handleLogoutModalClose =()=>{
        setOpenLogoutModal(!openLogoutModal);
    }

    const handleDrawerClose = () => {
        setIsClosing(true);
        setMobileOpen(false);
    };

    const handleDrawerTransitionEnd = () => {
        setIsClosing(false);
    };

    const handleDrawerToggle = () => {
        if (!isClosing) {
            setMobileOpen(!mobileOpen);
        }
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const navigation = useNavigate();
    const handleNavigation =(element)=>{
        setNavBarTitle(element.title);
        navigation(element.path);
    }

    const handleLogout =()=>{
        localStorage.removeItem("cmjd_pos_token");
        navigation("/login");
    }

    const drawer = (
        <div>
            <Toolbar />
            <Divider />
            <List>
                {sidebarData.map((item, index) => (
                    <ListItem key={index} disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                {item.icon}
                            </ListItemIcon>
                            <ListItemText primary={item.title} onClick={e=>handleNavigation(item)} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            <Divider />
        </div>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <Box sx={{ display: 'flex' }}>
            <AppBar
                position="fixed"
                sx={{
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    ml: { sm: `${drawerWidth}px` },
                }}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none',md:"flex" } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div">
                        Dashboard - {navbarTitle}
                    </Typography>
                    <Button style={{marginLeft:'20px',backgroundColor:'#033dfc',}} variant={"contained"} onClick={e=>setOpenLogoutModal(!openLogoutModal)}>Logout</Button>
                    <Dialog
                        open={openLogoutModal}
                        onClose={handleLogoutModalClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title">
                            {"Logout"}
                        </DialogTitle>
                        <DialogContent style={{width:'350px'}}>
                            <DialogContentText id="alert-dialog-description">
                                Are you sure?
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button variant={"contained"} color={"error"} onClick={handleLogoutModalClose}>Cancel</Button>
                            <Button variant={"contained"} onClick={handleLogout} autoFocus>
                                Logout
                            </Button>
                        </DialogActions>
                    </Dialog>
                </Toolbar>
            </AppBar>
            <Box
                component="nav"
                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                aria-label="mailbox folders"
            >
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onTransitionEnd={handleDrawerTransitionEnd}
                    onClose={handleDrawerClose}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {drawer}
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', sm: 'block' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                    open
                >
                    {drawer}
                </Drawer>
            </Box>
        </Box>
    )
}

export default SideDrawer;
