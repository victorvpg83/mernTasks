import React, {useContext, useEffect} from 'react'
import AuthContext from '../../context/auth/authContext'

const Bar = () => {
    //extract auth info
    const authContext = useContext(AuthContext)
    const {user, authenticatedUser, closeSession} = authContext

    useEffect(()=> {
        authenticatedUser()
        // eslint-disable-next-line
    },[])
    return (
        <header className='app-header'>
            {user?<p className='nombre-usuario'> Hola, <span> {user.name} </span> </p> :null}
            <nav className='nav-principal'>
                <button
                    className='btn btn-blank color'
                    onClick={()=> closeSession()}
                >Cerrar sesión</button>
            </nav>
        </header>
    );
};

export default Bar;