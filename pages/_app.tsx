import type { AppProps } from "next/app";
import "../styles/styles.scss";

// Redux
import { Provider } from "react-redux";
import { store } from "../store";

// MUI
import { CssBaseline, ThemeProvider } from "@mui/material";
import { darkTheme } from "../themes";

// Notifications
import { Notifications } from "../components";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Notifications />
        <Component {...pageProps} />
      </ThemeProvider>
    </Provider>
  );
}
