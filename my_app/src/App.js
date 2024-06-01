import logo from './logo.svg';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import ProductList from './components/ProductList';
import ProductDetails from './components/ProductDetails';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
   <Router>
    <Routes>
      <Route path='/categories/:categoryname/:productid' Component={ProductDetails}></Route>
      <Route path='/categories/:categoryname/products' Component={ProductList}></Route>
    </Routes>
   </Router>
  );
}

export default App;
