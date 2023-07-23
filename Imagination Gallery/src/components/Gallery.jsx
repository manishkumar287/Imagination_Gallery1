import { useState, useEffect } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";

const urls = "https://testbucketfp.s3.ap-south-1.amazonaws.com/";

const f = (p) => {
  for (let i = 0; i < p?.length; i++) {
    const url = p[i].Key.split(" ").join("+");
    p[i].Key = url;
  }
  return p;
};

export default function Gallery(alignment) {

  
  const [item, setItem] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;


  

  useEffect(() => {
    axios
      .get("http://localhost:8000/")
      .then(function (response) {
        const d = f(response.data.data.Contents);
        setItem(d);
      })
      .catch(function (error) {
        console.log(error);
      })
      .finally(function () {});     
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = item?.slice(indexOfFirstItem, indexOfLastItem);

  

  return (
    <Box sx={{ flexGrow: 1 }}>
      {alignment.alignment === "S3 Bucket" ? (
        <Grid
          container
          spacing={{ xs: 1, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
        
          {/* Display paginated data */}
          {currentItems?.map((item, i) => (
            <Grid item xs={2} sm={4} md={4} key={i} position="static">
              <img
                src={`${urls}${item.Key}`}
                width={200}
                height={200}
                loading="lazy"
              />
            </Grid>
          ))}

          {/* Pagination Controls */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              marginTop:490,
              position: "absolute",
              marginLeft:400,
              
            }}
          >
            <Button
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            <Button
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentItems?.length < itemsPerPage}
            >
              Next
            </Button>
          </div>
        </Grid>
      ) : (
        <h1>Google Drive</h1>
      )}
    </Box>
    
  );
}
