import React , {useState} from 'react';
import CanvasJSReact from '@canvasjs/react-charts';
import { useSelector } from 'react-redux';

const CanvasJSChart = CanvasJSReact.CanvasJSChart;
export default function Graph (){
    const [selectedOption, setSelectedOption] = useState('activePatients');
    const users = useSelector(state => state.users);
    const getDataPoints = () => {
        if (selectedOption === 'activePatients') {
            // Calculate active patients data for the last month
            // Example: Count active patients for each day and return the data points
            // Replace the example logic with your actual calculation
            const currentDate = new Date();
            const lastMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);
            const activePatientsData = [];
    
            for (let i = 0; i < 30; i++) {
                const currentDate = new Date(lastMonth.getFullYear(), lastMonth.getMonth(), lastMonth.getDate() + i);
                let activePatientsCount = 0;
        
                // Iterate over users to count active patients for this day
                users.forEach(user => {
                    if (user.dateTestPositive && user.dateRecovery) {
                        const testPositiveDate = new Date(user.dateTestPositive);
                        const recoveryDate = new Date(user.dateRecovery);
                        
                        // Check if the user was active on the current day
                        if (testPositiveDate <= currentDate && recoveryDate >= currentDate) {
                            activePatientsCount++;
                        }
                    }
                });
        
                // Add data point for this day
                activePatientsData.push({ x: currentDate, y: activePatientsCount });
            }
    
            return activePatientsData;
        } else if (selectedOption === 'copaMembersNotVaccinated') {
            // Calculate the number of Copa members not vaccinated
            // Example: Filter users who are Copa members and not vaccinated, and return the count
            // Replace the example logic with your actual calculation
            const membersNotVaccinated = users.filter(user =>  user.vaccinations.length === 0);
            const membersVaccinated = users.filter(user =>  user.vaccinations.length > 0);

            return [{ label: "Members not Vaccinated", y: membersNotVaccinated.length },
                   { label: "Members Vaccinated", y: membersVaccinated.length }];
        }
        return [];
    };
    const options = {
        animationEnabled: true,
        exportEnabled: true,
        theme: "light2",
        title: {
            text: selectedOption === 'activePatients' ? "Active Patients Each Day" : "Copa Members Not Vaccinated"
        },
        axisY: {
            includeZero: true
        },
        data: [{
            type: "column",
            dataPoints: getDataPoints()
        }]
    };

    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
    };
    
    return (
            <div className="container"> 
            <h1>Graph Diseas:</h1>
            <div>
                <label htmlFor="graphType">Select Graph Type:</label>
                <select id="graphType" value={selectedOption} onChange={handleOptionChange}>
                    <option value="activePatients">Active Patients Each Day</option>
                    <option value="copaMembersNotVaccinated">Copa Members Not Vaccinated</option>
                </select>
            </div>
            <CanvasJSChart options={options} />
             </div>
    );
};


