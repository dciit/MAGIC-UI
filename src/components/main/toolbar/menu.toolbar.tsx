import { Menu, MenuItem, Avatar, Divider, ListItemIcon } from '@mui/material';
import Settings from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
function MenuComponent(props: any) {
    const { open, closeMenu, logout, openMenu } = props;
    return (
        <Menu
            anchorEl={openMenu}
            id="account-menu"
            open={open}
            onClose={closeMenu}
            onClick={closeMenu}
            PaperProps={{
                elevation: 0,
                sx: {
                    overflow: 'visible',
                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                    mt: 1.5,
                    '& .MuiAvatar-root': {
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: 1,
                    },
                    '&:before': {
                        content: '""',
                        display: 'block',
                        position: 'absolute',
                        top: 0,
                        right: 14,
                        width: 10,
                        height: 10,
                        bgcolor: 'background.paper',
                        transform: 'translateY(-50%) rotate(45deg)',
                        zIndex: 0,
                    },
                },
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
            <MenuItem onClick={closeMenu}>
                <Avatar /> Profile
            </MenuItem>
            <MenuItem onClick={closeMenu}>
                <Avatar /> My account
            </MenuItem>
            <Divider />
            <MenuItem onClick={closeMenu}>
                <ListItemIcon>
                    <Settings fontSize="small" />
                </ListItemIcon>
                Settings
            </MenuItem>
            <MenuItem onClick={logout}>
                <ListItemIcon>
                    <LogoutIcon fontSize="small" />
                </ListItemIcon>
                Logout
            </MenuItem>
        </Menu>
    )
}

export default MenuComponent