import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import styles from './LoginPage.module.css';
import { PostGood, url } from '../../utils/const';
import Spinner from '../../UI/Spinner/Spinner';
import { NavLink, useNavigate } from 'react-router-dom';
import { DataContext } from '../../App';

const LoginPage = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false);
  const { roles, updateToken} = useContext(DataContext);

  const onSubmit = async (data, e) => {
    e.preventDefault();
    setIsLoading(true)
      try {
         const response = await fetch(`${url}/sign-up` ,{
          method: 'POST', 
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });
    
        if (!response.ok) {
          throw new Error(`Ошибка: ${response.status}`); 
        }
        const responseBody = await response.json();

        if (responseBody === PostGood) {
          updateToken('test')
          navigate('/content')
        }
      } catch (error) {
        console.error('Ошибка при выполнении запроса:', error);
      } finally {
        setIsLoading(false)
      }
    }


  return (
    <main className={styles.main}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.formContainer}>
      <NavLink to="/auth">Войти</NavLink>
        <div className={styles.formField}>
          <label>Имя:</label>
          <input {...register("first_name", { required: "Это поле обязательно", minLength: { value: 2, message: "Имя должно содержать минимум 2 символа" } })} />
          {errors.first_name && <span>{errors.first_name.message}</span>}
        </div>

        <div className={styles.formField}>
          <label>Фамилия:</label>
          <input {...register("last_name", { required: "Это поле обязательно", minLength: { value: 2, message: "Фамилия должна содержать минимум 2 символа" } })} />
          {errors.last_name && <span>{errors.last_name.message}</span>}
        </div>

        <div className={styles.formField}>
          <label>Почта:</label>
          <input type="email" {...register("email", { required: "Это поле обязательно", pattern: { value: /^\S+@\S+\.\S+$/, message: "Некорректный формат email" } })} />
          {errors.email && <span>{errors.email.message}</span>}
        </div>

        <div className={styles.formField}>
          <label>Профиль:</label>
          <select {...register("role", { required: "Это поле обязательно" })}>
            {roles.map(role => (
              <option key={role} value={role} className={styles.optional}>{role}</option>
            ))}
          </select>
          {errors.profile && <span>{errors.profile.message}</span>}
        </div>

        <button type="submit" className={styles.submitButton}>Отправить</button>
      </form>

      {isLoading && <Spinner />}
   </main>
  );
}

export default LoginPage;