import { auth, db } from './firebase.js';
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { addDoc, collection } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

onAuthStateChanged(auth, user => 
{
  if (!user) return window.location.href = "index.html";

  document.getElementById("saveData").onclick = async (e) => 
  {
    e.preventDefault();
    const TrnDate  = document.getElementById("TrnDate").value;
    const PaymentMode = document.getElementById("PaymentMode").value;
    const ReferenceNumber  = document.getElementById("ReferenceNumber").value;
    const Amount  = document.getElementById("Amount").value;
    const Comments = document.getElementById("Comments").value;
    
    alert(`TrnDate: ${TrnDate}
      PaymentMode: ${PaymentMode}
      ReferenceNumber: ${ReferenceNumber}
      Amount: ${Amount}
      Comments: ${Comments}`);

    if(TrnDate == "")
    {
      alert("Select Trn Date.")
    }
    else if(PaymentMode == "")
    {
      alert("Select Payment Mode.")
    }
    else if(ReferenceNumber == "")
    {
      alert("Enter Reference Number.")
    }
    else if(Amount == "")
    {
      alert("Enter Amount.")
    }
    else if(Comments == "")
    {
      alert("Enter Comments.")
    }
    else
    {
      try
      {
        await addDoc(collection(db, "Expense"), {
                  TrnDate: TrnDate,
                  PaymentMode: PaymentMode,
                  ReferenceNumber: ReferenceNumber,
                  Amount: Amount,
                  Comments: Comments,
                  CreatedDate: new Date()
                });

        const form  = document.getElementById("ExpenseForm");
        form.reset();

        alert("Expense entry added successfully.");
      }
      catch(error)
      {
        alert("Error adding expense entry:", error.message);
        console.error("Error adding expense entry:", error.message);
      }
    }
  };
});
