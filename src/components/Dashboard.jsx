import React, { useEffect, useState } from 'react';
    import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

    function Dashboard() {
      const [data, setData] = useState([]);
      const [errorMessage, setErrorMessage] = useState(null);

      useEffect(() => {
        try {
          const storedData = localStorage.getItem('uhdp-data');
          if (storedData) {
            const parsedData = JSON.parse(storedData);
            if (parsedData) {
              const aggregatedData = aggregateData(parsedData);
              setData(aggregatedData);
            } else {
              setData([]);
            }
          } else {
            setData([]);
          }
        } catch (error) {
          console.error('Error loading data from localStorage:', error);
          setErrorMessage('Error loading data from localStorage.');
          setData([]);
        }
      }, []);

      const aggregateData = (parsedData) => {
        const aggregated = {};
        if (parsedData && parsedData.location) {
          const location = parsedData.location;
          if (!aggregated[location]) {
            aggregated[location] = {
              location: location,
              vaccinated: 0,
              not_vaccinated: 0,
              refused: 0,
              good: 0,
              moderate: 0,
              severe: 0,
              adequate: 0,
              inadequate: 0,
              registered: 0,
              not_registered: 0,
            };
          }
          if (parsedData.vaccinationStatus) {
            aggregated[location][parsedData.vaccinationStatus]++;
          }
          if (parsedData.nutritionStatus) {
            aggregated[location][parsedData.nutritionStatus]++;
          }
          if (parsedData.washStatus) {
            aggregated[location][parsedData.washStatus]++;
          }
          if (parsedData.birthRegistrationStatus) {
            aggregated[location][parsedData.birthRegistrationStatus]++;
          }
        }
        return Object.values(aggregated);
      };

      const colors = {
        vaccinated: '#8884d8',
        not_vaccinated: '#82ca9d',
        refused: '#ffc658',
        good: '#a4de6c',
        moderate: '#d0ed57',
        severe: '#ff7300',
        adequate: '#0088fe',
        inadequate: '#00c49f',
        registered: '#ffbb28',
        not_registered: '#ff8042',
      };

      return (
        <div>
          <h1>UHDP Dashboard</h1>
          <p>Welcome to the UHDP application.</p>
          {errorMessage && <div className="error-message">{errorMessage}</div>}
          {data.length > 0 ? (
            <BarChart width={800} height={400} data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="location" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="vaccinated" fill={colors.vaccinated} />
              <Bar dataKey="not_vaccinated" fill={colors.not_vaccinated} />
              <Bar dataKey="refused" fill={colors.refused} />
              <Bar dataKey="good" fill={colors.good} />
              <Bar dataKey="moderate" fill={colors.moderate} />
              <Bar dataKey="severe" fill={colors.severe} />
              <Bar dataKey="adequate" fill={colors.adequate} />
              <Bar dataKey="inadequate" fill={colors.inadequate} />
              <Bar dataKey="registered" fill={colors.registered} />
              <Bar dataKey="not_registered" fill={colors.not_registered} />
            </BarChart>
          ) : (
            <p>No data available to display.</p>
          )}
        </div>
      );
    }

    export default Dashboard;
