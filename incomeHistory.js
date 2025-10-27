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
      const RoomNo  = document.getElementById("RoomNo").value;
      const fromDate = document.getElementById("fromDate").value;

      if(RoomNo == "")
      {
        alert("Enter Room No.")
      }
      else if(fromDate == "")
      {
        alert("Select From Date.")
      }
      else
      {
        let q;
    		q = query(collection(db, 'Income'),
          where("RoomNo","==", RoomNo),
          where("TrnDate",">=", ToDate)
        );
		
        const qs = await getDocs(q);
        const snapshot = qs.cos.map(doc=>({id:doc.id, ...doc.data()}));
        
        // let myquery;
        // myquery = query(collection(db, 'Income'));
          
        // const snapshot1 = await getDocs(myquery);
        // const snapshot = snapshot1.docs.filter(doc => {
        //   const data = doc.data();
        //   return (
        //     data.RoomNo?.toLowerCase().includes(RoomNo) &&
        //     data.TrnDate?.toLowerCase().includes(fromDate)
        //   );
        // });
		  
        const tbody = document.querySelector("#dataTable tbody");
        tbody.innerHTML = "";
        
        snapshot.forEach(doc => 
		    {
            const { RoomNo, TrnDate, PaymentMode, ReferenceNumber, Amount, Comments, CreatedDate } = doc.data();
            
            const row = `<tr>
              <th>${RoomNo}</th>
              <th>${TrnDate}</th>
              <th>${PaymentMode}</th>
              <th>${ReferenceNumber}</th>
              <th>${Amount}</th>
              <th>${Comments}</th>
              <th>${CreatedDate}</th>
            </tr>`
            tbody.innerHTML += row;
        });

        document.getElementById("RoomNo").value = "";
        document.getElementById("fromDate").value = "";
      }
    }
    catch(error)
    {
      //console.error("Error loading income history:", error.message);
      alert("Error loading income history:", error.message);
    }
  }
});
