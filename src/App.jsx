import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Fragment } from 'react';
import Body from './Body';
import Login from './Login';
import Profile from './Profile';
import { Provider } from 'react-redux'
import appStore from './utils/appStore'
import Feed from './Feed';
import Connections from './Connections';
import Requests from './Requests';


function App() {

  return (
    <Fragment>
      <Provider store={appStore}>
        <BrowserRouter basename="/">
          <Routes>
            <Route path="/" element={<Body />}>
            <Route path="/" element={<Feed/>} />
              <Route path="/login" element={<Login />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/connections" element={<Connections />} />
              <Route path="/requests" element={<Requests />} />

            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </Fragment>
  )
}

export default App;
