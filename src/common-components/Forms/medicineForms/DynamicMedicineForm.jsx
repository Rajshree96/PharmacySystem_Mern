
import React from "react";
import { useParams } from "react-router-dom";
import AddCategoryForm from "./addMedicineForms/AddCategoryForm";
import AddMedicineForm from "./addMedicineForms/AddMedicineForm";
import AddMedicineTypeForm from "./addMedicineForms/AddMedicineTypeForm";
import AddUnitForm from "./addMedicineForms/AddUnitForm";
import ManageCategoryForm from "./manageMedicineForms/ManageCategoryForm";
import ManageMedicineTypeForm from "./manageMedicineForms/ManageMedicineTypeForm";
import ManageUnitForm from "./manageMedicineForms/ManageUnitForm";
import ManageMedicineForm from "./manageMedicineForms/ManageMedicineForm";

const formComponents = {
  addcategory: AddCategoryForm,
  addmedicine: AddMedicineForm,
  addmedicinetype: AddMedicineTypeForm,
  addunit: AddUnitForm,
  managecategory: ManageCategoryForm,
  managemedicinetype: ManageMedicineTypeForm,
  manageunit: ManageUnitForm,
  managemedicine: ManageMedicineForm,
};

const DynamicMedicineForm = () => {
  const { formType } = useParams();
  const FormComponent = formComponents[formType];

  return FormComponent ? <FormComponent /> : <div>Form Not Found</div>;
};

export default DynamicMedicineForm;

