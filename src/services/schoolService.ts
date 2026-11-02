import api from "./api";
import type { SchoolResponse } from "../types/school";

export const getSchool = async (): Promise<SchoolResponse> => {
  const response = await api.get<SchoolResponse>("/school");

  return response.data;
};