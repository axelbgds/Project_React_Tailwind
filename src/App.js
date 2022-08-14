import React, { useCallback, useMemo, useState } from "react";
import ImageList from "./components/ImageList";
import ImageSearch from "./components/ImageSearch";
import "./assets/main.css";

function APIData(props) {
  const [images, setImages] = useState([]); // image list
  const [isLoading, setIsLoading] = useState(false);
  const [imageSearch, setImageSearch] = useState("");

  const handleImageSearchSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      try {
        setIsLoading(true);
        const response = await fetch(
          `https://pixabay.com/api/?key=29223106-80cc5ba29708d378849977f12&q=${imageSearch}&image_type=photo`
        );
        if (response.ok) {
          const { hits } = await response.json();
          setImages(hits);
        } else {
          throw new Error(
            "There is a problem to fetch data with this API (the key is probably wrong)"
          );
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    },
    [imageSearch]
  );

  const noImageMessage = useMemo(
    () =>
      !isLoading && images && images.length === 0 ? (
        <h1 className="text-5xl text-center mx-auto mt-32">No Images Found</h1>
      ) : null,
    [isLoading, images]
  );

  const loadingMessage = useMemo(
    () => (isLoading ? <h1 className="text-5xl text-center mx-auto mt-32">Loading...</h1> : null),
    [isLoading]
  );

  return (
    <div>
      <ImageSearch
        setImageSearch={setImageSearch}
        handleImageSearchSubmit={handleImageSearchSubmit}
      />
      {noImageMessage}
      {loadingMessage}

      <ImageList images={images} />
    </div>
  );
}

export default APIData;
