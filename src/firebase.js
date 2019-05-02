import * as firebase from 'firebase';

var config = {
    apiKey: "AIzaSyCtZRckPFBE3AWg9bV4D-AKk6Q2X7hdwWY",
    authDomain: "deva-bdf29.firebaseapp.com",
    databaseURL: "https://deva-bdf29.firebaseio.com",
    projectId: "deva-bdf29",
    storageBucket: "deva-bdf29.appspot.com",
    messagingSenderId: "1086853204024"
};
firebase.initializeApp(config);

export default firebase;