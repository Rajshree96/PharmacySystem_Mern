import GstSetting from "../models/gstSettingModal.js"
import TaxRate from "../models/taxRateModal.js";
// Create a new GST name
export const createGstName = async (req, res) => {
  try {
    console.log(req.body);
    const { gstName } = req.body;
    if (!gstName) {
      return res.status(400).json({ message: "GST name is required" });
    }
    const newGstSetting = new GstSetting({ gstName });
    const savedGstSetting = await newGstSetting.save();
    res.status(201).json(savedGstSetting);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Create a new tax rate
export const createTaxRate = async (req, res) => {
  try {
    const { taxRate } = req.body;
    if (!taxRate) {
      return res.status(400).json({ message: "Tax rate is required" });
    }
    const newTaxRate = new TaxRate({ taxRate });
    const savedGstSetting = await newTaxRate.save();
    res.status(201).json(savedGstSetting);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update GST name
export const updateGstName = async (req, res) => {
  try {
    const { gstName } = req.body;
    if (!gstName) {
      return res.status(400).json({ message: "GST name is required" });
    }
    const updatedGstSetting = await GstSetting.findByIdAndUpdate(
      req.params.id,
      { gstName },
      { new: true }
    );
    if (!updatedGstSetting) {
      return res.status(404).json({ message: "GST setting not found" });
    }
    res.status(200).json(updatedGstSetting);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


  // Delete a taxtype record
  export const deleteTaxType = async (req, res) => {
    const { id } = req.params;
  
    try {
        const deletedTaxType = await GstSetting.findByIdAndDelete(id);
        if (!deletedTaxType) {
            return res.status(404).json({ message: "taxType not found" });
        }
        res.status(200).json({ message: "TaxType deleted successfully" });
    } catch (error) {
        res.status(400).json({ message: "Failed to delete TaxType", error: error.message });
    }
  };

// Update tax rate
export const updateTaxRate = async (req, res) => {
  try {
    const { taxRate } = req.body;
    if (!taxRate) {
      return res.status(400).json({ message: "Tax rate is required" });
    }
    const updatedGstSetting = await TaxRate.findByIdAndUpdate(
      req.params.id,
      { taxRate },
      { new: true }
    );
    if (!updatedGstSetting) {
      return res.status(404).json({ message: "GST setting not found" });
    }
    res.status(200).json(updatedGstSetting);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all GST settings
export const getAllGstSettings = async (req, res) => {
    try {
      const gstSettings = await GstSetting.find();
      res.status(200).json(gstSettings);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  // Get all tax rates
export const getAllTaxRates = async (req, res) => {
    try {
      const taxRates = await TaxRate.find({}, 'taxRate');
      res.status(200).json(taxRates);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };


  // Delete a taxtype record
  export const deleteTaxRate = async (req, res) => {
    const { id } = req.params;
  
    try {
        const deletedTaxType = await TaxRate.findByIdAndDelete(id);
        if (!deletedTaxType) {
            return res.status(404).json({ message: "taxRate not found" });
        }
        res.status(200).json({ message: "TaxRate deleted successfully" });
    } catch (error) {
        res.status(400).json({ message: "Failed to delete TaxRate", error: error.message });
    }
  };
