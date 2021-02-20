// 	/* eslint-disable react-hooks/exhaustive-deps */
// /* eslint-disable no-unused-vars */
// import React, { useEffect, useState } from 'react';
// import {Link} from 'react-router-dom';
// import { Button } from 'react-bootstrap';
// import useAjax from '../../hooks/ajaxHook';
// import './admin-accept-user.scss';
// import Paginate from '../../paginate/paginate';


// /**
//  * when any visitor signup to the application, we save his info on the out database, and we don't store it
//  * in our main database for the user until the admin accept his account, here we have just simple functionality
//  * to  
//  */

// function AdminAcceptUser (props) {
  
//   let [users, setUsers] = useState([]);
//   const {getTempUsers, acceptUser, rejectUser} = useAjax();
  
//   //  for Pagination
//   const itemsPerPage = 5;
//   const [currentPage,setCurrentPage] = useState(1);
//   const indexOfLastPost = currentPage * itemsPerPage;
//   const indexOfFirstPage = indexOfLastPost - itemsPerPage;
//   const currentPost = users.slice(indexOfFirstPage, indexOfLastPost);
  
  

//   useEffect(()=> {
//     try {
//       console.log('adminAcceptUser');
//       getTempUsers().then(tempUsers => setUsers(tempUsers) );
//     } catch (error) {
//       console.error(error);
//     }
//   },[users]);

//   return(
//     <>
//       <br></br>            <br></br>            <br></br>            <br></br>
     
  

//       <div className="container mt-5">
//         <table className="table table-borderless table-responsive card-1 p-4">
//           <div className="table-head">

         
//             <thead >
//               <tr className="border-bottom">
//                 <th> <span className="ml-2">Image</span> </th>
//                 <th> <span className="ml-2">User name</span> </th>
//                 <th> <span className="ml-2"></span> </th>
//                 <th> <span className="ml-2">Email</span> </th>
//                 <th> <span className="ml-4">Action</span> </th>
//               </tr>
//             </thead>
//             <tbody>
//               {currentPost.map (value =><tr key={value._id} className="border-bottom"> 
//                 <td>
//                   <div className="p-2"> <span className="spanEdit font-weight-bold"><img src={value.image} width="40" className="rounded-circle" alt='' /></span> </div>
//                 </td>
//                 <td>
//                   <div className="p-2 d-flex flex-row align-items-center mb-2"> 
//                     <div className="d-flex flex-column ml-2"> <span className=" font-weight-bold spanEdit"> <li className="spanEdit font-weight-bold" value={value}>
//                       {value.username} 
//                     </li></span></div>
//                   </div>
//                 </td>
//                 <td>
//                   <div className="p-2"> <span className="font-weight-bold">{value.position}</span> </div>
//                 </td>
//                 <td>
//                   <div className="p-2 d-flex flex-column"> <span>{value.email}</span>  </div>
//                 </td>
//                 <td>
                
//                   <div className="p-2 icons">
//                     <i className="fa fa-check" aria-hidden="true" onClick={()=> acceptUser(value)}><span>Accept</span></i> 
//                     <i className="fa fa-adjust text-danger" onClick={()=> rejectUser(value)} ><span>Reject</span></i> 
//                   </div>
//                 </td>
//               </tr>, 
//               )}
            
//             </tbody> 
//           </div>
//         </table>
//         <nav aria-label="Page navigation example">
//           <ul class="pagination pagination-accept">
//             <li class="page-item">
//               <a class="page-link" href="!#" aria-label="Previous">
//                 <span aria-hidden="true">&laquo;</span>
//                 <span className="sr-only">Previous</span>
//               </a>
              
//             </li>
//             <Paginate setCurrentPage={setCurrentPage} users={users} itemsPerPage={itemsPerPage} />
//             <li class="page-item">
//               <a class="page-link" href="!#" aria-label="Next">
//                 <span aria-hidden="true">&raquo;</span>
//                 <span className="sr-only">Next</span>
//               </a>
//             </li>
//           </ul>
//         </nav>
//         <Link className="we-accept" to='/administration'>
//           <Button className="btn-warning accept">Back</Button>
//         </Link>
//       </div>
//     </>
//   );
// }


// export default AdminAcceptUser;

