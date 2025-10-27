import BillingFormHeader from "./BillingFormHeader";
import BillingFormFields from "./BillingFormFields";
const BillingForm = ({ formik }) => {
  const handlePhoneInput = (e) => {
    let value = e.target.value.replace(/\D/g, "");

    if (value.length > 10) {
      value = value.slice(0, 10);
    }

    return value;
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    let processedValue = value;

    if (id === "phoneNumber") {
      processedValue = handlePhoneInput(e);
    }

    formik.setFieldValue(id, processedValue);
    formik.setFieldTouched(id, true, false);
  };

  return (
    <>
      <BillingFormHeader />
      <BillingFormFields
        formik={formik}
        onChange={handleChange}
        onSubmit={formik.handleSubmit}
      />
    </>
  );
};

export default BillingForm;