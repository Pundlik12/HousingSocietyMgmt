// Logout functionality
document.getElementById("logoutBtn").addEventListener("click", function () 
{
  localStorage.removeItem('UserName');
  localStorage.removeItem('userPreferences');
  //alert("You have been logged out.");
  window.location.href = "index.html"; // Redirect to login page
});

// Active menu highlight
const links = document.querySelectorAll(".sidebar a");
links.forEach(link => 
{
  if (link.href === window.location.href) 
  {
    link.classList.add("active");
  }
});

// Collapsible sidebar
document.getElementById("toggleSidebar").addEventListener("click", () => 
{
  document.querySelector(".sidebar").classList.toggle("collapsed");
});

// Dark mode toggle
document.getElementById("darkModeToggle").addEventListener("click", () => 
{
  document.body.classList.toggle("dark-mode");
});

window.addEventListener('DOMContentLoaded', () => 
{
  const userToken = localStorage.getItem('UserName');
  
  if (userToken) 
  {
    console.log('User is already logged in:', userToken);
  }
  else
  {
    window.location.href = "index.html";
  }
});
