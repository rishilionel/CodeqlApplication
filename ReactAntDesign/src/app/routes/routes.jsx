import NotFound from 'app/views/home/NotFound'
import PersonRoutes from 'app/views/Person/PersonRoutes'
import MatxLayout from '../components/MatxLayout/MatxLayout'
import homeRoutes from 'app/views/home/HomeRoutes'
import { Navigate } from 'react-router-dom'
export const AllPages = () => {
    const all_routes = [
        {
            element: <MatxLayout />,
            children: [...homeRoutes, ...PersonRoutes],
        },
        {
            path: '/',
            element: <Navigate to="home" />,
        },
        {
            path: '*',
            element: <NotFound />,
        },
    ]
    return all_routes
}
