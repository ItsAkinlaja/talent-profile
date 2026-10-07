import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { api } from "@/lib/api";
import { CreateUserPayload, FullUser } from "@/lib/types";

interface UsersState {
  users: FullUser[];
  selectedUser: FullUser | null;
  loading: boolean;
  error: string | null;
}

const initialState: UsersState = {
  users: [],
  selectedUser: null,
  loading: false,
  error: null,
};

export const fetchUsers = createAsyncThunk("users/fetchAll", async () => {
  return await api.getUsers();
});

export const fetchUserById = createAsyncThunk(
  "users/fetchById",
  async (id: string) => {
    return await api.getUserById(id);
  }
);

export const createUser = createAsyncThunk(
  "users/create",
  async (payload: CreateUserPayload) => {
    return await api.createUser(payload);
  }
);

export const updateUser = createAsyncThunk(
  "users/update",
  async ({ id, payload }: { id: string; payload: Partial<CreateUserPayload> }) => {
    return await api.updateUser(id, payload);
  }
);

export const deleteUser = createAsyncThunk(
  "users/delete",
  async (id: string) => {
    await api.deleteUser(id);
    return id;
  }
);

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    clearSelectedUser(state) {
      state.selectedUser = null;
    },
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // fetchUsers
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action: PayloadAction<FullUser[]>) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch users";
      });

    // fetchUserById
    builder
      .addCase(fetchUserById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserById.fulfilled, (state, action: PayloadAction<FullUser>) => {
        state.loading = false;
        state.selectedUser = action.payload;
      })
      .addCase(fetchUserById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch user";
      });

    // createUser
    builder
      .addCase(createUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createUser.fulfilled, (state, action: PayloadAction<FullUser>) => {
        state.loading = false;
        state.users.push(action.payload);
        state.selectedUser = action.payload;
      })
      .addCase(createUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to create user";
      });

    // updateUser
    builder
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action: PayloadAction<FullUser>) => {
        state.loading = false;
        state.selectedUser = action.payload;
        const idx = state.users.findIndex(
          (u) => u.userInfo.id === action.payload.userInfo.id
        );
        if (idx !== -1) state.users[idx] = action.payload;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to update user";
      });

    // deleteUser
    builder
      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteUser.fulfilled, (state, action: PayloadAction<string>) => {
        state.loading = false;
        state.users = state.users.filter(
          (u) => u.userInfo.id !== action.payload
        );
        if (state.selectedUser?.userInfo.id === action.payload) {
          state.selectedUser = null;
        }
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to delete user";
      });
  },
});

export const { clearSelectedUser, clearError } = usersSlice.actions;
export default usersSlice.reducer;
