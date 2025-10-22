import { auth, db } from './firebase.js';
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const CommitteRef = collection(db, "Committe");

onAuthStateChanged(auth, user => 
{
  if (!user) return window.location.href = "index.html";
  
  // Load Committes on page load
  readCommittes();
});

// READ
window.readCommittes = async function () 
{
  const snapshot = await getDocs(CommitteRef);
  const table = document.getElementsByClassName("CommitteTable")[0];
  table.innerHTML = "<thead><tr><th>Committe Member Name</th><th>Position</th></tr></thead>";

  snapshot.forEach(docSnap => 
  {
    const data = docSnap.data();
    const row = document.createElement("tr");
    
    row.innerHTML = `
      <td>${data.CommitteMemberName}</td>
      <td>${data.Position}</td>
    `;
    table.appendChild(row);
  });

  document.getElementById("TotalIncome").textContent  = getTotalIncome() + "";
  document.getElementById("TotalExpense").textContent  = getTotalExpenses() + "";
};

async function getTotalIncome() 
{
  const querySnapshot = await getDocs(collection(db, "Income"));
  let total = 0;

  querySnapshot.forEach(doc => 
  {
    const data = doc.data();
    const amount = parseFloat(data.Amount);
    
    if (!isNaN(amount)) 
    {
      total += amount;
    }
  });

  document.getElementById("TotalIncome").textContent  = `₹${total.toFixed(2)}`;
  //console.log("Total Income:", total);
}

async function getTotalExpenses() 
{
  const querySnapshot = await getDocs(collection(db, "Expense"));
  let total = 0;

  querySnapshot.forEach(doc => 
  {
    const data = doc.data();
    const amount = parseFloat(data.Amount);
    
    if (!isNaN(amount)) 
    {
      total += amount;
    }
  });

  document.getElementById("TotalExpense").textContent  = `₹${total.toFixed(2)}`;
  //console.log("Total Expense:", total);
}