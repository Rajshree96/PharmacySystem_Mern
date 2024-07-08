import path from 'path';
import SetUpBusiness from '../models/setUpBusinessModel.js';
import upload from '../config/multerConfig.js';

export const addBusinessSetup = async (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            return res.status(400).json({ message: 'Error uploading file', error: err });
        }

        try {
            const {
                businessName, address, pinCode, state, country, email, website, phoneNumber,
                enableGst, stateRegistrationType, taxRate, gstin, drugLicenceNo,
                otherTax, taxName, taxNumber, bankName, bankAddress, ifscCode,
                accountHolderName, accountNumber, financialYear, bookBeginning
            } = req.body;

            // Validate required fields
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

            // Create a new instance of SetUpBusiness model
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
                    financialYear,
                    bookBeginning
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
                },
                bankDetails: {
                    bankName,
                    bankAddress,
                    ifscCode,
                    accountHolderName,
                    accountNumber,
                },
            });

            // Save the new business setup to database
            await newBusinessSetup.save();
            res.status(201).json({ message: 'Business setup created successfully', businessSetup: newBusinessSetup });

        } catch (error) {
            console.error('Error creating business setup:', error);
            res.status(400).json({ message: 'Error creating business setup', error });
        }
    });
};
