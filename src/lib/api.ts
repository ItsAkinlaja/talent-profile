import { CreateUserPayload, FullUser } from "./types";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "";

async function handleResponse<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: res.statusText }));
    throw new Error(error.message || "Request failed");
  }
  return res.json();
}

export const api = {
  async getUsers(): Promise<FullUser[]> {
    const res = await fetch(`${BASE_URL}/api/users`, { cache: "no-store" });
    return handleResponse<FullUser[]>(res);
  },

  async getUserById(id: string): Promise<FullUser> {
    const res = await fetch(`${BASE_URL}/api/users/${id}`, {
      cache: "no-store",
    });
    return handleResponse<FullUser>(res);
  },

  async createUser(payload: CreateUserPayload): Promise<FullUser> {
    const res = await fetch(`${BASE_URL}/api/users`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    return handleResponse<FullUser>(res);
  },

  async updateUser(
    id: string,
    payload: Partial<CreateUserPayload>
  ): Promise<FullUser> {
    const res = await fetch(`${BASE_URL}/api/users/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    return handleResponse<FullUser>(res);
  },

  async deleteUser(id: string): Promise<void> {
    const res = await fetch(`${BASE_URL}/api/users/${id}`, {
      method: "DELETE",
    });
    if (!res.ok) {
      const error = await res.json().catch(() => ({ message: res.statusText }));
      throw new Error(error.message || "Delete failed");
    }
  },

  async uploadImage(file: File): Promise<{ url: string; fileId: string }> {
    const formData = new FormData();
    formData.append("file", file);
    const res = await fetch(`${BASE_URL}/api/upload`, {
      method: "POST",
      body: formData,
    });
    return handleResponse<{ url: string; fileId: string }>(res);
  },
};
