import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../services/api";

export interface Major {
  id: number;
  name: string;
  abbreviation?: string | null;
  category?: string | null;
  description?: string | null;
  image?: string | null;
  icon?: string | null;
  skills?: string[] | null;
  featured?: boolean;
}

interface MajorApiResponse {
  data: Major[];
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
}

interface MajorsState {
  data: Major[];
  currentPage: number;
  lastPage: number;
  perPage: number;
  total: number;
  loading: boolean;
  error: string | null;
}

const initialState: MajorsState = {
  data: [],
  currentPage: 1,
  lastPage: 1,
  perPage: 10,
  total: 0,
  loading: false,
  error: null,
};

export const fetchMajors = createAsyncThunk<
  MajorApiResponse,
  { page?: number; limit?: number },
  { rejectValue: string }
>(
  "majors/fetchMajors",
  async ({ page = 1, limit = 10 }, { rejectWithValue }) => {
    try {
      const response = await api.get("/majors", {
        params: { page, limit },
      });

      const result = response.data;

      // Mendukung response dengan wrapper data tambahan.
      const payload =
        result.data &&
        !Array.isArray(result.data) &&
        typeof result.data === "object"
          ? result.data
          : result;

      const meta = payload.meta ?? result.meta ?? payload;

      return {
        data: Array.isArray(payload.data) ? payload.data : [],
        current_page: meta.current_page ?? page,
        last_page: meta.last_page ?? 1,
        per_page: meta.per_page ?? limit,
        total: meta.total ?? 0,
      };
    } catch (error: unknown) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }

      return rejectWithValue("Gagal mengambil data jurusan.");
    }
  }
);

const majorsSlice = createSlice({
  name: "majors",
  initialState,
  reducers: {
    clearMajorsError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMajors.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMajors.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data;
        state.currentPage = action.payload.current_page;
        state.lastPage = action.payload.last_page;
        state.perPage = action.payload.per_page;
        state.total = action.payload.total;
      })
      .addCase(fetchMajors.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload ?? "Gagal mengambil data jurusan.";
      });
  },
});

export const { clearMajorsError } = majorsSlice.actions;

export default majorsSlice.reducer;