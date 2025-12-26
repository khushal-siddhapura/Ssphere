import ProductImageUpload from "@/components/admin-view/image-upload";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { addFeatureImage, getFeatureImages, deleteFeatureImage } from "@/store/common-slice"; 
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function AdminBanner() {
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [imageLoadingState, setImageLoadingState] = useState(false);
  const dispatch = useDispatch();
  const { featureImageList } = useSelector((state) => state.commonFeature);

  function handleUploadFeatureImage() {
    dispatch(addFeatureImage(uploadedImageUrl)).then((data) => {
      if (data?.payload?.success) {
        dispatch(getFeatureImages());
        setImageFile(null);
        setUploadedImageUrl("");
      }else {
        toast({
          title: "Please select Banner Image",
          variant: "destructive"
        })
      }
    });
  }

  const handleDeleteImage = (imageId) => {
    const confrimDelete = window.confirm("Are you sure you want delete ?");
    if(confrimDelete){
    dispatch(deleteFeatureImage(imageId)).then(() => {
      dispatch(getFeatureImages());
    });
  }
  };

  useEffect(() => {
    dispatch(getFeatureImages());
  }, [dispatch]);

  // Disable the upload button if there are 3 or more images
  const isUploadDisabled = featureImageList.length >= 3;

  return (
    <div>
      <ProductImageUpload
        imageFile={imageFile}
        setImageFile={setImageFile}
        uploadedImageUrl={uploadedImageUrl}
        setUploadedImageUrl={setUploadedImageUrl}
        setImageLoadingState={setImageLoadingState}
        imageLoadingState={imageLoadingState}
        isCustomStyling={true}
      />
      <Button
        onClick={handleUploadFeatureImage}
        className={`mt-5 w-full ${isUploadDisabled ? "cursor-not-allowed" : ''}`}
        disabled={isUploadDisabled}
      >
        {isUploadDisabled ? "Remove any Banner to upload" : "Upload"}
      </Button>
      <div className="flex flex-col gap-4 mt-5">
        {featureImageList && featureImageList.length > 0
          ? featureImageList.map((featureImgItem) => (
              <div key={featureImgItem._id} className="relative">
                <img
                  src={featureImgItem.image}
                  className="w-full h-[300px] object-cover rounded-t-lg"
                />
                {/* Delete Button */}
                <button
                  onClick={() => handleDeleteImage(featureImgItem._id)}
                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-2 hover:bg-red-600"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            ))
          : null}
      </div>
    </div>
  );
}

export default AdminBanner;
