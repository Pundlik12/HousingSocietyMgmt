import { auth, db } from './firebase.js';
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { setDoc, doc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

document.getElementById("registerBtn").onclick = async () => 
{
	try 
	{
		const firstName = document.getElementById("FirstName").value;
		const middleName = document.getElementById("MiddleName").value;
		const lastName = document.getElementById("LastName").value;
		const email = document.getElementById("email").value;
		const password = document.getElementById("password").value;

		if(firstName == "")
		{
		  alert("Please enter First Name.");
		}
		else if(lastName == "")
		{
		  alert("Please enter Last Name.");
		}
		else if(email == "")
		{
		  alert("Please enter Email.");
		}
		else if(password == "")
		{
		  alert("Please enter Password.");
		}
		else
		{
		  var strMsg = "";
		  const userCred = await createUserWithEmailAndPassword(auth, email, password).catch(err => strMsg = err.message);
		  
		  if(strMsg == "")
		  {
			await setDoc(doc(db, "users", userCred.user.uid), 
			{ 
				firstName: firstName, 
				middleName: middleName, 
				lastName: lastName, 
				email: email, 
				createdAt: new Date() 
			});
			window.location.href = "index.html";
		  }
		  else
		  {
			alert("Error:- " + strMsg)
		  }
		}
	}
	catch (e) 
	{
		alert(e.message);
	}
}
