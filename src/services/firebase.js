import firebase from 'firebase';

const config = {
  apiKey: 'AIzaSyAaVKoMFTqT1iOz7-6VmB9zR_3W5_QrBEk',
  authDomain: 'toseelist-8ee9a.firebaseapp.com',
  databaseURL: 'https://toseelist-8ee9a.firebaseio.com',
  projectId: 'toseelist-8ee9a',
  storageBucket: 'toseelist-8ee9a.appspot.com',
  messagingSenderId: '331528406952',
};

firebase.initializeApp(config);

export const moviesListChild = firebase.database().ref().child('movieslist'); // eslint-disable-line
