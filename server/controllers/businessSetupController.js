import multer from 'multer';
import SetUpBusiness from '../models/setUpBusinessModel.js';
import path from 'path'

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname))
  }
});

const upload = multer({ storage: storage });

export const addBusinessSetup = async (req, res) => {
  try {
    upload.single('businessLogo')(req, res, async (err) => {
      if (err instanceof multer.MulterError) {
        return res.status(400).json({ message: "File upload error", error: err.message });
      } else if (err) {
        return res.status(500).json({ message: "Unknown error", error: err.message });
      }

      try {
        const businessSetupData = JSON.parse(req.body.businessSetupData);

        if (req.file) {
          businessSetupData.businessInfo.businessLogo = req.file.path;
        }

        const newBusinessSetup = new SetUpBusiness(businessSetupData);
        const savedBusinessSetup = await newBusinessSetup.save();

        res.status(201).json({
          message: "Business setup created successfully",
          businessSetup: savedBusinessSetup
        });
      } catch (error) {
        console.error('Error processing business setup:', error);
        res.status(400).json({ message: "Error processing business setup", error: error.message });
      }
    });
  } catch (error) {
    console.error('Error in addBusinessSetup:', error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};