// /pages/MainPage.tsx
import React, { useState } from 'react';
import { login } from '../services/api';

const MainPage: React.FC = () => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    setError('');

    try {
      const data = await login(id, password);
      console.log('Login successful:', data);
      setError('로그인 성공');
    } catch (error: any) {
      if (error.response) {
        setError('로그인 실패: ' + error.response.data.message);
      } else {
        setError('로그인 실패: 서버와의 연결에 문제가 있습니다.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Front</h1>
      <p>login test</p>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div>
        <input
          type="text"
          placeholder="Enter your ID"
          value={id}
          onChange={(e) => setId(e.target.value)}
        />
        <br/>
        <input
          type="password"
          placeholder="Enter your Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLogin} disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </div>
    </div>
  );
};

export default MainPage;
