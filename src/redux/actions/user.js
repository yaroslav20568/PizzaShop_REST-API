const setUser = (user) => ({type: 'SET_USER', payload: user});
const setAuth = (flag) => ({type: 'SET_AUTH', payload: flag});

export { setUser, setAuth };