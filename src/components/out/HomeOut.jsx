import { useEffect } from 'react';
import AuthLogin from '../auth/AuthLogin'
import { useAuth } from '../auth/AuthProvider'
import { useNavigate } from 'react-router-dom'

export default function HomeOut () {

    const {usuario} = useAuth()

    const navigate = useNavigate();

    useEffect(() => {
        console.log(usuario)
        if (usuario) {
            navigate('/pokedex/pokemon-list')
        }
    }, [usuario, navigate])

    return (
        <>
            {
                !usuario && <AuthLogin />
            }
            
        </>
    )
}