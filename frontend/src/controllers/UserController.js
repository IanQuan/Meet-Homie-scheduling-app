import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:8000';

// Function to get auth header
const getAuthHeaders = (authTokens) => ({
    headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${String(authTokens.access)}`,
    },
});

// Get user details by user ID
export const getUserDetails = async (userId, authTokens) => {
    try {
        const response = await axios.get(`${BASE_URL}/accounts/profile/${userId}`, getAuthHeaders(authTokens));
        return response.data; // Return user details
    } catch (error) {
        console.error(`Failed to fetch details for contact ID ${userId}:`, error);
        throw error; 
    }
};

// Update user details
export const updateUserDetails = async (userId, authTokens, userData) => {
    try {
        console.log(userData)
        const response = await axios.patch(`${BASE_URL}/accounts/profile/update/`, userData, getAuthHeaders(authTokens));
        console.log(response.data)
        return response.data; // Returns updated user details
    } catch (error) {
        console.error(`Failed to update details for user ID ${userId}:`, error);
        throw error;
    }
};

export const requestPasswordReset = async (email) => {
    try {
        const response = await axios.post(`${BASE_URL}/accounts/password_reset/`, {
            email: email
        });
        console.log("Password reset email sent:", response.data);
        return response.data;
    } catch (error) {
        console.error("Failed to send password reset email:", error.response.data);
        throw error;
    }
};

export const checkUsernameExists = async (username) => {
    if (!username) {
        return;
    }
    try {
        const response = await axios.get(`${BASE_URL}/accounts/check_username/${username}`);
        return response.data.exists;
    } catch (error) {
        console.error(`Failed to check if username ${username} exists:`, error);
        throw error;
    }
}

export const checkEmailExists = async (email) => {
    try {
        const response = await axios.get(`${BASE_URL}/accounts/check_email/`, { params: { email } });
        return response.data.exists; // Assuming the endpoint returns { exists: true/false }
    } catch (error) {
        console.error(`Failed to check if email ${email} exists:`, error);
        throw error;
    }
};