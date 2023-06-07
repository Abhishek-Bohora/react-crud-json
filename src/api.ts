import axios from "axios";

const BASE_URL = "http://localhost:3000/posts";

export const addCourse = async (name: string, description: string) => {
  const response = await axios.post(`${BASE_URL}`, {
    name,
    description,
  });
  return response.data;
};

export const getCourses = async () => {
  const response = await axios.get(`${BASE_URL}`);
  return response.data;
};

export const getCourse = async (id: number) => {
  const response = await axios.get(`${BASE_URL}/${id}`);
  return response.data;
};

export const updateCourse = async (
  id: number,
  name: string,
  description: string
) => {
  const response = await axios.put(`${BASE_URL}/${id}`, {
    name,
    description,
  });
  return response.data;
};

export const deleteCourse = async (id: number) => {
  const response = await axios.delete(`${BASE_URL}/${id}`);
  return response.data;
};
