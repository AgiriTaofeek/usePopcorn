import React from "react";
import ReactDOM from "react-dom/client";
// import StarRating from "./reusable/StarRating";
import App from "./App.jsx";
import "./index.css";

// function Test() {
//   const [movieRating, setMovieRating] = useState(0);
//   return (
//     <div>
//       {/* The onSetRating prop is basically synchronizing the state update of the StarRating component with the state of this outer Test component */}
//       <StarRating color="blue" onSetRating={setMovieRating} />
//       <p>movie rating: {movieRating}</p>
//     </div>
//   );
// }

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* <StarRating
      defaultRating={3}
      maxRating={5}
      size={24}
      messages={["Terrible", "Bad", "Okay", "Good", "Amazing"]}
    /> */}
    {/* <Test /> */}
    <App />
  </React.StrictMode>
);
