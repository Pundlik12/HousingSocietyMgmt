import { auth, db } from './firebase.js';
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { addDoc, query, getDocs, orderBy, collection } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

onAuthStateChanged(auth, user => 
{
  if (!user) return window.location.href = "index.html";
  
  // async function loadData() 
  // {
  //     alert('On load function..');
  //     const q = query(collection(db, "Owner"), orderBy("date", "desc"));
  //     const snapshot = await getDocs(q);
      
  //     const tbody = document.querySelector("#dataTable tbody");
  //     tbody.innerHTML = "";
      
  //     snapshot.forEach(doc => {
  //       const { OwnerName, WingName, FloorNumber, RoomNo, Area, MaintenanceAmount, MobileNumber, EmailID } = doc.data();
  //       //const row = `<tr><td>${name}</td><td>₹${amount}</td><td>${date}</td></tr>`;
  //       const row = `<tr>
  //         <th>${OwnerName}</th>
  //         <th>${WingName}</th>
  //         <th>${FloorNumber}</th>
  //         <th>${RoomNo}</th>
  //         <th>${Area}</th>
  //         <th>${MaintenanceAmount}</th>
  //         <th>${MobileNumber}</th>
  //         <th>${EmailID}</th>
  //       </tr>`
  //       tbody.innerHTML += row;
  //     });
  // }

  document.getElementById("saveData").onclick = async () => 
  {
    alert('In SaveData function of Owner.'); 
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
      await addDoc(collection(db, "users", user.uid, "Owner"), {
        OwnerName, 
        WingName, 
        FloorNumber, 
        RoomNo, 
        Area, 
        MaintenanceAmount, 
        MobileNumber, 
        EmailID,
        CreatedDate: new Date()
      });
      
      const form  = document.getElementById("OwnerForm");
      form.reset();
      
      alert("Owner saved!");
    }
  };
});
