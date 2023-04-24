import { db, getData } from "./firestore.config.js";

const data = await getData('dishes')

const form = document.querySelector('form')
form.addEventListener('submit', evt => {
	evt.preventDefault()
	console.log(1234);
})