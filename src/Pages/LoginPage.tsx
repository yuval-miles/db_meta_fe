import {
  Alert,
  Box,
  Button,
  InputAdornment,
  Paper,
  Snackbar,
  Stack,
  TextField,
} from "@mui/material";
import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useMutation } from "@tanstack/react-query";
import axiosClient from "../utils/axiosClient";
import { AxiosError } from "axios";

const LoginPage = () => {
  const navigate = useNavigate();
  const [snackBarOpen, setSnackBarOpen] = useState(false);
  const [isSignin, setIsSignin] = useState(true);
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
    showPassword: false,
  });
  const { mutate: signin } = useMutation<
    never,
    AxiosError,
    { email: string; password: string }
  >(async (data) => axiosClient.post("/auth/signin", data), {
    onSuccess: () => {
      navigate("/display");
    },
  });
  const { mutate: signup } = useMutation<
    never,
    AxiosError,
    { email: string; password: string }
  >(async (data) => axiosClient.post("/auth/signup", data), {
    onSuccess: () => {
      setSnackBarOpen(true);
      setIsSignin(true);
    },
  });
  const handleChange =
    (field: string) =>
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setInputs((state) => ({ ...state, [field]: e.target.value }));
    };
  const handleSignUp = () => {
    signup({ email: inputs.email, password: inputs.password });
    setInputs({ email: "", password: "", showPassword: false });
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
          isSignin
            ? signin({ email: inputs.email, password: inputs.password })
            : handleSignUp();
        }}
      >
        <Stack gap={2} padding={"25px"}>
          <TextField
            label="Email"
            value={inputs.email}
            required
            onChange={handleChange("email")}
          />
          <TextField
            required
            type={inputs.showPassword ? "text" : "password"}
            label="Password"
            value={inputs.password}
            style={{ minHeight: "80px" }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  {inputs.showPassword ? (
                    <Visibility
                      cursor={"pointer"}
                      onClick={() =>
                        setInputs((state) => ({
                          ...state,
                          showPassword: !state.showPassword,
                        }))
                      }
                    />
                  ) : (
                    <VisibilityOff
                      cursor={"pointer"}
                      onClick={() =>
                        setInputs((state) => ({
                          ...state,
                          showPassword: !state.showPassword,
                        }))
                      }
                    />
                  )}
                </InputAdornment>
              ),
            }}
            onChange={handleChange("password")}
          />
          <Button variant="contained" type="submit">
            {isSignin ? "Sign in" : "Sign up"}
          </Button>
          <Button
            variant="outlined"
            onClick={() => setIsSignin((state) => !state)}
          >
            {isSignin ? "Register" : "Already have an account?"}
          </Button>
        </Stack>
      </Paper>
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
          Account created!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default LoginPage;
