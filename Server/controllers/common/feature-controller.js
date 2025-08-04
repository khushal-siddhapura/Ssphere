const Feature = require("../../models/Feature");

const addFeatureImage = async (req, res) => {
  try {
    const { image } = req.body;
    if (!image) {
      return res.status(404).json({
        success: false,
        message: "Please select Banner image"
      })
    }

    const featureImages = new Feature({
      image,
    });

    await featureImages.save();

    res.status(201).json({
      success: true,
      data: featureImages,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occured!",
    });
  }
};

const getFeatureImages = async (req, res) => {
  try {
    const images = await Feature.find({});

    res.status(200).json({
      success: true,
      data: images,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occured!",
    });
  }
};

const deleteFeatureImage = async (req, res) => {
  const { id } = req.params;
  try {
    console.log(id,"ID");
    const image = await Feature.findByIdAndDelete(id); // Delete the image by its ID
    if (!image) {
      return res.status(404).json({ error: 'Image not found' });
    }
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting image' });
  }
};

module.exports = { addFeatureImage, getFeatureImages, deleteFeatureImage };
