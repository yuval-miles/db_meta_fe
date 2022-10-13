import { TextField, Stack, Button } from "@mui/material";
import { ChangeEvent, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import axiosClient from "../../utils/axiosClient";
import { useDatabaseStore } from "../../store/useDatabaseStore";

interface Inputs {
  host: string;
  port: string;
  username: string;
  password: string;
  database: string;
}

const isNumber = (input: string) => /^\d*$/.test(input);

const AddDBForm = ({
  setIsDBList,
  setSnackBarOpen,
}: {
  setIsDBList: React.Dispatch<React.SetStateAction<boolean>>;
  setSnackBarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [inputs, setInputs] = useState({
    host: "",
    port: "",
    username: "",
    password: "",
    database: "",
  });
  const { addDatabaseToStore } = useDatabaseStore((state) => ({
    addDatabaseToStore: state.addDatabase,
  }));
  const { mutate: addDatabase } = useMutation<unknown, AxiosError, Inputs>(
    async (data) => (await axiosClient.post("/user/add-database", data)).data,
    {
      onSuccess: () => {
        addDatabaseToStore({
          host: inputs.host,
          port: inputs.port,
          database: inputs.database,
        });
        setIsDBList(true);
        setSnackBarOpen(true);
      },
    }
  );
  const handleChange =
    (field: string) =>
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      if (field === "port" && isNumber(e.target.value))
        setInputs((state) => ({ ...state, port: e.target.value }));
      else if (field !== "port")
        setInputs((state) => ({ ...state, [field]: e.target.value }));
    };
  return (
    <Stack gap={2} padding={"25px"}>
      <TextField
        label="Host"
        value={inputs.host}
        required
        onChange={handleChange("host")}
      />
      <TextField
        label="Port"
        value={inputs.port}
        required
        onChange={handleChange("port")}
      />
      <TextField
        label="Username"
        value={inputs.username}
        required
        onChange={handleChange("username")}
      />
      <TextField
        label="Password"
        value={inputs.password}
        required
        onChange={handleChange("password")}
      />
      <TextField
        label="Database"
        value={inputs.database}
        required
        onChange={handleChange("database")}
      />
      <Button variant="contained" onClick={() => addDatabase(inputs)}>
        Connect
      </Button>
      <Button variant="outlined" onClick={() => setIsDBList(true)}>
        Back to database list
      </Button>
    </Stack>
  );
};

export default AddDBForm;
