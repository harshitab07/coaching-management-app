import React from 'react';
import Layout from '../components/layout/layout';
import TotalCounts from '../components/TotalCounts';
import '../styles/dashboard.css';
import '../styles/CreateEntry.css';
import CreateNewEntryButton from '../components/new_entry/CreateNewEntryButton';

const Dashboard = () => {
  
  const totalStudents = 50;

  return (
    <div>
      <Layout title='My-Coaching Management App : Dashboard'>
        <div className='dashboard_container d-flex flex-column'>
          <div className='d-flex flex-wrap dashboard_total_counts'>
            <div className='d-flex flex-column students_count count_create'>
            <TotalCounts heading="Total Students" count={totalStudents} type="students" />
            <CreateNewEntryButton type="Student" />
            </div>
          </div>
        </div>
      </Layout>
    </div>
  )
}

export default Dashboard
