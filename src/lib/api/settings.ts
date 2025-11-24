import axios from "axios";

// Backend baseURL'i ayarlıyoruz
const api = axios.create({
  baseURL: "http://localhost:5270", // ✅ backend portunu buraya yaz
  withCredentials: true, // eğer cookie/tabanlı auth varsa
});

export async function getProfile() {
  return await api.get("/api/settings/profile");
}

export async function updateProfile(data: any) {
  return await api.put("/api/settings/profile", data);
}

export async function changePassword(data: {
  currentPassword: string;
  newPassword: string;
}) {
  return await api.put("/api/settings/password", data);
}
