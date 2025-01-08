import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object({
  childName: Yup.string().required('Child name is required'),
  childAge: Yup.number().required('Child age is required').positive('Age must be positive').integer('Age must be an integer'),
  location: Yup.string().required('Location is required'),
  vaccinationStatus: Yup.string().required('Vaccination status is required'),
  nutritionStatus: Yup.string().required('Nutrition status is required'),
  washStatus: Yup.string().required('WASH status is required'),
  birthRegistrationStatus: Yup.string().required('Birth registration status is required'),
  childWeight: Yup.number().required('Child weight is required').positive('Weight must be positive'),
  notes: Yup.string(),
});

function DataCollectionForm() {
  const [submissionStatus, setSubmissionStatus] = useState(null);
  const [loading, setLoading] = useState(false);  // Added loading state for form submission
  const formik = useFormik({
    initialValues: {
      childName: '',
      childAge: '',
      location: '',
      vaccinationStatus: '',
      nutritionStatus: '',
      washStatus: '',
      birthRegistrationStatus: '',
      childWeight: '',
      notes: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setLoading(true); // Set loading state on submit
      try {
        // Simulate form submission delay (e.g., API call)
        await new Promise((resolve) => setTimeout(resolve, 1000));  // Simulating async action like API call
        localStorage.setItem('uhdp-data', JSON.stringify(values));
        setSubmissionStatus('success');
        formik.resetForm(); // Reset form fields after successful submission
      } catch (error) {
        setSubmissionStatus('error');
      } finally {
        setLoading(false);  // Reset loading state
        setTimeout(() => setSubmissionStatus(null), 3000);  // Hide success/error message after 3 seconds
      }
    },
  });

  useEffect(() => {
    localStorage.removeItem('uhdp-data');
    formik.resetForm();
    setSubmissionStatus(null);
  }, []);

  return (
    <div className="form-container">
      <h2>Data Collection Form</h2>
      <form onSubmit={formik.handleSubmit}>
        <div className="form-group">
          <label htmlFor="childName">Child Name</label>
          <input
            type="text"
            id="childName"
            name="childName"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.childName}
          />
          {formik.touched.childName && formik.errors.childName ? (
            <div>{formik.errors.childName}</div>
          ) : null}
        </div>
        <div className="form-group">
          <label htmlFor="childAge">Child Age</label>
          <input
            type="number"
            id="childAge"
            name="childAge"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.childAge}
          />
          {formik.touched.childAge && formik.errors.childAge ? (
            <div>{formik.errors.childAge}</div>
          ) : null}
        </div>
        <div className="form-group">
          <label htmlFor="location">Location</label>
          <input
            type="text"
            id="location"
            name="location"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.location}
          />
          {formik.touched.location && formik.errors.location ? (
            <div>{formik.errors.location}</div>
          ) : null}
        </div>
        <div className="form-group">
          <label htmlFor="vaccinationStatus">Polio Vaccination Status</label>
          <select
            id="vaccinationStatus"
            name="vaccinationStatus"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.vaccinationStatus}
          >
            <option value="">Select Status</option>
            <option value="vaccinated">Vaccinated</option>
            <option value="not_vaccinated">Not Vaccinated</option>
            <option value="refused">Refused</option>
          </select>
          {formik.touched.vaccinationStatus && formik.errors.vaccinationStatus ? (
            <div>{formik.errors.vaccinationStatus}</div>
          ) : null}
        </div>
        <div className="form-group">
          <label htmlFor="nutritionStatus">Nutrition Status</label>
          <select
            id="nutritionStatus"
            name="nutritionStatus"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.nutritionStatus}
          >
            <option value="">Select Status</option>
            <option value="good">Good</option>
            <option value="moderate">Moderate</option>
            <option value="severe">Severe</option>
          </select>
          {formik.touched.nutritionStatus && formik.errors.nutritionStatus ? (
            <div>{formik.errors.nutritionStatus}</div>
          ) : null}
        </div>
        <div className="form-group">
          <label htmlFor="washStatus">WASH Status</label>
          <select
            id="washStatus"
            name="washStatus"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.washStatus}
          >
            <option value="">Select Status</option>
            <option value="adequate">Adequate</option>
            <option value="inadequate">Inadequate</option>
          </select>
          {formik.touched.washStatus && formik.errors.washStatus ? (
            <div>{formik.errors.washStatus}</div>
          ) : null}
        </div>
        <div className="form-group">
          <label htmlFor="birthRegistrationStatus">Birth Registration Status</label>
          <select
            id="birthRegistrationStatus"
            name="birthRegistrationStatus"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.birthRegistrationStatus}
          >
            <option value="">Select Status</option>
            <option value="registered">Registered</option>
            <option value="not_registered">Not Registered</option>
          </select>
          {formik.touched.birthRegistrationStatus && formik.errors.birthRegistrationStatus ? (
            <div>{formik.errors.birthRegistrationStatus}</div>
          ) : null}
        </div>
        <div className="form-group">
          <label htmlFor="childWeight">Child Weight (kg)</label>
          <input
            type="number"
            id="childWeight"
            name="childWeight"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.childWeight}
          />
          {formik.touched.childWeight && formik.errors.childWeight ? (
            <div>{formik.errors.childWeight}</div>
          ) : null}
        </div>
        <div className="form-group">
          <label htmlFor="notes">Notes</label>
          <textarea
            id="notes"
            name="notes"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.notes}
          />
        </div>
        <button type="submit" disabled={loading}>Submit</button>
      </form>
      
      {loading && <div>Submitting...</div>}  {/* Show loading state */}
      
      {submissionStatus === 'success' && !loading && (
        <div className="data-display">
          <h3>Data submitted successfully!</h3>
        </div>
      )}
      {submissionStatus === 'error' && !loading && (
        <div className="data-display">
          <h3>Error saving data. Please try again.</h3>
        </div>
      )}
    </div>
  );
}

export default DataCollectionForm;
