import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/firestore';



const config = {
    apiKey: "AIzaSyA0QKgf7fA6vqXl806sxVtMvZtJina7d34",
    authDomain: "pwa-proto-57e3b.firebaseapp.com",
    databaseURL: "https://pwa-proto-57e3b.firebaseio.com",
    projectId: "pwa-proto-57e3b",
    storageBucket: "pwa-proto-57e3b.appspot.com",
    messagingSenderId: "1089141973631",
    appId: "1:1089141973631:web:2d9af5dbbdcffeaa"
  };

class Firebase {
  constructor() {
    app.initializeApp(config);
    this.auth = app.auth();
    this.db = app.firestore();
    
  }
  doCreateUserWithEmailAndPassword = (email, password) =>
  this.auth.createUserWithEmailAndPassword(email, password);


  doSignInWithEmailAndPassword = (email, password) =>
  this.auth.signInWithEmailAndPassword(email, password);

  doSignOut = () => this.auth.signOut();

  postOrder = (order) => this.db.collection("orders").add(order);
  getOrderStatus=async (orderId)=>{
    const orderRef = this.db.collection("orders").doc(orderId);
    let orderStatus ='pending';
    await orderRef.get().then(async(doc) =>{
      if (doc.exists) {
       let response=await doc.data();
       orderStatus=response.order[0].status
        } else {
            // doc.data() will be undefined in this case
        orderStatus='pending'
        }
    }).catch(function(error) {
        console.log("Error getting document:", error);
    });
    return orderStatus;
}

}

export default Firebase;