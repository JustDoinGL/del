const createToken = (token) => {
    localStorage.setItem('token', token);
}

export default createToken