import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import styles from './LoginPage.module.css';
import { url } from '../../utils/const';
import Spinner from '../../UI/Spinner/Spinner';
import { NavLink, useNavigate } from 'react-router-dom';
import { DataContext } from '../../App';

const AuthPage = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false);
    const { updateToken} = useContext(DataContext);

    const onSubmit = async (data) => {
        setIsLoading(true);
        try {
          const response = await fetch(`${url}/get-code?email=${(data.email)}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });
      
          if (!response.ok) {
            throw new Error(`Ошибка: ${response.status}`);
          }
          const code = await response.text();
      
          updateToken(code);
          navigate('/content');
        } catch (error) {
          console.error('Ошибка при выполнении запроса:', error);
        } finally {
          setIsLoading(false);
        }
      };

    return (
        <main className={styles.main}>
          <form onSubmit={handleSubmit(onSubmit)} className={styles.formContainer}>
          <NavLink to="/">Регистрация</NavLink>
            <div className={styles.formField}>
              <label>Почта:</label>
              <input type="email" {...register("email", { required: "Это поле обязательно", pattern: { value: /^\S+@\S+\.\S+$/, message: "Некорректный формат email" } })} />
              {errors.email && <span>{errors.email.message}</span>}
            </div>
    
            <button type="submit" className={styles.submitButton}>Отправить</button>
          </form>
    
          {isLoading && <Spinner />}
       </main>
      );
    }

export default AuthPage