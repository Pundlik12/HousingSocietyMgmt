import { auth, db } from './firebase.js';
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { query, getDocs, orderBy, collection } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

onAuthStateChanged(auth, user => 
{
  if (!user) return window.location.href = "index.html";
  
  document.getElementById("submitData").onclick = async (e) => 
  {
    e.preventDefault();
    loadData();
  }

  async function loadData()
  {
    try 
    {
      const FromDate  = document.getElementById("FromDate").value;
      const ToDate = document.getElementById("ToDate").value;

      if(FromDate == "")
      {
        alert("Select From Date.")
      }
      else if(ToDate == "")
      {
        alert("Select To Date.")
      }
      else
      {
        let q;
        q = query(collection(db, 'Expense'),
            where("TrnDate",">=",FromDate),
            where("TrnDate","<=",ToDate)
          );
          
        const qs = await getDocs(q);
        const snapshot = qs.cos.map(doc=>({id:doc.id, ...doc.data()}));
          
        // let myquery;
        // myquery = query(collection(db, 'Expense'));
          
        // const snapshot1 = await getDocs(myquery);
        // const snapshot = snapshot1.docs.filter(doc => {
        //   const data = doc.data();
        //   return (
        //     data.TrnDate?.toLowerCase().includes(FromDate) &&
        //     data.TrnDate?.toLowerCase().includes(ToDate)
        //   );
        //   });
		  
        const tbody = document.querySelector("#dataTable tbody");
        tbody.innerHTML = "";
        
        snapshot.forEach(doc => {
            const { TrnDate, PaymentMode, ReferenceNumber, Amount, Comments, CreatedDate } = doc.data();
            
            const row = `<tr>
              <th>${TrnDate}</th>
              <th>${PaymentMode}</th>
              <th>${ReferenceNumber}</th>
              <th>${Amount}</th>
              <th>${Comments}</th>
              <th>${CreatedDate}</th>
            </tr>`
            tbody.innerHTML += row;
          });

          document.getElementById("FromDate").value = "";
          document.getElementById("ToDate").value = "";
          
          //alert("Expense history loaded successfully.");
      }
    }
    catch(error)
    {
      //console.error("Error loading expense history:", error.message);
      alert("Error loading expense history:", error.message);
    }
  }
});
