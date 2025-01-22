//Nav.js
import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Menu,
  MenuItem,
  Typography,
  Dialog,
  DialogContent,
  DialogTitle,
  Snackbar,
  Button,
  Divider,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';


import AuthComponent from './AuthComponent';
import { getAuth, signOut } from 'firebase/auth';
import { css } from '@emotion/react';
import DarkModeIcon from '@mui/icons-material/DarkMode'; // Icono para el tema oscuro
import LightModeIcon from '@mui/icons-material/LightMode'; // Icono para el tema claro




const styles = {
  dialogPaper: css`
    border-radius: 10px;
    background-color: #fff;
    padding: 16px;
  `,
  dialogTitle: css`
    font-weight: bold;
    color: #1976d2;
  `,
  dialogContent: css`
    display: flex;
    flex-direction: column;
    align-items: center;
  `,
  menuItem: css`
    font-weight: bold;
    color: #000;
  `,
};

const Nav = ({ user, onUserLoggedIn, onUserLoggedOut , toggleTheme , isDarkTheme}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [openLoginPopup, setOpenLoginPopup] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
 

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLoginClick = () => {
    setOpenLoginPopup(true);
    handleMenuClose();
  };

  const handleClosePopup = () => {
    setOpenLoginPopup(false);
  };

  const handleUserLoggedIn = (user) => {
    onUserLoggedIn(user);
    setOpenLoginPopup(false);
    setSnackbarMessage('¡Has iniciado sesión exitosamente!');
    setSnackbarOpen(true);
  };

  const handleLogout = async () => {
    try {
      const auth = getAuth();
      await signOut(auth);
      onUserLoggedOut();
      setSnackbarMessage('Has cerrado sesión.');
      setSnackbarOpen(true);
      handleMenuClose();
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
      setSnackbarMessage('Error al cerrar sesión. Inténtalo de nuevo.');
      setSnackbarOpen(true);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };




  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu" onClick={handleMenuOpen}>
            <MenuIcon />
          </IconButton>
           {/* Aquí va el botón o el icono para cambiar el tema */}
   
          <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
         
            {user ? (
              <>
                <MenuItem css={styles.menuItem} disabled>
                  Bienvenido, {user.displayName || 'Usuario'}
                </MenuItem>
                <Divider />
                <MenuItem css={styles.menuItem} onClick={handleLogout}>
                  Cerrar Sesión
                </MenuItem>
              </>
            ) : (
              <MenuItem css={styles.menuItem} onClick={handleLoginClick}>
                Iniciar Sesión
              </MenuItem>
            )} 


            
           


          </Menu>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            Mi App
          </Typography>
          <IconButton color="inherit" onClick={toggleTheme}>
          {isDarkTheme ? <LightModeIcon /> : <DarkModeIcon />}
      </IconButton>

      

          {user && (
            <Button color="inherit" onClick={handleLogout}>
              Cerrar Sesión
            </Button>
          )}


        </Toolbar>
      </AppBar>

      {/* Popup de inicio de sesión / registro */}
      <Dialog
        open={openLoginPopup}
        onClose={handleClosePopup}
        PaperProps={{ css: styles.dialogPaper }}
      >
        <DialogTitle css={styles.dialogTitle}>
          {user ? `Bienvenido, ${user.displayName}` : 'Iniciar Sesión / Registro'}
        </DialogTitle>
        <DialogContent css={styles.dialogContent}>
          <AuthComponent onUserLoggedIn={handleUserLoggedIn} />
        </DialogContent>
      </Dialog>

      {/* Snackbar para notificación de inicio y cierre de sesión */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
      />
    </>
  );
};

export default Nav;

