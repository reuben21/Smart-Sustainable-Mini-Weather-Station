// Set the configuration for your app
// TODO: Replace with your project's config object
import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyC_ZYvv1z98d-U20RQHV3NBQLTA7fkTn8M",
    authDomain: "weatherapp-37431.firebaseapp.com",
    databaseURL: "https://weatherapp-37431.firebaseio.com",
    projectId: "weatherapp-37431",
    storageBucket: "weatherapp-37431.appspot.com",
    messagingSenderId: "823084972558",
    appId: "1:823084972558:web:4df12e5ddf80dda7d9da5f",
    measurementId: "G-QM02EGM77D"
};
// export default !firebase.apps.length ? firebase.initializeApp(DR_CONFIG) : firebase.app();
firebase.initializeApp(firebaseConfig);
export default firebase;