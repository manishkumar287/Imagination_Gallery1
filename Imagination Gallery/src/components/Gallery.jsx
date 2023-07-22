import ImageList from "@mui/material/ImageList";
import { useState, useEffect } from "react";
import axios from "axios";
import ImageListItem from "@mui/material/ImageListItem";

const urls = "https://testbucketfp.s3.ap-south-1.amazonaws.com/";

const f = (p) => {
    
    console.log(p,"###");
  for (let i = 0; i < p?.length; i++) {
    const url = p[i].Key.split(" ").join("+");
    p[i].Key = url;
  }
  return p;
};

export default function Gallery() {
  const [item, setItem] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:8000/")
      .then(function (response) {
        console.log(response.data.data.Contents,"@@@@");
        const d = f(response.data.data.Contents);
        setItem(d);
        console.log(d);
      })
      .catch(function (error) {
        console.log(error);
      })
      .finally(function () {});

    //   axios.get(
    //     "https://drive.google.com/drive/folders/1_qOJ0z3kI_e2IJq4X6HqF0T1ROBESygS?usp=drive_link"
    //   ).then(function(response){
    //     console.log(response," this is google drive part");
    //   })
  }, []);

//   console.log(item);

    return (
      <>
        {" "}
        <ImageList sx={{ width: 500, height: 450 }} cols={3} rowHeight={164}>
          {item?.map((item, i) => (
             <ImageListItem key={i}>
            <div>
              <img
                // src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
                src={`${urls}${item.Key}`}
                // srcSet={`${i}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                // alt={item.title}
                loading="lazy"
              />
            </div>
             </ImageListItem>
          ))}
           {" "} 
        </ImageList> 
      </>
    );
  }

//   return (
//     <div>
//     <h1>hello</h1>
//       {item?.map((item, i) => (
//         <div key={i}>
//           <img src={`${urls}${item.Key}`} loading="lazy" />
//         </div>
//       ))}
//     </div>
//   );
// }
