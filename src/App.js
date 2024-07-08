import './assets/css/styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import './assets/css/main.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import routes from './components/router/routes';

function App() {
  //const [auth, setAuth] = useState(false)
  const router = createBrowserRouter(routes)

  return (
        <>
          <RouterProvider router={router} /> 
        </>
  );
}

export default App;
