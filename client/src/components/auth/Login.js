import React, {useState, useContext, useEffect} from 'react';
import { Link } from 'react-router-dom'
import AlertContext from '../../context/alerts/alertContext' 
import AuthContext from '../../context/auth/authContext'

const Login = (props) => {
    //extract values context
    const alertContext = useContext(AlertContext)
    const {alerta, showAlert} = alertContext

    const authContext = useContext(AuthContext)
    const {message, authenticated, userLogin } = authContext

    //oassword or user does no exist
    useEffect(()=>{
        if(authenticated){
            props.history.push('/projects')
        }
        if(message){
            showAlert(message.msg,message.categoria)
        }
        // eslint-disable-next-line
    },[message, authenticated, props.history])

    //state login
    const [user, saveUser] = useState({
        email:'',
        password:''
    })

    // extract user
    const{email,password} = user



    const onChange= e=>{
        saveUser({
            ...user,
            [e.target.name] : e.target.value
        })
    }

    //user login

    const onSubmit = e =>{
        e.preventDefault()

        if(email.trim()==='' || password.trim()===''){
            showAlert('Todos los campos son obligatorios', 'alerta-error')
        }
        userLogin({email, password})

    }

    return (
        <div className='form-usuario'>
            {alerta?(<div className={`alerta ${alerta.categoria}`}> {alerta.msg} </div> ) :null}
            <div className='contenedor-form sombra-dark'>
                <h1>Iniciar sesión</h1>
                <form
                    onSubmit={onSubmit}
                >
                    <div className='campo-form'>
                        <label htmlFor='email'>Email</label>
                        <input 
                            type='email'
                            id='email'
                            name='email'
                            placeholder='Tu email'
                            value={email}
                            onChange={onChange}
                        />
                    </div>
                    <div className='campo-form'>
                        <label htmlFor='password'>Password</label>
                        <input 
                            type='password'
                            id='password'
                            name='password'
                            placeholder='Tu password'
                            value={password}
                            onChange={onChange}
                        />
                    </div>
                    <div className='campo-form'>
                        <input type='submit' className='btn btn-primario btn-block' value='Iniciar Sesión'/> 
                    </div>
                </form>
                <Link to={'/signup'} className='enlace-cuenta'>Crear cuenta</Link>

            </div>

        </div>
    );
};

export default Login;