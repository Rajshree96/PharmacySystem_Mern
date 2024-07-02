import path from 'path';
import SetUpBusiness from '../models/setUpBusinessModel.js';
 import upload from '../config/multerConfig.js';


export const addBusinessSetup = async (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            return res.status(400).json({ message: 'Error uploading file', error: err });
        }
        try {
            // console.log('File:', req.file); // Log file information
            // console.log('Body:', req.body); // Log body information

            const {
                businessName,
                address,
                pinCode,
                state,
                country,
                email,
                website,
                phoneNumber,
                enableGst,
                stateRegistrationType,
                taxRate,
                gstin,
                drugLicenceNo,
                otherTax,
                taxName,
                taxNumber,
                bankName,
                bankAddress,
                ifscCode,
                accountHolderName,
                accountNumber,
            } = req.body;

            const requiredFields = [
                'businessName', 'address', 'pinCode', 'state', 'country', 'email', 'phoneNumber',
                'enableGst', 'stateRegistrationType', 'bankName', 'ifscCode', 'accountHolderName', 'accountNumber'
            ];

            for (let field of requiredFields) {
                if (!req.body[field]) {
                    return res.status(400).json({ message: `${field} is required` });
                }
            }

            const businessLogo = req.file ? path.join('uploads', req.file.filename) : null;
            if (!businessLogo) {
                return res.status(400).json({ message: 'businessLogo is required' });
            }

            const newBusinessSetup = new SetUpBusiness({
                businessInfo: {
                    businessLogo,
                    businessName,
                    address,
                    pinCode,
                    state,
                    country,
                    email,
                    website,
                    phoneNumber,
                },
                statutoryDetails: {
                    enableGst,
                    stateRegistrationType,
                    taxRate,
                    gstin,
                    drugLicenceNo,
                    otherTax,
                    taxName,
                    taxNumber,
                    state,
                },
                bankDetails: {
                    bankName,
                    bankAddress,
                    ifscCode,
                    accountHolderName,
                    accountNumber,
                },
            });

            await newBusinessSetup.save();
            res.status(201).json({ message: 'Business setup created successfully', businessSetup: newBusinessSetup });

        } catch (error) {
            res.status(400).json({ message: 'Error creating business setup', error });
        }
     });
};