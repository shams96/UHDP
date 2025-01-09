import React from 'react';
    import { useFormik } from 'formik';
    import * as Yup from 'yup';

    const validationSchema = Yup.object({
      vaccinationStatus: Yup.string().required('Vaccination status is required'),
      nutritionStatus: Yup.string().required('Nutrition status is required'),
      washStatus: Yup.string().required('WASH status is required'),
      birthRegistrationStatus: Yup.string().required('Birth registration status is required'),
      childWeight: Yup.number().required('Child weight is required').positive('Weight must be positive'),
      location: Yup.string().required('Location is required'),
      notes: Yup.string(),
    });

    function DataCollectionForm() {
      const formik = useFormik({
        initialValues: {
          vaccinationStatus: '',
          nutritionStatus: '',
          washStatus: '',
          birthRegistrationStatus: '',
          childWeight: '',
          location: '',
          notes: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
          alert(JSON.stringify(values, null, 2));
        },
      });

      return (
        <div className="form-container">
          <h2>Data Collection Form</h2>
          <form onSubmit={formik.handleSubmit}>
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
              <label htmlFor="notes">Notes</label>
              <textarea
                id="notes"
                name="notes"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.notes}
              />
            </div>
            <button type="submit">Submit</button>
          </form>
        </div>
      );
    }

    export default DataCollectionForm;
