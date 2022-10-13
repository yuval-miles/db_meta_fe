import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import { useAuth } from "../hooks/useAuth";
import { useState } from "react";
import ManageDBModal from "./ManageDB/ManageDBModal";

const NavBar = () => {
  const { logout } = useAuth();
  const [openDBModal, setOpenDBModal] = useState(false);
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={{ background: "#fcfcfc" }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Button variant="outlined" onClick={() => setOpenDBModal(true)}>
            Manage Databases
          </Button>
          <Button color="primary" variant="contained" onClick={() => logout()}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <ManageDBModal
        openDBModal={openDBModal}
        setOpenDBModal={setOpenDBModal}
      />
    </Box>
  );
};

export default NavBar;
