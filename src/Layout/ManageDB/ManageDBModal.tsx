import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import DBList from "./DBList";
import { useState } from "react";
import AddDBForm from "./AddDBForm";
import { Alert, Snackbar } from "@mui/material";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "50%",
  height: "500px",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const ManageDBModal = ({
  openDBModal,
  setOpenDBModal,
}: {
  openDBModal: boolean;
  setOpenDBModal: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [isDBList, setIsDBList] = useState(true);
  const [snackBarOpen, setSnackBarOpen] = useState(false);
  return (
    <>
      <Modal open={openDBModal} onClose={() => setOpenDBModal(false)}>
        <Box sx={style}>
          {isDBList ? (
            <DBList setIsDBList={setIsDBList} />
          ) : (
            <AddDBForm
              setIsDBList={setIsDBList}
              setSnackBarOpen={setSnackBarOpen}
            />
          )}
        </Box>
      </Modal>
      <Snackbar
        open={snackBarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackBarOpen(false)}
      >
        <Alert
          onClose={() => setSnackBarOpen(false)}
          severity="success"
          sx={{ width: "100%" }}
        >
          Database Connection saved!
        </Alert>
      </Snackbar>
    </>
  );
};

export default ManageDBModal;
