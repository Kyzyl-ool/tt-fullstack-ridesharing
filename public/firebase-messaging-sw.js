importScripts('https://www.gstatic.com/firebasejs/7.15.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.15.0/firebase-messaging.js');

const config = {
    apiKey: 'AIzaSyBuahCKvh1qBwvi_rWIlFTjW0d3cOUam6U',
    authDomain: 'ridesharing-97d64.firebaseapp.com',
    databaseURL: 'https://ridesharing-97d64.firebaseio.com',
    projectId: 'ridesharing-97d64',
    storageBucket: 'ridesharing-97d64.appspot.com',
    messagingSenderId: '992567280786',
    appId: '1:992567280786:web:2c7cc8b2bc6a876295524b',
    measurementId: 'G-NR1FBNG3QY'
};
firebase.initializeApp(config);
const messaging = firebase.messaging();
