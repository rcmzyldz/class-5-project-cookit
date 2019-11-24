import React, { Component } from 'react';
import './EpicMenu.css';
import searchIcon from './search-icon.png';
import firebase from "firebase"
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth"

firebase.initializeApp({
    apiKey: "AIzaSyDKKpTxO6tDfpZ-twIm9UeKn1jA1u5WyWQ",
    authDomain: "cookit-39cc5.firebaseapp.com"
  })
  

class EpicMenu extends Component {
    state = { isSignedIn: false }
    uiConfig = {
      signInFlow: "popup",
      signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.FacebookAuthProvider.PROVIDER_ID,
        firebase.auth.GithubAuthProvider.PROVIDER_ID,
        firebase.auth.EmailAuthProvider.PROVIDER_ID
      ],
      callbacks: {
        signInSuccess: () => false
      }
    }
  
    componentDidMount = () => {
      firebase.auth().onAuthStateChanged(user => {
        this.setState({ isSignedIn: !!user })
        console.log("user", user)
      })
    }

    constructor() {
        super();

        this.state = {
            showForm: false,
            showMenu:false
        };
    }

    showForm() {
        this.setState({
            showForm: !this.state.showForm
        });
    }
    showMenu() {
        this.setState({
            showMenu: !this.state.showMenu
        });
    }

    render() {
        let searchForm = this.state.showForm ? (
            <form className="menu__search-form" method="POST">
                <input className="menu__search-input" placeholder="Type and hit enter" />
            </form>
        ) : '';
        let loginForm = this.state.showMenu ? (
            <form className="login-form" method="POST">
               <StyledFirebaseAuth
            uiConfig={this.uiConfig}
            firebaseAuth={firebase.auth()}
          /> 
            </form>
           
        ): '';
        

        let linksMarkup = this.props.links.map((link, index) => {
            let linkMarkup = link.active ? (
                <a className="menu__link menu__link--active" href={link.link}>{link.label}</a>
            ) : (
                <a className="menu__link" href={link.link}>{link.label}</a>
            );

            return (
                <li key={index} className="menu__list-item">
                    {linkMarkup}
                </li>
            );
        });

        return (
            <nav className="menu">
                <h1 style={{
                backgroundImage: 'url(' + this.props.logo + ')'
                }} className="menu__logo">CookIt.</h1>

                <div className="menu__right">
                    <ul className="menu__list">
                        {linksMarkup}
                    </ul>

                    <button onClick={this.showForm.bind(this)} style={{
                    backgroundImage: 'url(' + searchIcon + ')'
                    }} className="menu__search-button"></button>

                    {searchForm}
                    <button onClick={this.showMenu.bind(this)} 
                    className="login-button">Login</button>

                    {loginForm}
                    
                </div>
            </nav>
   
        )
    }
    
}

export default EpicMenu;