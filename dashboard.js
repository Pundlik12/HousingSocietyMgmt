import { auth, db } from './firebase.js';
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { collection, getDocs, query, sum, getAggregateFromServer } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const CommitteRef = collection(db, "Committe");
const IncomeRef = collection(db, "Income");
const ExpenseRef = collection(db, "Expense");

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

  getTotalIncome();
  getTotalExpenses();
};

async function getTotalIncome() 
{
  try 
  {
    const incomeQuery = query(IncomeRef);
    const aggregateSnapshot = await getAggregateFromServer(incomeQuery, {totalIncome: sum("Amount")});
    const total = aggregateSnapshot.data().totalIncome;
    console.log("Total Income:", total);
    document.getElementById("TotalIncome").textContent = `₹${total.toFixed(2)}`;
  }
  catch (error) 
  {
    console.log("Error fetching income:", error);
    document.getElementById("TotalIncome").textContent = "₹0.00";
  }
}

async function getTotalExpenses() 
{
  try 
  {
    const expenseQuery = query(ExpenseRef);
    const aggregateSnapshot1 = await getAggregateFromServer(expenseQuery, {totalExpense: sum("Amount")});
    const total1 = aggregateSnapshot1.data().totalExpense;
    console.log("Total Expense:", total1);
    document.getElementById("TotalExpense").textContent = `₹${total1.toFixed(2)}`;
  }
  catch (error) 
  {
    console.log("Error fetching expese:", error);
    document.getElementById("TotalExpense").textContent = "₹0.00";
  }
}