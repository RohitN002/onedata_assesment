import axios from 'axios';

// Base URL for the backend
const BASE_URL = 'http://localhost:3000'; // Ensure this matches your NestJS backend URL

export const getPictures = () => axios.get(`${BASE_URL}/pictures`);

export const likePicture = (id: string) => axios.post(`${BASE_URL}/pictures/${id}/like`);

export const followPicture = (id: string, userId: string) => axios.post(`${BASE_URL}/pictures/${id}/follow`, { userId });

export const unfollowPicture = (id: string, userId: string) => axios.post(`${BASE_URL}/pictures/${id}/unfollow`, { userId });
