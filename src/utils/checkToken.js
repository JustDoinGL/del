export default function checkToken() {
    const token = localStorage.getItem('token');
    return token !== null ? token : '';
  }