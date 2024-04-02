import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import HomePage from './pages/HomePage/HomePage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';

function App() {
	const router = createBrowserRouter([
		{
			element: <HomePage />,
			path: '/',
		},
		{
			element: <NotFoundPage />,
			path: '*',
		},
	]);

	return <RouterProvider router={router} />;
}

export default App;
