import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";

import { CSSTransition, TransitionGroup } from "react-transition-group";
import { FaEllipsisV } from "react-icons/fa";
import { MdCheckBoxOutlineBlank, MdCheckBox } from "react-icons/md";
import {
  Checkbox,
  LeftSection,
  NoRecordsMessage,
  NoteDescription,
  NoteHeader,
  NoteItem,
  NotesContainer,
  NoteTitle,
  OptionItem,
  OptionsButton,
  OptionsMenu,
  TagEmoji,
} from "./NoteList.styles";

import {
  useGetNotesQuery,
  useDeleteNoteMutation,
  useUpdateNoteStatusMutation,
  Note,
} from "@api/notesApi";
import { RootState } from "@store/store";
import { NoteModal } from "@components/NoteModal";

export const NotesList: React.FC = () => {
  const {
    data: notes,
    error,
    isLoading,
  } = useGetNotesQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  const currentTag = useSelector((state: RootState) => state.filter.tag);

  const [showOptionsId, setShowOptionsId] = useState<number | null>(null);
  const [hiddenNotes, setHiddenNotes] = useState<number[]>([]);
  const [editNoteData, setEditNoteData] = useState<Note | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const menuRef = useRef<HTMLDivElement | null>(null);

  const [deleteNote] = useDeleteNoteMutation();
  const [updateNote] = useUpdateNoteStatusMutation();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        showOptionsId !== null
      ) {
        setShowOptionsId(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showOptionsId]);

  let filteredNotes = notes || [];

  if (currentTag === "all") {
    filteredNotes = filteredNotes.filter((note) => !note.isDone);
  } else if (currentTag === "done") {
    filteredNotes = filteredNotes.filter((note) => note.isDone);
  } else {
    filteredNotes = filteredNotes.filter(
      (note) => note.tagtype === currentTag && !note.isDone
    );
  }

  if (isLoading) return <div>Загрузка...</div>;
  if (error) return <div>Ошибка при загрузке заметок.</div>;

  const getTagEmoji = (tag: string) => {
    switch (tag) {
      case "fire":
        return "🔥";
      case "star":
        return "⭐";
      case "job":
        return "💼";
      case "none":
        return "🚫";
      default:
        return "🗒️";
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteNote(id).unwrap();
      setShowOptionsId(null);
    } catch (error) {
      console.error("Ошибка при удалении заметки:", error);
    }
  };

  const handleEdit = (note: Note) => {
    setEditNoteData(note);
    setIsModalOpen(true);
    setShowOptionsId(null);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditNoteData(null);
  };

  const handleToggleDone = (note: Note) => {
    const updatedNote = { ...note, isDone: !note.isDone };
    updateNote(updatedNote);
  };

  return (
    <>
      <NotesContainer>
        {filteredNotes.length > 0 ? (
          <TransitionGroup>
            {filteredNotes.map(
              (note) =>
                !hiddenNotes.includes(note.id) && (
                  <CSSTransition
                    key={note.id}
                    timeout={{ enter: 300, exit: 300 }}
                    classNames="note"
                  >
                    <NoteItem>
                      <NoteHeader>
                        <LeftSection>
                          <Checkbox onClick={() => handleToggleDone(note)}>
                            {note.isDone ? (
                              <MdCheckBox />
                            ) : (
                              <MdCheckBoxOutlineBlank />
                            )}
                          </Checkbox>
                          <TagEmoji>{getTagEmoji(note.tagtype)}</TagEmoji>
                          <NoteTitle>{note.name}</NoteTitle>
                        </LeftSection>
                        <div style={{ position: "relative" }}>
                          <OptionsButton
                            onClick={() =>
                              setShowOptionsId(
                                showOptionsId === note.id ? null : note.id
                              )
                            }
                          >
                            <FaEllipsisV />
                          </OptionsButton>
                          {showOptionsId === note.id && (
                            <OptionsMenu ref={menuRef}>
                              <OptionItem onClick={() => handleEdit(note)}>
                                Изменить
                              </OptionItem>
                              <OptionItem onClick={() => handleDelete(note.id)}>
                                Удалить
                              </OptionItem>
                            </OptionsMenu>
                          )}
                        </div>
                      </NoteHeader>
                      <NoteDescription>{note.description}</NoteDescription>
                    </NoteItem>
                  </CSSTransition>
                )
            )}
          </TransitionGroup>
        ) : (
          <NoRecordsMessage>Подходящих записей нет</NoRecordsMessage>
        )}
      </NotesContainer>
      <NoteModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        initialData={editNoteData || undefined}
      />
    </>
  );
};
