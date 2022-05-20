import { display } from "@mui/system";
import * as React from "react";
import background from '../lck.jpeg';

function Home() {
  const styled ={
    back:{
      backgroundImage: `url(${background})`,
      backgroundRepeat:"no-repeat",
      backgroundSize:'cover',
    }
  }
  return (
    <div style = {styled.back}>
           <h1 style ={{display : 'flex', justifyContent:'center',minHeight:1000,color:'white'}}> </h1>

        </div>
  );
}

export default Home;