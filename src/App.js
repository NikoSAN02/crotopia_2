import { BrowserRouter, Routes, Route } from "react-router-dom";
import { makeStyles } from "@material-ui/core";
import HomePage from "./HomePage";
import Header from "./Header";
import HeaderM from "./HeaderM";
import HomePageM from "./HomePageM";

const useStyles = makeStyles(() => ({
  App: {
  },
}));

function App() {

  const classes = useStyles();

  var browserMob = false;

  if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
    // true for mobile device
          browserMob = true;
          //alert(browserW);
        }else{
          // false for not mobile device
          browserMob = false;
          //alert(browserW);
        }

  return (
    <BrowserRouter>

{browserMob === false ? (
        <Header />
      ) : (
        <HeaderM />
      )}

      <div className={classes.App}>
        <Routes>
         
        {browserMob === false ? (
        <Route path="/" element={<HomePage />} />
      ) : (
        <Route path="/" element={<HomePageM />} />
      )}
        </Routes>
      </div>


    </BrowserRouter>
  );
}

export default App;
