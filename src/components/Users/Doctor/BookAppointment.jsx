import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const BookAppointment = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [comments, setComments] = useState('');
  const [files, setFiles] = useState([]);

  const handleFileChange = (e) => {
    setFiles([...e.target.files]);
  };

  const handleSubmit = () => {
    // Handle form submission here
    console.log('Date:', selectedDate);
    console.log('Comments:', comments);
    console.log('Files:', files);
  };

  const styles = {
    container: {
      backgroundColor: '#E7E8EA',
      color: '#121F49',
      padding: '20px',
      borderRadius: '8px',
    },
    button: {
      backgroundColor: '#F05423',
      color: '#fff',
      padding: '10px 20px',
      borderRadius: '4px',
      cursor: 'pointer',
    },
  };

  return (
    <div style={styles.container}>
      <h1>Book an Appointment</h1>

      <div>
        <h3>Select Date and Time</h3>
        <DatePicker
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          showTimeSelect
          timeIntervals={15}
          dateFormat="MMMM d, yyyy h:mm aa"
        />
      </div>

      <div>
        <h3>Comments</h3>
        <textarea
          value={comments}
          onChange={(e) => setComments(e.target.value)}
          rows="4"
          cols="50"
        />
      </div>

      <div>
        <h3>Add Documents</h3>
        <input type="file" multiple onChange={handleFileChange} />
      </div>

      <div>
        <button style={styles.button} onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default BookAppointment;