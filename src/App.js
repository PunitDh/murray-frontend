import './App.css';
import { getProducts } from "./api/products";
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Product from './components/Product';
import { signIn, getToken } from "./api/auth";
import Header from "./components/Header";
import SignInForm from "./components/SignInForm";
import ProductList from "./components/ProductList";

function App() {
  const [token, setToken] = useState(getToken());
  const [products, setProducts] = useState(null);
  const [flash, setFlash] = useState();
  const signedIn = !!token;
  const requireAuth = render => props => (signedIn ? render(props) : <Redirect to="/signin" />);
  const handleSignin = ({email, password}) => signIn(email, password)
    .then(token => setToken(token))
    .catch(error => setFlash("Unable to log in at this time"));

  useEffect(() => {

    getProducts().then(products => setProducts(products)).catch(()=> setProducts([]));
    
  }, [token]);

  return (
    <div className="App">
      <Router>
        <Header />
        <main>
          { flash && <div>{flash}</div> }
        <Switch>
          <Route path="/signin" render={() => (signedIn ? ( <Redirect to="/products" /> ) : (
            <SignInForm onSignIn={handleSignin} />
          )) } />

          {
            products && (
              <Route path="/products/:id" render={({match: {params: {id}}}) => {
                return (<Product id={id} />);
              }} />
            )
          }

          {
            
              <Route path="/products" render={requireAuth(() => (
                <ProductList products={products} />
              ))} />
          }    
        </Switch>
        </main>
      </Router>
    </div>
  );
}



// class Appx extends React.Component {
//   state = { 
//     products: null,
//     token: getToken() 
//   }

//   componentDidMount() {
//     getProducts(this.state.token)
//       .then(products => {
//         this.setState({products: products})
//       })
//   }

//   componentDidUpdate(_, prevState) {
//     const { token } = this.state;
//     if (prevState.token !== token) {
//       getProducts(token)
//         .then(products => {
//           this.setState({ products: products });
//         });
//     }
//   }

//   handleSignin = ({email, password}) => {
//     signIn(email, password).then((token) => this.setState({token: token}))
//   }

//   render() {
//     const signedIn = !!this.state.token;
//     const requireAuth = render => props => (signedIn ? render(props) : <Redirect to="/signin" />);

//     return (
//       <div className="App">
//         <Router>
//           <Header />
//           <main>
//           <Switch>
//             <Route path="/signin" render={() => (signedIn ? ( <Redirect to="/products" /> ) : (
//               <SignInForm onSignIn={this.handleSignin} />
//             )) } />

//             {
//               this.state.products && (
//                 <Route path="/products/:id" render={({match: {params: {id}}}) => {
//                   const product = this.state.products.find(p => (p.id == id));
//                   return (<Product product={product} />);
//                 }} />
//               )
//             }

//             {
              
//                 <Route path="/products" render={requireAuth(() => (
//                   <ProductList products={this.state.products} />
//                 ))} />
//             }    
//           </Switch>
//           </main>
//         </Router>
//       </div>
//     );
//   }
// }

export default App;