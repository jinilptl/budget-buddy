import axios from "axios";

const API_URL = "http://localhost:4000/api/v1";

export async function registerApi(formData) {
  const payload = {
    name: formData.name,
    email: formData.email,
    password: formData.password,
  };

  const { data } = await axios.post(`${API_URL}/users/register`, payload, {
    withCredentials: true,
  });

  return data.data; // Assuming backend sends { data: { user: ... } }
}
