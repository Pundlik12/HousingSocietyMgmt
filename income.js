import { auth, db } from './firebase.js';
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { addDoc, collection } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

onAuthStateChanged(auth, user => 
{
  if (!user) return window.location.href = "index.html";

  document.getElementById("RoomNo").addEventListener("input", () => 
  {
    const RoomNo = document.getElementById("RoomNo").value.trim();
    const ownersData = 
    {
        "101": "Alice Sharma",
        "102": "Bob Mehta",
        "103": "Charlie Desai",
        "104": "Diana Kapoor"
    };

    const name = ownersData[RoomNo] || "";
    document.getElementById("OwnerName").value = name;
  });

  // async function lookupOwner() 
  // {
  //   const RoomNo = document.getElementById("RoomNo").value.trim();
  //   const OwnerName = document.getElementById("OwnerName");

  //   if (!RoomNo) 
  //   {
  //     OwnerName.value = "";
  //     document.getElementById("RoomNo").focus();
  //     return;
  //   }

  //   try 
  //   {
  //     const docRef = doc(db, "Owners", RoomNo);
  //     const docSnap = await getDoc(docRef);

  //     if (docSnap.exists()) 
  //     {
  //       const data = docSnap.data();
  //       OwnerName.value = data.name;
  //     } 
  //     else 
  //     {
  //       OwnerName.value = "";
  //     }
  //   }
  //   catch (error) 
  //   {
  //     console.error("Error fetching owner name:", error);
  //     alert("Error fetching owner name:", error.message);
  //   }
  // }

  document.getElementById("saveData").onclick = async (e) => 
  {
    e.preventDefault();
    const RoomNo  = document.getElementById("RoomNo").value;
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
        await addDoc(collection(db, "Income"), {
          RoomNo: RoomNo,
          TrnDate: TrnDate,
          PaymentMode: PaymentMode,
          ReferenceNumber: ReferenceNumber,
          Amount: Amount,
          Comments: Comments,
          CreatedDate: new Date()
        });
        
        const form  = document.getElementById("IncomeForm");
        form.reset();

        alert("Income entry added successfully.");
      }
      catch (error) 
      {
        alert("Error adding income entry:", error.message);
        console.error("Error adding income entry:", error.message);
      }
    }
  };
});