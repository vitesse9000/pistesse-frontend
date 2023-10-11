import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router';
import { createBrowserRouter } from 'react-router-dom';
import { loadAuthentication } from '../actions/auth';
import routes from '../routes';
import { store } from '../store';

const router = createBrowserRouter(routes);
store.dispatch(loadAuthentication());

const App = () => {
  return (
    <Provider store={store}>
      <div className="container-sm">
        <div className="row m-5">
          <div className="col-auto mx-auto">
            <RouterProvider router={router} />
          </div>
        </div>
      </div>
    </Provider>
  );
};

export default App;
