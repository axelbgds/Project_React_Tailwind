const ImageList = ({ images }) => {
    return images && images.length > 0 ? (
      <div className="container mx-auto">
        <div className= "max-w-2xl mx-auto px-4 py-8 lg:max-w-7xl grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-8 lg:grid-cols-3 xl:grid-cols-4">
        {images.map((img) => (
          <div key={img.id} className="imageCard">
            <img className="bg-white shadow-lg rounded-lg" src={img.webformatURL} alt={img.tags} />
            <span>User : {img.user}</span>
            <div className="viewsAndLikesContainer">
              <span>Views : {img.views}</span>
              <span>Likes : {img.likes}</span>
            </div>
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">#{img.tags}</span>
          </div>
        ))}
        </div>
      </div>
    ) : null;
  };
  
  export default ImageList;
  