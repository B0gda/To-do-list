import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${(props) => props.theme.background};
    color: ${(props) => props.theme.color};
    margin: 0;
    font-family: Arial, Helvetica, sans-serif;
    transition: background-color 0.3s, color 0.3s;
  }

  .note-enter {
  opacity: 0;
  transform: translateY(-20px);
}
.note-enter-active {
  opacity: 1;
  transform: translateY(0);
  transition: opacity 300ms ease-in-out, transform 300ms ease-in-out;
}
.note-exit {
  opacity: 1;
  transform: translateY(0);
}
.note-exit-active {
  opacity: 0;
  transform: translateY(-20px);
  transition: opacity 300ms ease-in-out, transform 300ms ease-in-out;
}
`;
