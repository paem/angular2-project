import {Injectable} from "@angular/core";
import * as firebase from 'firebase';
import {AngularFire, AuthProviders, AuthMethods, FirebaseListObservable,FirebaseAuthState} from 'angularfire2';
import {Observable, Subject, BehaviorSubject} from "rxjs/Rx";
import {Router} from "@angular/router";



@Injectable()
export class AF {

  private _dbRoot: firebase.database.Reference;
  public email: string;
  public user: any;

  constructor(private af: AngularFire, private router: Router) {


  }



 isAuthenticated(): Observable<boolean> {
    const subject = new Subject<boolean>();
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        subject.next(true);
      } else {
        subject.next(false);
      }
    });
    return subject.asObservable();
 }



  /**
   * Logs the user in using their Email/Password combo
   * @param email
   * @param password
   * @returns {firebase.Promise<FirebaseAuthState>}
   */
  loginWithEmail(email, password) {
    return this.af.auth.login({
        email: email,
        password: password,
      },
      {
        provider: AuthProviders.Password,
        method: AuthMethods.Password,
      });
  }

  logInWithFacebook() {
    let provider = new firebase.auth.FacebookAuthProvider();

    return firebase.auth().signInWithPopup(provider).then(result => {

      // This gives you a Facebook Access Token. You can use it to access the Facebook API.
      let accessToken = result.credential.accessToken;

      // The signed-in user info.
      let user = result.user;

      // Creates or Updates /users/uid
      this._dbRoot.child('/users/' + user.uid).update({
        accessToken: accessToken,
        uid: user.uid,
        email: user.email,
      });
    });
  }

  /**
   * Logs out the current user
   */
  logout() {
    firebase.auth().signOut();
    this.router.navigate(['/login']);
  }


  /**
   *
   */









}
