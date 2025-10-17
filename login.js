// login.js
import { auth } from './firebase.js';
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

window.onload = function () 
{
  const rememberedUser = localStorage.getItem("UserName");
  if (rememberedUser) 
  {
    document.getElementById("username").value = rememberedUser;
    document.getElementById("rememberMe").checked = true;
  }

  var div = document.getElementById("Progress");
  if (div.style.display === "none") 
  {
    div.style.display = "block"; // Show the div
  } 
  else 
  {
    div.style.display = "none"; // Hide the div
  }
};

function togglePassword() 
{
  const passwordInput = document.getElementById("password");
  passwordInput.type = passwordInput.type === "password" ? "text" : "password";
}
	
document.getElementById("loginBtn").onclick = async () => 
{
  try 
  {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const remember = document.getElementById("rememberMe").checked;
    
    if (!username || !password) 
    {
      alert("Please enter both emailid and password.");
      return;
    }
	
	  let strMsg = "";
    await signInWithEmailAndPassword(auth, username, password).catch(err => strMsg = err.message);

    if (strMsg === "") 
	  {
      localStorage.setItem("UserName", username);
      window.location.href = "dashboard.html";
    } 
    else 
    {
      alert("Error:- " + strMsg);
    }
  }
  catch (e) 
  {
    alert(e.message);
  }
};