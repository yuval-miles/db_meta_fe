import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import { useAuth } from "../hooks/useAuth";
import { useState } from "react";
import ManageDBModal from "./ManageDB/ManageDBModal";
import { useMutation } from "@tanstack/react-query";
import axiosClient from "../utils/axiosClient";
import { useDatabaseStore, DatabaseInfo } from "../store/useDatabaseStore";
import { AxiosError } from "axios";

const NavBar = () => {
  const { logout } = useAuth();
  const { selectedDb } = useDatabaseStore((state) => ({
    selectedDb: state.databaseStore.selectedDatabase,
  }));
  const { mutate } = useMutation<any, AxiosError, DatabaseInfo>(
    async () =>
      (await axiosClient.post("/database/compare-erd", { id: selectedDb!.id }))
        .data,
    {
      onSuccess: (data) => {
        console.log(data);
      },
    }
  );
  const [openDBModal, setOpenDBModal] = useState(false);
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={{ background: "#fcfcfc" }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Button variant="outlined" onClick={() => setOpenDBModal(true)}>
            Manage Databases
          </Button>
          <Button onClick={() => mutate(selectedDb)}>test</Button>
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
