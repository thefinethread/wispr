import NoProfilePic from "../assets/images/no-profile-photo.png";

const ImageWithOnlineIcon = ({ imgSrc, isOnline, imgSize = "w-12 h-12" }) => {
  return (
    <div className={`relative rounded-full ${imgSize}`}>
      <img
        className="h-full w-full rounded-full object-cover"
        src={imgSrc || NoProfilePic}
        alt=""
      />
      {isOnline && (
        <div className="absolute bottom-0 right-0 h-3 w-3 -translate-x-[10%] -translate-y-[10%] rounded-full border-2 border-solid border-white bg-green-500"></div>
      )}
    </div>
  );
};

export default ImageWithOnlineIcon;
