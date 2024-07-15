import axios from 'axios';

const API_URL = 'http://localhost:8000'; // 인증 서버 URL

export const login = async (id: string, password: string) => {
  try {
    const response = await axios.post(`${API_URL}/api/login`, { id, password });
    return response.data; // 성공적인 응답 반환
  } catch (error) {
    throw error; // 오류 발생 시 throw
  }
};
