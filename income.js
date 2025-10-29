import { auth, db } from './firebase.js';
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { collection, query, where, getDocs, addDoc, Timestamp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

onAuthStateChanged(auth, user => 
{
  if (!user) return window.location.href = "index.html";

  document.getElementById("RoomNo").addEventListener("input", () => 
  {
    lookupOwner();
  });

  async function lookupOwner() 
  {
    const RoomNo = document.getElementById("RoomNo").value.trim();
    const OwnerName = document.getElementById("OwnerName");

    if (!RoomNo) 
    {
      OwnerName.value = "";
      document.getElementById("RoomNo").focus();
      return;
    }

    try 
    {
      const q = query(collection(db, "Owner"), where("RoomNo", "==", RoomNo));
      const snapshot = await getDocs(q);

      if (!snapshot.empty) 
      {
        const data = snapshot.docs[0].data();
        //alert("Owner Name: " + data.OwnerName);
        document.getElementById("OwnerName").value = data.OwnerName;
        document.getElementById("MaintenanceAmount").value = data.MaintenanceAmount;
        document.getElementById("TrnDate").focus();
      } 
      else 
      {
        //alert("Not found");
        document.getElementById("OwnerName").value = "";
        document.getElementById("MaintenanceAmount").value = "";
      }
    }
    catch (error) 
    {
      //console.error("Error fetching owner name:", error);
      alert("Error fetching owner name:", error.message);
    }
  }

  document.getElementById("saveData").onclick = async (e) => 
  {
    e.preventDefault();
    const RoomNo  = document.getElementById("RoomNo").value;
    const OwnerName  = document.getElementById("OwnerName").value;
    const TrnDate = document.getElementById("TrnDate").value;
    const PaymentMode  = document.getElementById("PaymentMode").value;
    const ReferenceNumber  = document.getElementById("ReferenceNumber").value;
    const Amount = document.getElementById("Amount").value;
    const Comments = document.getElementById("Comments").value;

    // alert(`RoomNo: ${RoomNo}
    //       TrnDate: ${TrnDate}
    //       PaymentMode: ${PaymentMode}
    //       ReferenceNumber: ${ReferenceNumber}
    //       Amount: ${Amount}
    //       Comments: ${Comments}`);

    if(RoomNo == "")
    {
      alert("Enter Room No.");
      document.getElementById("RoomNo").focus();
    }
    else if(OwnerName == "")
    {
      alert("Incorrect Room No.");
      document.getElementById("RoomNo").focus();
    }
    else if(TrnDate == "")
    {
      alert("Select Trn Date.");
      document.getElementById("TrnDate").focus();
    }
    else if(PaymentMode == "")
    {
      alert("Select Payment Mode.");
      document.getElementById("PaymentMode").focus();
    }
    else if(ReferenceNumber == "")
    {
      alert("Enter Reference Number.");
      document.getElementById("ReferenceNumber").focus();
    }
    else if(Amount == "")
    {
      alert("Enter Amount.");
      document.getElementById("Amount").focus();
    }
    else if(Comments == "")
    {
      alert("Enter Comments.");
      document.getElementById("Comments").focus();
    }
    else
    {
      try 
      {
        const jsTrnDate = new Date(TrnDate);
        const timeStampTrnDate = Timestamp.fromDate(jsTrnDate);

        await addDoc(collection(db, "Income"), {
          RoomNo: RoomNo,
          TrnDate: timeStampTrnDate,
          PaymentMode: PaymentMode,
          ReferenceNumber: ReferenceNumber,
          Amount: parseFloat(Amount),
          Comments: Comments,
          CreatedDate: new Date()
        });
        
        document.getElementById("RoomNo").value = "";
        document.getElementById("TrnDate").value = "";
        document.getElementById("PaymentMode").value = "";
        document.getElementById("ReferenceNumber").value = "";
        document.getElementById("Amount").value = "";
        document.getElementById("Comments").value = "";

        alert("Income entry added successfully.");
      }
      catch (error) 
      {
        alert("Error adding income entry:", error.message);
        //console.error("Error adding income entry:", error.message);
      }
    }
  };
});