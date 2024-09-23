import styled from "styled-components";

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const ModalContainer = styled.div`
  background-color: ${(props) => props.theme.background};
  color: ${(props) => props.theme.color};
  padding: 20px;
  border-radius: 8px;
  width: 400px;
`;

export const ModalTitle = styled.h2`
  margin-top: 0;
`;

export const Input = styled.input`
  width: 100%;
  padding: 8px;
  margin-bottom: 15px;
  border: 1px solid ${(props) => props.theme.color};
  background-color: ${(props) => props.theme.background};
  color: ${(props) => props.theme.color};
`;

export const TextArea = styled.textarea`
  width: 100%;
  padding: 8px;
  margin-bottom: 15px;
  border: 1px solid ${(props) => props.theme.color};
  background-color: ${(props) => props.theme.background};
  color: ${(props) => props.theme.color};
  resize: vertical;
`;

export const TagOptions = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
`;

interface TagButtonProps {
  isSelected: boolean;
}

export const TagButton = styled.button<TagButtonProps>`
  flex: 1;
  margin: 0 5px;
  padding: 8px;
  background-color: ${(props) =>
    props.isSelected ? props.theme.highlight : "transparent"};
  color: ${(props) => props.theme.color};
  border: 1px solid ${(props) => props.theme.color};
  cursor: pointer;
  border-radius: 4px;

  &:hover {
    background-color: ${(props) => props.theme.highlight};
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const SubmitButton = styled.button`
  padding: 8px 15px;
  background-color: ${(props) => props.theme.color};
  color: ${(props) => props.theme.background};
  border: none;
  cursor: pointer;
  border-radius: 4px;
  margin-left: 10px;

  &:disabled {
    background-color: ${(props) => props.theme.gray};
    cursor: not-allowed;
  }
`;

export const CancelButton = styled.button`
  padding: 8px 15px;
  background-color: transparent;
  color: ${(props) => props.theme.color};
  border: 1px solid ${(props) => props.theme.color};
  cursor: pointer;
  border-radius: 4px;
`;