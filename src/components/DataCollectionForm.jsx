import React, { useState } from 'react';
    import { useFormik } from 'formik';
    import * as Yup from 'yup';
    import FormInput from './FormInput';
    import FormSelect from './FormSelect';
    import FormTextarea from './FormTextarea';

    // Define the validation schema for the form
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

    // DataCollectionForm component for collecting child data
    function DataCollectionForm() {
      // State variables for submission status, loading, and error messages
      const [submissionStatus, setSubmissionStatus] = useState(null);
      const [loading, setLoading] = useState(false);
      const [errorMessage, setErrorMessage] = useState(null);

      // Initialize formik for form management
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
          setLoading(true);
          try {
            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 1000));
            setSubmissionStatus('success');
            formik.resetForm();
            setErrorMessage(null);
            console.log('Data submitted successfully:', values);
          } catch (error) {
            setSubmissionStatus('error');
            setErrorMessage('An error occurred while saving data.');
            console.error('Error saving data:', error);
          } finally {
            setLoading(false);
            setTimeout(() => setSubmissionStatus(null), 3000);
          }
        },
      });

      return (
        <div className="form-container">
          <h2>Data Collection Form</h2>
          <form onSubmit={formik.handleSubmit}>
            <FormInput
              label="Child Name"
              id="childName"
              name="childName"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.childName}
              touched={formik.touched.childName}
              error={formik.errors.childName}
            />
            <FormInput
              label="Child Age"
              id="childAge"
              name="childAge"
              type="number"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.childAge}
              touched={formik.touched.childAge}
              error={formik.errors.childAge}
            />
            <FormInput
              label="Location"
              id="location"
              name="location"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.location}
              touched={formik.touched.location}
              error={formik.errors.location}
            />
            <FormSelect
              label="Polio Vaccination Status"
              id="vaccinationStatus"
              name="vaccinationStatus"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.vaccinationStatus}
              touched={formik.touched.vaccinationStatus}
              error={formik.errors.vaccinationStatus}
            >
              <option value="">Select Status</option>
              <option value="vaccinated">Vaccinated</option>
              <option value="not_vaccinated">Not Vaccinated</option>
              <option value="refused">Refused</option>
            </FormSelect>
            <FormSelect
              label="Nutrition Status"
              id="nutritionStatus"
              name="nutritionStatus"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.nutritionStatus}
              touched={formik.touched.nutritionStatus}
              error={formik.errors.nutritionStatus}
            >
              <option value="">Select Status</option>
              <option value="good">Good</option>
              <option value="moderate">Moderate</option>
              <option value="severe">Severe</option>
            </FormSelect>
            <FormSelect
              label="WASH Status"
              id="washStatus"
              name="washStatus"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.washStatus}
              touched={formik.touched.washStatus}
              error={formik.errors.washStatus}
            >
              <option value="">Select Status</option>
              <option value="adequate">Adequate</option>
              <option value="inadequate">Inadequate</option>
            </FormSelect>
            <FormSelect
              label="Birth Registration Status"
              id="birthRegistrationStatus"
              name="birthRegistrationStatus"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.birthRegistrationStatus}
              touched={formik.touched.birthRegistrationStatus}
              error={formik.errors.birthRegistrationStatus}
            >
              <option value="">Select Status</option>
              <option value="registered">Registered</option>
              <option value="not_registered">Not Registered</option>
            </FormSelect>
            <FormInput
              label="Child Weight (kg)"
              id="childWeight"
              name="childWeight"
              type="number"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.childWeight}
              touched={formik.touched.childWeight}
              error={formik.errors.childWeight}
            />
            <FormTextarea
              label="Notes"
              id="notes"
              name="notes"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.notes}
            />
            <button type="submit" disabled={loading}>
              {loading ? 'Submitting...' : 'Submit'}
            </button>
          </form>

          {submissionStatus === 'success' && !loading && (
            <div className="success-message">
              <h3>Data submitted successfully!</h3>
            </div>
          )}
          {submissionStatus === 'error' && !loading && (
            <div className="error-message">
              <h3>Error saving data. Please try again.</h3>
            </div>
          )}
          {errorMessage && (
            <div className="error-message">
              <p>{errorMessage}</p>
            </div>
          )}
        </div>
      );
    }

    export default DataCollectionForm;
