import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import AccountAvatar from "./Avatar.jsx";
import {Link, useNavigate} from "react-router-dom";
import useAccount from "../hooks/useAccount.jsx";
import useAuthFeatures from "../hooks/useAuthFeatures.jsx";

export default function AccountMenu() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const account = useAccount()
    const { logout } = useAuthFeatures()
    const navigate = useNavigate()

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        handleClose()
        logout()
        navigate("/")
    }

    return (
        <div className="hidden md:flex items-center justify-center">
            <Button
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                style={{
                    backgroundColor: "inherit",
                    position: "relative"
                }}
                disableTouchRipple
            >
                <AccountAvatar/>
            </Button>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
                style={{
                    top: "6px"
                }}
            >
                <MenuItem onClick={handleClose} >
                    <Link to="/account">
                        Thông tin tài khoản
                    </Link>
                </MenuItem>
                <MenuItem onClick={handleLogout}>
                    Đăng xuất
                </MenuItem>
            </Menu>
        </div>
    );
}