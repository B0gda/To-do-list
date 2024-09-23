import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { FaPlus } from "react-icons/fa";
import {
  Actions,
  AddButton,
  NavBar,
  ThemeToggle,
  Title,
  ToggleInput,
  ToggleSlider,
} from "./NavBarMenu.styles";

import { toggleTheme } from "@store/themeSlice";
import { RootState } from "@store/store";
import { NoteModal } from "@components/NoteModal";

export const NavBarMenu: React.FC = () => {
  const dispatch = useDispatch();
  const isDark = useSelector((state: RootState) => state.theme.isDark);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleToggleTheme = () => {
    dispatch(toggleTheme());
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <NavBar>
        <Title>Заметки</Title>
        <Actions>
          <AddButton onClick={handleOpenModal}>
            <FaPlus />
          </AddButton>
          <ThemeToggle>
            <ToggleInput
              type="checkbox"
              checked={isDark}
              onChange={handleToggleTheme}
            />
            <ToggleSlider />
          </ThemeToggle>
        </Actions>
      </NavBar>
      <NoteModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </>
  );
};
