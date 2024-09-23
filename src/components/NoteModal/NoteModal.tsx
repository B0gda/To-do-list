import React, { useEffect, useState } from "react";

import {
  ButtonGroup,
  CancelButton,
  Input,
  ModalContainer,
  ModalTitle,
  Overlay,
  SubmitButton,
  TagButton,
  TagOptions,
  TextArea,
} from "./NoteModal.styles";

import {
  useAddNoteMutation,
  useUpdateNoteMutation,
  Note,
  NoteTagType,
} from "@api/notesApi";

interface NoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData?: Note;
}

export const NoteModal: React.FC<NoteModalProps> = ({
  isOpen,
  onClose,
  initialData,
}) => {
  const [title, setTitle] = useState(initialData?.name || "");
  const [description, setDescription] = useState(
    initialData?.description || ""
  );
  const [selectedTag, setSelectedTag] = useState<NoteTagType>(
    initialData?.tagtype || "none"
  );
  const [addNote, { isLoading: isAdding }] = useAddNoteMutation();
  const [updateNote, { isLoading: isUpdating }] = useUpdateNoteMutation();

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.name);
      setDescription(initialData.description);
      setSelectedTag(initialData.tagtype);
    } else {
      setTitle("");
      setDescription("");
      setSelectedTag("none");
    }
  }, [initialData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const noteData: Partial<Note> = {
      name: title,
      description,
      tagtype: selectedTag,
      isSpecial: initialData?.isSpecial || false,
      isDone: initialData?.isDone || false,
    };

    try {
      if (initialData) {
        await updateNote({ id: initialData.id, ...noteData }).unwrap();
      } else {
        await addNote(noteData).unwrap();
      }
      setTitle("");
      setDescription("");
      setSelectedTag("none");
      onClose();
    } catch (error) {
      console.error("Ошибка при сохранении заметки:", error);
    }
  };

  if (!isOpen) return null;
  const tagOptions: NoteTagType[] = ["none", "star", "fire", "job"];

  return (
    <Overlay>
      <ModalContainer>
        <ModalTitle>
          {initialData ? "Редактировать заметку" : "Добавить новую заметку"}
        </ModalTitle>
        <form onSubmit={handleSubmit}>
          <Input
            type="text"
            placeholder="Название"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <TextArea
            placeholder="Описание"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            required
          />
          <TagOptions>
            {tagOptions.map((tag) => (
              <TagButton
                key={tag}
                isSelected={selectedTag === tag}
                onClick={() => setSelectedTag(tag)}
                type="button"
              >
                {tag === "none"
                  ? "🚫"
                  : tag === "star"
                  ? "⭐"
                  : tag === "fire"
                  ? "🔥"
                  : "💼"}
              </TagButton>
            ))}
          </TagOptions>
          <ButtonGroup>
            <CancelButton type="button" onClick={onClose}>
              Отмена
            </CancelButton>
            <SubmitButton type="submit" disabled={isAdding || isUpdating}>
              {initialData ? "Сохранить" : "Добавить"}
            </SubmitButton>
          </ButtonGroup>
        </form>
      </ModalContainer>
    </Overlay>
  );
};
