import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider,
} from 'react-router-dom';
import { Main } from '../layouts/main/main';
import { Home } from '../pages/home';
import { PostDetailsPage } from '../pages/post-details';

const routes = createRoutesFromElements(
    <Route element={<Main />}>
        <Route index element={<Home />} />
        <Route path='/post/:id' element={<PostDetailsPage />} />
    </Route>,
);

const router = createBrowserRouter(routes);

export const RoutesProvider = ({ children }) => {
    return <RouterProvider router={router}>{children}</RouterProvider>;
};
