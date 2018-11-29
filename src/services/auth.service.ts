import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase';
import AuthProvider = firebase.auth.AuthProvider;

@Injectable()
export class AuthService {
    private user: firebase.User;

    constructor(public afAuth: AngularFireAuth) {
		afAuth.authState.subscribe(user => {
            this.user = user;
        });

	}

	signInWithEmail(credentials) {
		console.log('Sign in with email');
		return this.afAuth.auth.signInWithEmailAndPassword(credentials.email,
			 credentials.password);
    }
    
    signUp(credentials) {
        return this.afAuth.auth.createUserWithEmailAndPassword(credentials.email, credentials.password)
    }

    getID() {
        return this.afAuth.auth.currentUser.uid;
    }

    getCurrentUser() {
        return this.afAuth.auth.currentUser;
    }

    

    // verify(credentials) {
    //     return this.afAuth.auth.signInWithPhoneNumber(credentials.phoneNumber, credentials.applicationVerifier)
    // }

}