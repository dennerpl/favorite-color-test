"use client";
import * as React from "react";
import {
  Button,
  FormControl,
  InputLabel,
  OutlinedInput,
  TextField,
  InputAdornment,
  Link,
  IconButton,
} from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { AppProvider } from "@toolpad/core/AppProvider";
import { SignInPage } from "@toolpad/core/SignInPage";
import { useTheme } from "@mui/material/styles";
import type { Session } from "@toolpad/core/AppProvider";
import { useNavigate } from "react-router-dom";
import { useSession } from "../SessionContext";
import { ApiService } from "../api/api-service";

const providers = [{ id: "credentials", name: "Email and Password" }];

function CustomEmailField() {
  return (
    <TextField
      id="input-with-icon-textfield"
      label="Email"
      name="email"
      type="email"
      size="small"
      required
      fullWidth
      slotProps={{
        input: {
          startAdornment: (
            <InputAdornment position="start">
              <AccountCircle fontSize="inherit" />
            </InputAdornment>
          ),
        },
      }}
      variant="outlined"
    />
  );
}

function CustomPasswordField() {
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent) => {
    event.preventDefault();
  };

  return (
    <FormControl sx={{ my: 2 }} fullWidth variant="outlined">
      <InputLabel size="small" htmlFor="outlined-adornment-password">
        Password
      </InputLabel>
      <OutlinedInput
        id="outlined-adornment-password"
        type={showPassword ? "text" : "password"}
        name="password"
        size="small"
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              edge="end"
              size="small"
            >
              {showPassword ? (
                <VisibilityOff fontSize="inherit" />
              ) : (
                <Visibility fontSize="inherit" />
              )}
            </IconButton>
          </InputAdornment>
        }
        label="Password"
      />
    </FormControl>
  );
}

function CustomButton() {
  return (
    <Button
      type="submit"
      variant="outlined"
      color="info"
      size="small"
      disableElevation
      fullWidth
      sx={{ my: 2 }}
    >
      Entrar
    </Button>
  );
}

function SignUpLink() {
  return (
    <Link href="/sign-up" variant="body2">
      Criar conta
    </Link>
  );
}

function ForgotPasswordLink() {
  return (
    <Link href="/" variant="body2">
      Esqueceu a senha?
    </Link>
  );
}

function Title() {
  return <h2 style={{ marginBottom: 8 }}>Login</h2>;
}

function Subtitle() {
  return <h4 style={{ marginBottom: 8 }}>Seja bem vindo(a)</h4>;
}

export default function SignIn() {
  const theme = useTheme();
  const { setSession } = useSession();
  const navigate = useNavigate();
  const getSession = async (formData: any): Promise<Session> => {
    return ApiService.update("/auth/login", {
      email: formData.get("email"),
      password: formData.get("password"),
    })
      .then((response) => {
        localStorage.setItem("favorite-color-token", response.data.token);
        return {
          user: {
            ...response.data,
          },
        };
      })
      .catch((error) => {
        console.error(error);
        throw new Error("E-mail ou senha inválida");
      });
  };
  return (
    <AppProvider theme={theme}>
      <SignInPage
        signIn={async (provider, formData, callbackUrl) => {
          try {
            const session = await getSession(formData);
            if (session) {
              setSession(session);
              navigate(callbackUrl || "/", { replace: true });
              return {};
            }
          } catch (error) {
            return {
              error: error instanceof Error ? error.message : "Ocorreu um erro",
            };
          }
          return {};
        }}
        slots={{
          title: Title,
          subtitle: Subtitle,
          emailField: CustomEmailField,
          passwordField: CustomPasswordField,
          submitButton: CustomButton,
          signUpLink: SignUpLink,
        }}
        providers={providers}
      />
    </AppProvider>
  );
}
