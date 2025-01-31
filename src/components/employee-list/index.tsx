"use client";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MailIcon from "@mui/icons-material/Mail";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useContext } from "react";
import { isMobileAction, menuClickAction } from "../../state/actions";
import { AppContext } from "../../state";
import { StyledList, StyledImage, Overlay } from "./style";
import ListEmployee from "../../pages/EmployeeList";
import RegisterUser from "../../pages/RegisterAdm";
import SendLink from "../../pages/SendLink";
import { Outlet } from "react-router-dom";
import SendList from "../../pages/SendList/index";
import LogoProtect from '../../assets/images/logoProtect.png';
import { Link, useNavigate, Navigate } from 'react-router-dom'
import { IUser } from "../../interfaces";


const drawerWidth = 240;

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
}

export default function ResponsiveDrawer(props: Props) {
  const { window } = props;
  const { state, dispatch } = useContext(AppContext);
  const { isMobile, clickMenu } = state;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [handlePages, setHandlePages] = React.useState(0);
  const [storedUser, setStoredUser] = React.useState<IUser | null>()
  const navigate = useNavigate();
  console.log(state.userType)

 /* React.useEffect(() => {
    const storedUserString = JSON.parse(localStorage.getItem('user') ?? '');
    setStoredUser(storedUserString)
  }, []) */

  const handleDrawerToggle = () => {
    isMobileAction(!isMobile, dispatch);
  };

  const handleMenus = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleMenu = (index: number) => {
    menuClickAction(index, dispatch);
  };

  const handlePageMenu = (index: number) => {
    setHandlePages(index);
  };



  const RenderPage = () => {

    const truest = state.userType


   if (truest != '') {
      if (truest == 'Admin' ) {
        if (handlePages == 1) {
          return <SendLink />;
        }

        if (handlePages == 0) {
          return <ListEmployee />;
        }

        if (handlePages == 2) {
          return null;
        }

        if (handlePages == 3) {
          return <Navigate to="/" replace={true} />
        }

        return null;
      } else if (truest == 'Client') {
        if (handlePages == 0) {
          return <SendList />;
        }

        if (handlePages == 1) {
          return null
        }

        if (handlePages == 2) {
          return <Navigate to="/" replace={true} />
        }
        return null;
      }
    } return null

  };

  let drawer;

  if (storedUser && storedUser.role  == "Admin") {
    drawer = (
      // Coloque aqui o código para o caso de userType igual a "Admin"
      <div>
        <Toolbar style={{ overflow: "hidden" }} />
        <Divider style={{ overflow: "hidden" }} />
        <StyledList color="secondary" style={{ overflow: "hidden" }}>
          {[
            "Clientes",
            "Gerar Link",
            "Dados Estatístico",
            "Sair"
          ].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton
                color="secondary"
                onClick={() => handlePageMenu(index)}
              >
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </StyledList>
      </div>
    );
  } else {
    drawer = (
      // Coloque aqui o código para o caso de userType diferente de "Admin"
      <div>
        <Toolbar style={{ overflow: "hidden" }} />
        <Divider style={{ overflow: "hidden" }} />
        <StyledList color="secondary" style={{ overflow: "hidden" }}>
          {["Listas Funcionário", "Dados Estatístico", "Sair"].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton
                color="secondary"
                onClick={() => handlePageMenu(index)}
              >
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </StyledList>
      </div>
    );
  }

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex", overflow: "hidden" }}>
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          overflow: "hidden",
          backgroundImage:
            `url(${LogoProtect}), url(${LogoProtect})`,
          backgroundSize: "50% auto, 50% auto", // Dividindo em 50% cada imagem
          backgroundRepeat: "no-repeat",
          backgroundPosition: "left, right", // Posicionando as imagens
        }}
      >
        <Overlay />
        <Toolbar>
          <IconButton
            color="secondary"
            aria-label="open drawer"
            edge="start"
            onClick={handleMenus}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            flexDirection="row"
            color="white"
            variant="h6"
            noWrap
            component="div"
          >
            PROTECT RISK
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{
          width: { sm: drawerWidth },
          overflow: "hidden",
          flexShrink: { sm: 0 },
        }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          color="primary"
          open={mobileOpen}
          onClose={handleMenus}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
            overflow: "hidden",
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
            overflow: "hidden",
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>

      <RenderPage />

      <Outlet />
    </Box>
  );
}
