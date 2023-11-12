import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { auth } from './config/firebase';
import routes from './config/routes';
import userStore from './store/UserStore';
import './App.css';
import routeInterface from './interfaces/route.interface';

export interface IApplicationProps { }

const App: React.FunctionComponent<IApplicationProps> = props => {
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    auth.onAuthStateChanged(async user => {
      if (user) {
        await userStore.getUser();
      }
      setLoading(false);
    })
  }, []);

  if (loading)
    return <div className='loader-container'>loading
      <span className='loadingAnim1'>.</span>
      <span className='loadingAnim2'>.</span>
      <span className='loadingAnim3'>.</span>
    </div>

  const recursiveRoute = (route: routeInterface) => {
    return <Route
      path={route.path}
      key={route.index}
      element={<route.component />}
    >
      {route.children && route.children.map((route) =>
        recursiveRoute(route)
      )}
    </Route>
  };

  return (
    <Router>
      <Routes>
        {routes.map((route) =>
          recursiveRoute(route)
        )}
      </Routes>
    </Router>
  );
}

export default App;