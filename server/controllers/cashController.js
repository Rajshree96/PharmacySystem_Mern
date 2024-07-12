import Cash from "../models/cashModal.js"

export const addCash = async (req, res) =>{
    try {
        const cash = new Cash(req.body);
        await cash.save();
        res.status(201).json({message :"Cash added", cash});
    } catch (error) {
        res.status(400).send({message:"error while adding cash", error})
    }
}

//get all cash
export const getAll = async (req, res)=>{
    try {
        const cash = await Cash.find();
        res.status(200).json({message:"your all cash", cash});

        
    } catch (error) {
        res.status(500).send({message:"you have not any cash", error})
    }
}

//update amount 

export const updateCash = async (req, res)=>{
    try {
        const cash = await Cash.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true});
        if(!cash){
            return res.status(404).json({message: "dont have any cash"})
        }
        res.status(200).json({message:"amount updated", cash});


    } catch (error) {
        res.status(400).json(error);

    }
}

//delet cash 
export const deleteCash = async (req, res)=>{
    try {
        const cash = await Cash.findByIdAndDelete(req.params.id);
        if(!cash){
            return res.status(404).send();
        }
        res.status(200).json({message:"amount deleted", cash});

    } catch (error) {
        res.status(500).send(error);
        
    }
}