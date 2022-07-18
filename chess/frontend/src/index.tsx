import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// import { initializeApp } from "firebase/app";

// const app = initializeApp({
// 	apiKey: "AIzaSyBahvY_-hhu73f0rKIse3ChRRkxldsWInU",
// 	authDomain: "chess-a5411.firebaseapp.com",
// 	projectId: "chess-a5411",
// 	storageBucket: "chess-a5411.appspot.com",
// 	messagingSenderId: "293119338777",
// 	appId: "1:293119338777:web:26e87e2746952b3dd4fd88",
// 	measurementId: "G-7XG9GG7BBC"
// });

const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement
);
root.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
);
reportWebVitals();
