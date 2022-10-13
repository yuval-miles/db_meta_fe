import { Box, Paper, TextField, Stack, Button } from "@mui/material";
import { ChangeEvent, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";
import axiosClient from "../utils/axiosClient";

interface Inputs {
  host: string;
  port: string;
  username: string;
  password: string;
  database: string;
}

const isNumber = (input: string) => /^\d*$/.test(input);

const ConnectDBPage = () => {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    host: "",
    port: "",
    username: "",
    password: "",
    database: "",
  });
  const { mutate: connectToDB } = useMutation<unknown, AxiosError, Inputs>(
    async (data) => (await axiosClient.post("/db/connect", data)).data,
    {
      onSuccess: () => {
        navigate("/display");
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
    <Box
      sx={{
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Paper
        component={"form"}
        onSubmit={(e) => {
          e.preventDefault();
          connectToDB(inputs);
        }}
      >
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
          <Button variant="contained" type="submit">
            Connect
          </Button>
        </Stack>
      </Paper>
    </Box>
  );
};

export default ConnectDBPage;
