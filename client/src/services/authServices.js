import axios from "axios";

const API_URL = import.meta.env.VITE_BASE_URL;

export async function registerApi(formData) {
  const payload = {
    name: formData.name,
    email: formData.email,
    password: formData.password,
  };

  const response = await axios.post(`${API_URL}/users/register`, payload, {
    withCredentials: true,
  });

  return response; // Assuming backend sends { data: { user: ... } }
}
