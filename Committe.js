import { auth, db } from './firebase.js';
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const CommitteRef = collection(db, "Committe");
let CommitteID = "";

onAuthStateChanged(auth, user => 
{
  if (!user) return window.location.href = "index.html";
  
  // Load Committes on page load
  readCommittes();
});

// CREATE
window.createCommitte = async function () 
{
  const CommitteMemberName  = document.getElementById("CommitteMemberName").value;
  const Position = document.getElementById("Position").value;
  
  if(CommitteMemberName == "")
  {
    alert("Enter Committe Member Name.")
  }
  else if(Position == "")
  {
    alert("Enter Wing Name.")
  }
  else
  {
    if(CommitteID == "")
    {
      await addDoc(CommitteRef, 
        { 
          CommitteMemberName: CommitteMemberName,
          Position: Position,
          CreatedDate: new Date()
        });

      alert("Committe member added successfully!");
    }
    else
    {
      const CommitteDoc = doc(db, "Committe", CommitteID);
      await updateDoc(CommitteDoc, 
        { 
          CommitteMemberName: CommitteMemberName,
          Position: Position,
          CreatedDate: new Date()
        });
      CommitteID = "";
      
      alert("Committe member updated successfully!");
    }
    document.getElementById("CommitteMemberName").value = "";
    document.getElementById("Position").value = "Select";
    readCommittes();
  }
};

// READ
window.readCommittes = async function () 
{
  const snapshot = await getDocs(CommitteRef);
  const table = document.getElementById("CommitteTable");
  table.innerHTML = "<tr><th>CommitteMemberName</th><th>Position</th><th>Actions</th></tr>";

  snapshot.forEach(docSnap => 
  {
    const data = docSnap.data();
    const row = document.createElement("tr");
    
    row.innerHTML = `
      <td>${data.CommitteMemberName}</td>
      <td>${data.Position}</td>
      <td>
        <button type="submit" onclick="editCommitte('${docSnap.id}', '${data.CommitteMemberName}', '${data.Position}')">Edit</button>
        <button type="submit" onclick="deleteCommitte('${docSnap.id}')">Delete</button>
      </td>
    `;
    table.appendChild(row);
  });
};

// UPDATE
window.editCommitte = function (id, CommitteMemberName, Position) 
{
  CommitteID = id;
  document.getElementById("CommitteMemberName").value = CommitteMemberName;
  document.getElementById("Position").value = Position;
};

// DELETE
window.deleteCommitte = async function (id) 
{
  await deleteDoc(doc(db, "Committe", id));
  alert("Committe member deleted successfully!");
  readCommittes();
};