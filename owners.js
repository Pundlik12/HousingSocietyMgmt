import { auth, db } from './firebase.js';
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { addDoc, collection } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

onAuthStateChanged(auth, user => 
{
  if (!user) return window.location.href = "index.html";
  
  document.getElementById("saveData").onclick = async (e) => 
  {
    e.preventDefault();
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
      try
      {
        await addDoc(collection(db, "Owner"), {
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

        alert("Owner added successfully.");
      }
      catch(error)
      {
        alert("Error adding owner entry:", error.message);
        console.error("Error adding owner entry:", error.message);
      }
    }
  };
});
