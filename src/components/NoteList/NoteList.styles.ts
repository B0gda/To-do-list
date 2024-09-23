import styled from "styled-components";

export const NotesContainer = styled.div`
  padding: 20px;
`;

export const NoteItem = styled.div`
  margin-bottom: 15px;
  border: 1px solid ${(props) => props.theme.color};
  padding: 15px;
  background-color: ${(props) => (props.theme.isDark ? "#1e1e1e" : "#f9f9f9")};
  color: ${(props) => props.theme.color};
  border-radius: 5px;
`;

export const NoteHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const LeftSection = styled.div`
  display: flex;
  align-items: center;
`;

export const Checkbox = styled.div`
  cursor: pointer;
  margin-right: 10px;
  font-size: 24px;
`;

export const TagEmoji = styled.div`
  margin-right: 10px;
  font-size: 20px;
`;

export const NoteTitle = styled.h2`
  margin: 0;
  font-size: 18px;
  font-weight: bold;
`;

export const OptionsButton = styled.button`
  background: none;
  border: none;
  color: ${(props) => props.theme.color};
  cursor: pointer;
  font-size: 20px;
  position: relative;
`;

export const NoteDescription = styled.p`
  margin-top: 10px;
  word-wrap: break-word;
`;

export const NoRecordsMessage = styled.div`
  text-align: center;
  color: ${(props) => props.theme.gray};
  margin-top: 20px;
`;

export const OptionsMenu = styled.div`
  position: absolute;
  right: 0;
  top: 25px;
  background-color: ${(props) => props.theme.background};
  border: 1px solid ${(props) => props.theme.color};
  border-radius: 5px;
  z-index: 1;
`;

export const OptionItem = styled.div`
  padding: 10px;
  cursor: pointer;
  color: ${(props) => props.theme.color};

  &:hover {
    background-color: ${(props) => props.theme.highlight};
  }
`;