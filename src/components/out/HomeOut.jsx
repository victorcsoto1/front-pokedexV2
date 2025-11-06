import { useEffect } from 'react';
import AuthLogin from '../auth/AuthLogin'
import { useAuth } from '../auth/AuthProvider'
import { useNavigate } from 'react-router-dom'
import { useLoading } from '../../context/LoadingContext';

export default function HomeOut () {

    const {usuario} = useAuth()
    const {setLoading} = useLoading()

    const navigate = useNavigate();

    useEffect(() => {
        setLoading(false)
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