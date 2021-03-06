import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { auth, createUserProfileDocument } from './firebase/firebase.utils';


import Header from './components/header/header.component';
import HomePage from './pages/homepage.component';
import ShopPage from './pages/shop/shop.component';
import SignInSignUpPage from './pages/sign-in-sign-up/sign-in-sign-up.component';

import { setCurrentUser } from './redux/user/user.actions';


import './App.css';

class App extends React.Component {

  unsubscribeFromAuth = null

  componentDidMount() {
    const { setCurrentUser } = this.props
    this.unsubscribeFromAuth = auth.onAuthStateChanged( async userAuth => {
      if ( userAuth ) {
        const userRef = await createUserProfileDocument( userAuth );

        userRef.onSnapshot( snapShot => {
          setCurrentUser( {
            id: snapShot.id,
            ...snapShot.data()
          } )
        } );
      }

      setCurrentUser( userAuth );
    } );
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth()
  }

  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path='/' component={ HomePage } />
          <Route path='/shop' component={ ShopPage } />
          <Route
            exact
            path='/signin'
            render={ () =>
              this.props.currentUser ?
                ( <Redirect to='/' /> ) :
                ( <SignInSignUpPage /> ) }
          />
        </Switch>
      </div >
    );
  }

}

const mapStateToProps = ( { user } ) => ( {
  currentUser: user.currentUser
} );


const maDispatchToProps = dispatch => ( {
  setCurrentUser: user => dispatch( setCurrentUser( user ) )
} )

export default connect(
  mapStateToProps, maDispatchToProps
)( App );
