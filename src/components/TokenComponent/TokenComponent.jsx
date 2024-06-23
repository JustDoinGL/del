import { useContext, useState } from 'react';
import { DataContext } from '../../App';
import Spinner from '../../UI/Spinner/Spinner';
import styles from './TokenComponent.module.css';

const TokenComponent = () => {
  const { email, updateToken } = useContext(DataContext);
  const [encodedToken, setEncodedToken] = useState('');
  const [token, setToken] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const getCode = async (email) => {
    setIsLoading(true);
    setError('');
    const requestUrl = `http://193.19.100.32:7000/api/get-code?email=${encodeURIComponent(email)}`;
    try {
      const response = await fetch(requestUrl);
      if (!response.ok) {
        throw new Error(`Ошибка: ${response.status}`);
      }
      const code = await response.json();
      console.log(code)
      setToken(code);
      updateToken(code);
    } catch (error) {
      console.error('Ошибка при получении кода:', error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const encodeToBase64 = (email, code) => {
    return btoa(`${email}:${code}`);
  };

  const handleSubmit = () => {
    const base64Token = encodeToBase64(email, token);
    setEncodedToken(base64Token);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      alert('Текст скопирован в буфер обмена');
    });
  };

  return (
    <div className={styles.container}>
      <div>
        <button className={styles.button} onClick={() => getCode(email)}>Запросить токен</button>
        <button className={styles.button} onClick={() => handleSubmit(email, token)}>Зашифровать</button>
      </div>
      {encodedToken && (
        <div className={styles.tokenDisplay}>
          <p className={styles.p}>Закодированный токен:</p>
          <p>{encodedToken}</p>
          <button className={styles.copyButton} onClick={() => copyToClipboard(encodedToken)}>Копировать</button>
        </div>
      )}
      {error && <p className={styles.errorMessage}>Ошибка: {error}</p>}
      {isLoading && <Spinner />}
    </div>
  );
};

export default TokenComponent;