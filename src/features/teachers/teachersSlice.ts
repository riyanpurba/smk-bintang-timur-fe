
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../services/api";

export interface Teacher {
  id: number;
  name: string;
  position: string;
  subject: string;
  category: "Guru" | "Staff" | "Pimpinan";
  image?: string | null;
}

interface TeacherApiResponse {
  data: Teacher[];
  current_page?: number;
  last_page?: number;
  per_page?: number;
  total?: number;
  meta?: {
    current_page?: number;
    last_page?: number;
    per_page?: number;
    total?: number;
  };
}

interface TeachersState {
  data: Teacher[];
  currentPage: number;
  lastPage: number;
  perPage: number;
  total: number;
  loading: boolean;
  error: string | null;
}

const initialState: TeachersState = {
  data: [],
  currentPage: 1,
  lastPage: 1,
  perPage: 10,
  total: 0,
  loading: false,
  error: null,
};

export const fetchTeachers = createAsyncThunk<
  TeacherApiResponse,
  { page?: number; limit?: number },
  { rejectValue: string }
>(
  "teachers/fetchTeachers",
  async ({ page = 1, limit = 10 }, { rejectWithValue }) => {
    try {
      const response = await api.get("/teachers", {
        params: {
          page,
          limit,
        },
      });

      // Support Laravel paginator dan Resource Collection.
      const result = response.data;

      // Jika backend membungkus response dengan properti data.
      const pagination =
        result.data && !Array.isArray(result.data)
          ? result.data
          : result;

      const meta = pagination.meta ?? pagination;

      const normalizedResponse: TeacherApiResponse = {
        data: Array.isArray(pagination.data)
          ? pagination.data
          : [],
        current_page: meta.current_page ?? page,
        last_page: meta.last_page ?? 1,
        per_page: meta.per_page ?? limit,
        total: meta.total ?? 0,
      };

      return normalizedResponse;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }

      return rejectWithValue("Gagal mengambil data guru.");
    }
  }
);

const teachersSlice = createSlice({
  name: "teachers",
  initialState,
  reducers: {
    clearTeachersError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTeachers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTeachers.fulfilled, (state, action) => {
        state.loading = false;

        state.data = action.payload.data;
        state.currentPage = action.payload.current_page ?? 1;
        state.lastPage = action.payload.last_page ?? 1;
        state.perPage = action.payload.per_page ?? 10;
        state.total = action.payload.total ?? 0;
      })
      .addCase(fetchTeachers.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload ?? "Gagal mengambil data guru.";
      });
  },
});

export const { clearTeachersError } = teachersSlice.actions;

export default teachersSlice.reducer;
