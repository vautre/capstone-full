import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import App from './App'
import Home from './Components/Home/Home'
import AboutUs from './pages/Aboutpage'
import Gallery from './pages/Gallery'
import UpcomingEvents from './pages/UpcomingEvents'
import Membership from './pages/Membership'
import Contact from './pages/Contact'
import Loginform from './pages/Loginform'

const routes = [
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'about-us',
        element: <AboutUs />,
      },
      {
        path: 'gallery',
        element: <Gallery />,
      },
      {
        path: 'upcoming-events',
        element: <UpcomingEvents />,
      },
      {
        path: 'membership',
        element: <Membership />,
      },
      {
        path: 'contact-us',
        element: <Contact />,
      },
      {
        path: 'sign-in',
        element: <Loginform />,
      },
    ],
  },
];

const router = createBrowserRouter(routes);

createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
);
