import { useState } from 'react';
import styles from './IsRightTokenComponent.module.css';

const IsRightTokenComponent = () => {
  const [token, setToken] = useState('');
  const [response, setResponse] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleTokenChange = (e) => {
    setToken(e.target.value);
  };

  const checkToken = async () => {
    setIsLoading(true);
    setError('');
    setResponse('');
    const requestUrl = 'http://193.19.100.32:7000/api/set-status';
    const body = {
      token: token,
      status: 'increased'
    };

    try {
      const response = await fetch(requestUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error(`Ошибка: ${response.status}`);
      }

      const result = await response.text();
      setResponse(result);
    } catch (error) {
      console.error('Ошибка при проверке токена:', error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <input
        type="text"
        className={styles.input}
        placeholder="Введите токен"
        value={token}
        onChange={handleTokenChange}
      />
      <button className={styles.button} onClick={checkToken} disabled={isLoading}>
        {isLoading ? 'Проверка...' : 'Проверить токен'}
      </button>
      {response && <div className={styles.response}>Ответ сервера: {response}</div>}
      {error && <div className={styles.errorMessage}>Ошибка: {error}</div>}
    </div>
  );
};

export default IsRightTokenComponent;