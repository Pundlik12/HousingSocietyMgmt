import { auth, db } from './firebase.js';
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { addDoc, query, getDocs, orderBy, collection } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

onAuthStateChanged(auth, user => 
{
  if (!user) return window.location.href = "index.html";

  // async function loadData() 
  // {
  //     alert('On load function..');
  //     const q = query(collection(db, "Income"), orderBy("date", "desc"));
  //     const snapshot = await getDocs(q);
      
  //     const tbody = document.querySelector("#dataTable tbody");
  //     tbody.innerHTML = "";
      
  //     snapshot.forEach(doc => {
  //       const { RoomNo, TrnDate, PaymentMode, ReferenceNumber, Amount, Comments } = doc.data();
  //       //const row = `<tr><td>${name}</td><td>₹${amount}</td><td>${date}</td></tr>`;
  //       const row = `<tr>
  //         <th>${RoomNo}</th>
  //         <th>${TrnDate}</th>
  //         <th>${PaymentMode}</th>
  //         <th>${ReferenceNumber}</th>
  //         <th>${Amount}</th>
  //         <th>${Comments}</th>
  //       </tr>`
  //       tbody.innerHTML += row;
  //     });
  // }

  document.getElementById("saveData").onclick = async () => 
  {
    const RoomNo  = document.getElementById("RoomNo").value;
    const TrnDate = document.getElementById("TrnDate").value;
    const PaymentMode  = document.getElementById("PaymentMode").value;
    const ReferenceNumber  = document.getElementById("ReferenceNumber").value;
    const Amount = document.getElementById("Amount").value;
    const Comments = document.getElementById("Comments").value;

    if(RoomNo == "")
    {
      alert("Enter Room No.")
    }
    else if(TrnDate == "")
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
      await addDoc(collection(db, "users", user.uid, "Income"), {
        RoomNo,
        TrnDate,
        PaymentMode,
        ReferenceNumber,
        Amount,
        Comments,
        CreatedDate: new Date()
      });
      
      const form  = document.getElementById("IncomeForm");
      form.reset();

      alert("Income saved!");
    }
  };
});
