import React from "react";
import styled, { ThemeProvider } from "styled-components";
import { NotesList } from "@components/NoteList";
import { NavBarMenu } from "@components/NavBarMenu";
import { GlobalStyle } from "./GlobalStyle";
import { useSelector } from "react-redux";
import { RootState } from "@store/store";
import { TabBar } from "@components/TabBar";

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const lightTheme = {
  background: "#ffffff",
  color: "#000000",
  gray: "#555555",
  highlight: "#e0e0e0",
  isDark: false,
};

const darkTheme = {
  background: "#121212",
  color: "#ffffff",
  gray: "#bbbbbb",
  highlight: "#2a2a2a",
  isDark: true,
};

const App: React.FC = () => {
  const isDark = useSelector((state: RootState) => state.theme.isDark);
  const theme = isDark ? darkTheme : lightTheme;

  return (
    <ThemeProvider theme={theme}>
      <>
        <GlobalStyle />
        <Container>
          <NavBarMenu />
          <TabBar />
          <NotesList />
        </Container>
      </>
    </ThemeProvider>
  );
};

export default App;
