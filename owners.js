import { auth, db } from './firebase.js';
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const ownerRef = collection(db, "Owner");
let OwnerID = "";

onAuthStateChanged(auth, user => 
{
  if (!user) return window.location.href = "index.html";
  
  // Load Owners on page load
  readOwners();
});

// CREATE
window.createOwner = async function () 
{
  const OwnerName  = document.getElementById("OwnerName").value;
  const WingName = document.getElementById("WingName").value;
  const FloorNumber  = document.getElementById("FloorNumber").value;
  const RoomNo  = document.getElementById("RoomNo").value;
  const Area = document.getElementById("Area").value;
  const MaintenanceAmount = document.getElementById("MaintenanceAmount").value; 
  const MobileNumber  = document.getElementById("MobileNumber").value;
  const EmailID = document.getElementById("EmailID").value;

  if(OwnerName == "")
  {
    alert("Enter Owner Name.")
  }
  else if(WingName == "")
  {
    alert("Enter Wing Name.")
  }
  else if(FloorNumber == "")
  {
    alert("Enter Floor Number.")
  }
  else if(RoomNo == "")
  {
    alert("Enter Room No.")
  }
  else if(Area == "")
  {
    alert("Enter Area in sq ft.")
  }
  else if(MaintenanceAmount == "")
  {
    alert("Enter Maintenance Amount.")
  }
  else if(MobileNumber == "")
  {
    alert("Enter Mobile Amount.")
  }
  else
  {
    if(OwnerID == "")
    {
      await addDoc(ownerRef, 
        { 
          OwnerName: OwnerName,
          WingName: WingName,
          FloorNumber: FloorNumber,
          RoomNo: RoomNo, 
          Area: parseFloat(Area),
          MaintenanceAmount: parseFloat(MaintenanceAmount), 
          MobileNumber: MobileNumber, 
          EmailID: EmailID,
          CreatedDate: new Date()
        });

      alert("Owner added!");
    }
    else
    {
      const ownerDoc = doc(db, "Owner", OwnerID);
      await updateDoc(ownerDoc, 
        { 
          OwnerName: OwnerName,
          WingName: WingName,
          FloorNumber: FloorNumber,
          RoomNo: RoomNo, 
          Area: parseFloat(Area), 
          MaintenanceAmount: parseFloat(MaintenanceAmount), 
          MobileNumber: MobileNumber, 
          EmailID: EmailID,
          CreatedDate: new Date()
        });
      OwnerID = "";
      
      alert("Owner updated!");
    }
    document.getElementById("OwnerName").value = "";
    document.getElementById("WingName").value = "";
    document.getElementById("FloorNumber").value = "";
    document.getElementById("RoomNo").value = "";
    document.getElementById("Area").value = "";
    document.getElementById("MaintenanceAmount").value = ""; 
    document.getElementById("MobileNumber").value = "";
    document.getElementById("EmailID").value = "";
    readOwners();
  }
};

// READ
window.readOwners = async function () 
{
  const snapshot = await getDocs(ownerRef);
  const table = document.getElementById("ownerTable");
  table.innerHTML = "<tr><th>OwnerName</th><th>WingName</th><th>FloorNumber</th><th>RoomNo</th><th>Area</th><th>MaintenanceAmount</th><th>MobileNumber</th><th>EmailID</th><th>Actions</th></tr>";

  snapshot.forEach(docSnap => 
  {
    const data = docSnap.data();
    const row = document.createElement("tr");
    
    row.innerHTML = `
      <td>${data.OwnerName}</td>
      <td>${data.WingName}</td>
      <td>${data.FloorNumber}</td>
      <td>${data.RoomNo}</td>
      <td>${data.Area}</td>
      <td>${data.MaintenanceAmount}</td>
      <td>${data.MobileNumber}</td>
      <td>${data.EmailID}</td>
      <td>
        <button type="submit" onclick="editOwner('${docSnap.id}', '${data.OwnerName}', '${data.WingName}', '${data.FloorNumber}', '${data.RoomNo}', '${data.Area}', '${data.MaintenanceAmount}', '${data.MobileNumber}', '${data.EmailID}')">Edit</button>
        <button type="submit" onclick="deleteOwner('${docSnap.id}')">Delete</button>
      </td>
    `;
    table.appendChild(row);
  });
};

// UPDATE
window.editOwner = function (id, OwnerName, WingName, FloorNumber, RoomNo, Area, MaintenanceAmount, MobileNumber, EmailID) 
{
  OwnerID = id;
  document.getElementById("OwnerName").value = OwnerName;
  document.getElementById("WingName").value = WingName;
  document.getElementById("FloorNumber").value = FloorNumber;
  document.getElementById("RoomNo").value = RoomNo;
  document.getElementById("Area").value = Area;
  document.getElementById("MaintenanceAmount").value = MaintenanceAmount;
  document.getElementById("MobileNumber").value = MobileNumber;
  document.getElementById("EmailID").value = EmailID;
};

// DELETE
window.deleteOwner = async function (id) 
{
  await deleteDoc(doc(db, "Owner", id));
  alert("Owner deleted!");
  readOwners();
};