import axiosInstance from "./axiosInstance";

export const uploadFreeTender = async (formData: FormData) => {
  const response = await axiosInstance.post("/free-tender/create", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};
