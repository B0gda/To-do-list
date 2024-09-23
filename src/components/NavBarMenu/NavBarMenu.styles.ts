import styled from "styled-components";

export const NavBar = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
`;

export const Title = styled.h1`
  margin: 0;
`;

export const Actions = styled.div`
  display: flex;
  align-items: center;
`;

export const AddButton = styled.button`
  background-color: #007bff;
  border: none;
  color: white;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
  margin-right: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ThemeToggle = styled.label`
  position: relative;
  display: inline-block;
  width: 50px;
  height: 25px;
`;

export const ToggleInput = styled.input`
  opacity: 0;
  width: 0;
  height: 0;

  &:checked + span {
    background-color: #2196f3;
  }

  &:focus + span {
    box-shadow: 0 0 1px #2196f3;
  }

  &:checked + span:before {
    transform: translateX(26px);
  }
`;

export const ToggleSlider = styled.span`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: 0.4s;
  border-radius: 25px;

  &:before {
    position: absolute;
    content: "";
    height: 21px;
    width: 21px;
    left: 2px;
    bottom: 2px;
    background-color: white;
    transition: 0.4s;
    border-radius: 50%;
  }
`;