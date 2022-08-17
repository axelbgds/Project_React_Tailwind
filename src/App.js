import React, { useEffect, useState } from "react";
import ImageList from "./components/ImageList";
import ImageSearch from "./components/ImageSearch";
import "./assets/main.css";

function APIData() {
  const [images, setImages] = useState([]); // image list
  const [isLoading, setIsLoading] = useState(true);
  const [imageSearch, setImageSearch] = useState('');

  useEffect(() => {
    setIsLoading(true);
    fetch(`https://pixabay.com/api/?key=29223106-80cc5ba29708d378849977f12&q=${imageSearch}&image_type=photo`)
      .then(res => res.json())
      .then(data => {
        setImages(data.hits);
        setIsLoading(false);
      }).catch(err => console.log(err));
  }, [imageSearch]);

  return (
    <div className="container mx-auto">
      <ImageSearch searchText={(text) => setImageSearch(text)} />

      {!isLoading && images.length === 0 && <h1 className="text-5xl text-center mx-auto mt-32">No Images Found</h1> }

      {isLoading ? <h1 className="text-6xl text-center mx-auto mt-32">Loading...</h1> : <div className="grid grid-cols-3 gap-4">
        {images.map(image => (
          <ImageList key={image.id} image={image} />
        ))}
      </div>}
    </div>
  );
}

export default APIData;
