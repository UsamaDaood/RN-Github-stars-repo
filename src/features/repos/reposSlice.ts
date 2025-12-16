import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchReposApi } from '../../services/githubApi';

interface RepoState {
  repos: any[];
  page: number;
  loading: boolean;
  refreshing: boolean;
  daysFilter: number;
}

const initialState: RepoState = {
  repos: [],
  page: 1,
  loading: false,
  refreshing: false,
  daysFilter: 1, // Today by default
};

export const fetchRepos = createAsyncThunk(
  'repos/fetch',
  async ({ page, days }: { page: number; days: number }) => {
    return await fetchReposApi(page, days);
  }
);

const reposSlice = createSlice({
  name: 'repos',
  initialState,
  reducers: {
    resetRepos(state, action) {
      state.repos = [];
      state.page = 1;
      state.daysFilter = action.payload;
    },
    startRefresh(state) {
      state.refreshing = true;
      state.repos = [];
      state.page = 1;
    },
    stopRefresh(state) {
      state.refreshing = false;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchRepos.pending, state => {
        state.loading = true;
      })
      .addCase(fetchRepos.fulfilled, (state, action) => {
        state.loading = false;
        state.refreshing = false;
        state.repos = [...state.repos, ...action.payload.items];
        state.page += 1;
      })
      .addCase(fetchRepos.rejected, state => {
        state.loading = false;
        state.refreshing = false;
      });
  },
});

export const { resetRepos, startRefresh, stopRefresh } =
  reposSlice.actions;

export default reposSlice.reducer;
