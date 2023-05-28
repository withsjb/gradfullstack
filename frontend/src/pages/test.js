import { useEffect, useState } from "react";
import Navbar from "../component/Navbar";
import Button from "../component/Button";
import Grid from "../component/grid";
import axios from "axios";

export default function Test() {
  const [photos, setPhotos] = useState([]);
  const [updateUI, setUpdateUI] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:4000/upload")
      .then((res) => {
        console.log(res.data);
        setPhotos(res.data);
      })
      .catch((err) => console.log(err));
  }, [updateUI]);

  return (
    <div>
      <Navbar />
      <Grid photos={photos} />
      <Button />
    </div>
  );
}
