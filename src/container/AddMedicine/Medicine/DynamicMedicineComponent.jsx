import React from "react";
import Categories from "./Categories/Categories";
import AddMedicine from "./AddMedicine/AddMedicine";
import MedicineType from "./MedicineType/MedicineType";
import Units from "./Units/Units";

const medicineComponents = {
    categories: Categories,
    addmedicine: AddMedicine,
    medicinetype: MedicineType,
    units: Units,
};

const DynamicMedicineComponent = () => {
    const { componentType } = useParams();
    const MedicineComponents = medicineComponents[componentType];
  
    return MedicineComponents ? <MedicineComponents /> : <div>Component Not Found</div>;
};

export default DynamicMedicineComponent;
