const express=require("express")
const router=express.Router();
const patient=require("../models/patient")


// Regitered user

router.post("/",async(req,res)=>{

    const {patient_id,patient_name,patient_age,patient_address,patient_mobile_no,patient_disease}=req.body;

    if(!patient_id||!patient_name||!patient_age||!patient_address||!patient_mobile_no||!patient_disease)
    {
        res.status(422).json("please fill the patient data")
    }

    try {
        
        const prePatient = await patient.findOne({patient_id:patient_id});
        console.log(prePatient);

        if(prePatient){
            
            res.status(422).json("This patient is already present");
        
        }else{
            const addPatient = new patient({
            patient_id,
            patient_name,
            patient_age,
            patient_address,
            patient_mobile_no,
            patient_disease
            
        });
             await addPatient.save();
            res.status(201).json(addPatient);

            console.log(addPatient,"successfully added patient");
        }

    } catch (error) {
        
        
        console.log(error);
        res.status(422).json(error);

    }
})

// get userdata

router.get("/getpatientdata",async(req,res)=>{
    try {
        const patientData = await patient.find();
        res.status(201).json(patientData)
        console.log(patientData);
    } catch (error) {
        res.status(422).json(error);
        console.log(error);
    }
})


// get individual user
router.get("/getpatient/:patient_id", async (req, res) => {
    try {
      console.log(req.params);
      const { patient_id } = req.params;
  
      const patientIndividual = await patient.findOne({ patient_id: patient_id });
      console.log(patientIndividual);
  
      if (!patientIndividual) {
        return res.status(404).json({ message: "Patient not found" });
      }
  
      res.status(200).json(patientIndividual);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
  



// update user data

router.put("/updatepatient/:patient_id", async (req, res) => {
    const { patient_id } = req.params; // Get the patient_id from the request params
    const updateData = req.body; // Get the updated data from the request body
  
    try {
      // Use Mongoose to find the patient by patient_id and update it
      const updatedPatient = await patient.findOneAndUpdate(
        { patient_id: patient_id },
        updateData,
        { new: true } // Set { new: true } to return the updated document
      );
  
      if (!updatedPatient) {
        return res.status(404).json({ message: "Patient not found" });
      }
  
      res.status(200).json(updatedPatient);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
  
  // Define the route to delete a patient by patient_id
  router.delete("/deletepatient/:patient_id", async (req, res) => {
   
    const { patient_id } = req.params; // Get the patient_id from the request params
  
    try {
      // Use Mongoose to find and remove the patient by patient_id
      const deletedPatient = await patient.findOneAndRemove({ patient_id: patient_id });
  
      if (!deletedPatient) {
        return res.status(404).json({ message: "Patient not found" });
      }
  
      res.status(200).json({ message: "Patient deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
  





module.exports = router;