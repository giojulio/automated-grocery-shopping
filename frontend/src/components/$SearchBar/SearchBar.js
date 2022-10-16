// import React, { useState } from "react";


// const SearchBar = (props) => {
//   const [searchItem, setSearchItem] = useState("");
  
//   const onChange = (e) => {
//     setSearchItem(e.target.value);
//     filterByText();
//   };

//   const filterByText = () => {
//     const filteredArray = props.shoppingList?.filter((item) => {
//       return item.name.toUpperCase().includes(searchItem.toUpperCase());
//     });
//     if (!filteredArray.length) {
//       props.setSearch();
//     } else {
//       props.setSearch(filteredArray);
//     }
//   };

//   return (
//     <>
//       <input
//         value={searchItem}
//         type="text"
//         placeholder="Rice, beans..."
//         onChange={onChange}
//         required
//         style={{ margin: "8px 0 0 0", width: "100%" }}
//       />
//     </>
//   );
// };

// export default SearchBar;