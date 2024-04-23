// import React from "react";
// import Loding from "./Loding";
// const All_Layzz = React.lazy(() => import("./All"));

// const App = () => {
//   return (
//     <>
//       <React.Suspense fallback={<Loding />}>
//         <All_Layzz />
//       </React.Suspense>
//     </>
//   );
// };

// export default App;

import { React, useState, useEffect } from "react";
import axios from "axios";
import Loding from "./Loding";

const App = () => {
  const [Pokeapi, setPokeapi] = useState([]);
  // =============================================
  const [Nextpage, setNextpage] = useState();
  const [Prevpage, setPrevpage] = useState();
  // =============================================
  const [Lod, setLod] = useState(true);
  const [curntpage, setCurntpage] = useState(
    "https://pokeapi.co/api/v2/pokemon"
  );
  useEffect(() => {
    setLod(true);
    axios
      .get(curntpage)
      .then((response) => {
        setPokeapi(response.data.results);
        setNextpage(response.data.next);
        setPrevpage(response.data.previous);
        setLod(false);
      })
      .catch((error) => {
        setLod(false);
        console.log(error);
      });
  }, [curntpage]);

  const goToNextPage = () => {
    setCurntpage(Nextpage);
  };

  const goToPrevPage = () => {
    setCurntpage(Prevpage);
  };

  return (
    <>
      {Lod ? <Loding /> : ""}
      {Pokeapi.map((items, i) => (
        <h1 key={i}>
          {i + 1}
          {"-"}
          {items.name}
        </h1>
      ))}
      {Prevpage && <button onClick={Prevpage && goToPrevPage}>Previos</button>}
      {Nextpage && <button onClick={Nextpage && goToNextPage}>Next</button>}
    </>
  );
};

export default App;
