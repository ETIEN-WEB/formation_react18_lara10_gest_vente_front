import AuthLayout from '../layout/AuthLayout';
import Login from '../modules/auth/Login';

const PublicRouter = (
    {
        path: '/',
        element : <AuthLayout />,
        children : [
            {
                path: '/login',
                element : <Login/>
            }        
        ]
    }
)

export default PublicRouter;