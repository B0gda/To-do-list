import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export type NoteTagType = "none" | "star" | "fire" | "job";

export interface Note {
  id: number;
  name: string;
  description: string;
  tagtype: NoteTagType;
  isSpecial: boolean;
  isDone: boolean;
}

export const notesApi = createApi({
  reducerPath: "notesApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3001/" }),
  tagTypes: ["Notes"],
  endpoints: (builder) => ({
    getNotes: builder.query<Note[], void>({
      query: () => "notes",
      providesTags: ["Notes"],
    }),
    updateNote: builder.mutation<Note, Partial<Note> & Pick<Note, "id">>({
      query: (updatedNote) => ({
        url: `notes/${updatedNote.id}`,
        method: "PUT",
        body: updatedNote,
      }),
      invalidatesTags: ["Notes"],
    }),
    updateNoteStatus: builder.mutation<Note, Note>({
      query: (updatedNote) => ({
        url: `notes/${updatedNote.id}`,
        method: "PUT",
        body: updatedNote,
      }),
      invalidatesTags: ["Notes"],
      async onQueryStarted(updatedNote, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          notesApi.util.updateQueryData("getNotes", undefined, (draft) => {
            const note = draft.find((n) => n.id === updatedNote.id);
            if (note) {
              Object.assign(note, updatedNote);
            }
          })
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),
    addNote: builder.mutation<Note, Partial<Note>>({
      query: (newNote) => ({
        url: "notes",
        method: "POST",
        body: newNote,
      }),
      invalidatesTags: ["Notes"],
    }),
    deleteNote: builder.mutation<{ success: boolean; id: number }, number>({
      query: (id) => ({
        url: `notes/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Notes"],
    }),
  }),
});

export const {
  useGetNotesQuery,
  useUpdateNoteMutation,
  useUpdateNoteStatusMutation,
  useAddNoteMutation,
  useDeleteNoteMutation,
} = notesApi;
