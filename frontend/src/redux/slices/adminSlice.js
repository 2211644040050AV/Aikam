import { createSlice, createAsyncThunk, rejectWithValue } from "@reduxjs/toolkit";
import axios from "axios";

// Fetch users for admin
export const fetchUsers = createAsyncThunk("admin/fetchUsers", async () => {
    const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/admin/users`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
    });
    return response.data; // Ensure data is returned
});

// Add a new user
export const addUser = createAsyncThunk("admin/addUser", async (userData, { rejectWithValue }) => {
    try {
        const response = await axios.post(
            `${import.meta.env.VITE_BACKEND_URL}/api/admin/users`,
            userData,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("userToken")}`,
                },
            }
        );
        return response.data; // Return the response data
    } catch (error) {
        return rejectWithValue(error.response.data); // Use rejectWithValue to handle errors
    }
});

// Update an existing user
export const updateUser = createAsyncThunk("admin/updateUser", async (userData, { rejectWithValue }) => {
    try {
        const response = await axios.put(
            `${import.meta.env.VITE_BACKEND_URL}/api/admin/users/${userData.id}`,
            userData,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("userToken")}`,
                },
            }
        );
        return response.data; // Return the updated user data
    } catch (error) {
        return rejectWithValue(error.response.data); // Use rejectWithValue to handle errors
    }
});

// Delete a user
export const deleteUser = createAsyncThunk("admin/deleteUser", async (userId, { rejectWithValue }) => {
    try {
        const response = await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/admin/users/${userId}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("userToken")}`,
            },
        });
        return userId; // Return the ID of the deleted user
    } catch (error) {
        return rejectWithValue(error.response.data); // Handle errors with rejectWithValue
    }
});

const initialState = {
    users: [],
    loading: false,
    error: null,
};

const adminSlice = createSlice({
    name: "admin",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Fetch Users Cases
            .addCase(fetchUsers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.loading = false;
                state.users = action.payload;
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.message;
            })

            // Add User Cases
            .addCase(addUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addUser.fulfilled, (state, action) => {
                state.loading = false;
                state.users.push(action.payload); // Add new user to state
            })
            .addCase(addUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.message;
            })

            // Update User Cases
            .addCase(updateUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                state.loading = false;
                // Find the user to update and replace with the updated user
                const index = state.users.findIndex((user) => user.id === action.payload.id);
                if (index !== -1) {
                    state.users[index] = action.payload;
                }
            })
            .addCase(updateUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.message;
            })

            // Delete User Cases
            .addCase(deleteUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteUser.fulfilled, (state, action) => {
                state.loading = false;
                // Remove the deleted user from the users list
                state.users = state.users.filter(user => user.id !== action.payload);
            })
            .addCase(deleteUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.message;
            });
    },
});

export default adminSlice.reducer;
