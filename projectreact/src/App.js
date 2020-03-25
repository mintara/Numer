import React from 'react';
import { Layout, Breadcrumb } from 'antd';
import './App.css';
import { Router, Route, Link, browserHistory } from 'react-router-3';
import H from './Header'

import Bisection from './RootOfEquation/Bisection';
import Falseposition from './RootOfEquation/Falseposition';
import Onepoint from './RootOfEquation/Onepoint';
import Newton from './RootOfEquation/Newton';
import Secant from './RootOfEquation/Secant';
import Taylor from './RootOfEquation/Taylor';
import CramerRule from './LinearAlgebra/CramerRule';
import Gauss from './LinearAlgebra/Gauss';
import LU from './LinearAlgebra/LU';
import Jacobi from './LinearAlgebra/Jacobi';
import Trapzaidol from './Intergation/Trapzaidol';
import Simson from './Intergation/Simson'
import NSimson from './Intergation/Nsimson';
import NTrapzaidol from './Intergation/NTrapzaidol';

function App() {
  return (
    <div className="App">
      <H/>
      <Router history={browserHistory} >
        <Route path="/falseposition" component={Falseposition} />
        <Route path="/bisection" component={Bisection} />
        <Route path="/onepoint" component={Onepoint} />
        <Route path="/newton" component={Newton} />
        <Route path="/secant" component={Secant} />
        <Route path="/gauss" component={Gauss} />
        <Route path="/taylor" component={Taylor} />
        <Route path="/cramer" component={CramerRule} />
        <Route path="/jacobi" component={Jacobi} />
        <Route path="/lu" component={LU} />
        <Route path="/trapzaidol" component={Trapzaidol} />
        <Route path="/simson" component={Simson} />
        <Route path="/nsimson" component={NSimson} />
        <Route path="/ntrapzaidol" component={NTrapzaidol} />
      </Router>
    </div>
  );
}

export default App;
