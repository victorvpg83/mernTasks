import React, {useState, useContext, useEffect} from 'react';
import { Link } from 'react-router-dom';
import AlertContext from '../../context/alerts/alertContext' 
import AuthContext from '../../context/auth/authContext'

const Signup = (props) => {

    //extract values context
    const alertContext = useContext(AlertContext)
    const {alerta, showAlert} = alertContext

    const authContext = useContext(AuthContext)
    const {message, authenticated, signupUser } = authContext

    //duplicated user
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
        name:'',
        email:'',
        password:'',
        confirm:''
    })

    // extract user
    const{name, email, password, confirm} = user

    const onChange= e=>{
        saveUser({
            ...user,
            [e.target.name] : e.target.value
        })
    }

    //user login

    const onSubmit = e =>{
        e.preventDefault()
        // validate empty camps
        if(name.trim()==='' || email.trim()==='' || password.trim()==='' || confirm.trim()==='') {
            showAlert('Todos los campos son obligatorios', 'alerta-error')
            return
        }
        // validate password
        if(password.length < 6) {
            showAlert('La contraseña ha de ser de al menos 6 caracteres', 'alerta-error')
            return
        }
        //valitate equal passwords
        if(password!==confirm){
            showAlert('Las contraseñas deben coincidir', 'alerta-error')
            return
        }
        //Pass to action
        signupUser({
            name,
            email,
            password
        })
    }

    return (
        <div className='form-usuario'>
            {alerta?(<div className={`alerta ${alerta.categoria}`}> {alerta.msg} </div> ) :null}
            <div className='contenedor-form sombra-dark'>
                <h1>Crear cuenta</h1>
                <form
                    onSubmit={onSubmit}
                >
                    <div className='campo-form'>
                        <label htmlFor='name'>Nombre</label>
                        <input 
                            type='text'
                            id='name'
                            name='name'
                            placeholder='Tu nombre'
                            value={name}
                            onChange={onChange}
                        />
                    </div>
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
                            placeholder='Password'
                            value={password}
                            onChange={onChange}
                        />
                    </div>
                    <div className='campo-form'>
                        <label htmlFor='confirm'>Confirmar Password</label>
                        <input 
                            type='password'
                            id='confirm'
                            name='confirm'
                            placeholder='Repite el password'
                            value={confirm}
                            onChange={onChange}
                        />
                    </div>
                    <div className='campo-form'>
                        <input type='submit' className='btn btn-primario btn-block' value='Registrarme'/> 
                    </div>
                </form>
                <Link to={'/'} className='enlace-cuenta'>Iniciar sesión</Link>

            </div>

        </div>
    );
};

export default Signup;