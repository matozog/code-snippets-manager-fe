import { ICodeSnippet, defaultCodeSnippet } from 'src/types/models';
import { addNewSnippet, fetchSnippet, fetchSnippets, removeSnippet, updateSnippet } from './snippets.thunks';
import { createSlice, isFulfilled, isPending, isRejected } from '@reduxjs/toolkit';
import { signedOut } from '../auth/auth.slice';

export interface ISnippetsState {
  isLoading: boolean;
  snippets: ICodeSnippet[];
  // snippet opened in the edit page
  snippet: ICodeSnippet;
  error: string | null;
}

const initialState: ISnippetsState = {
  isLoading: false,
  snippets: [],
  snippet: defaultCodeSnippet,
  error: null,
};

const snippetsThunks = [fetchSnippets, fetchSnippet, addNewSnippet, updateSnippet, removeSnippet] as const;

export const snippetsSlice = createSlice({
  name: 'snippets',
  initialState,
  reducers: {
    clearCodeSnippet: (state) => {
      state.snippet = defaultCodeSnippet;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSnippets.fulfilled, (state, action) => {
        state.snippets = action.payload;
      })
      .addCase(fetchSnippet.fulfilled, (state, action) => {
        state.snippet = action.payload;
      })
      .addCase(addNewSnippet.fulfilled, (state, action) => {
        state.snippets.push(action.payload);
      })
      .addCase(updateSnippet.fulfilled, (state, action) => {
        state.snippets = state.snippets.map((snippet) =>
          snippet.idSnippet === action.payload.idSnippet ? action.payload : snippet,
        );
      })
      .addCase(removeSnippet.fulfilled, (state, action) => {
        state.snippets = state.snippets.filter((snippet) => snippet.idSnippet !== action.payload);
      })
      // the next user must not see the previous user's snippets
      .addCase(signedOut, () => initialState)
      .addMatcher(isPending(...snippetsThunks), (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addMatcher(isFulfilled(...snippetsThunks), (state) => {
        state.isLoading = false;
      })
      .addMatcher(isRejected(...snippetsThunks), (state, action) => {
        state.isLoading = false;
        state.error = action.payload ?? action.error.message ?? null;
      });
  },
});

export const { clearCodeSnippet } = snippetsSlice.actions;

export default snippetsSlice.reducer;
