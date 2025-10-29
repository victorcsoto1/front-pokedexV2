import AuthLogin from '../auth/AuthLogin'
import { useAuth } from '../auth/AuthProvider'
import { useNavigate } from 'react-router-dom'

export default function HomeOut () {

    const {usuario} = useAuth()

    const navigate = useNavigate();

    return (
        <>
            {
                usuario ? navigate('/pokedex/pokemon-list') : <AuthLogin />
            }
            
        </>
    )
}