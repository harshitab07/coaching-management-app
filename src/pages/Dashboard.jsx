import React from 'react';
import Layout from '../components/layout/layout';
import TotalCounts from '../components/totalCounts';
import '../styles/dashboard.css';
import '../styles/CreateEntry.css';
import CreateNewEntryButton from '../components/new_entry/CreateNewEntryButton';

const Dashboard = () => {
  const totalStudents = 50;
  const totalTeachers = 'Coming Soon..';

  return (
    <div>
      <Layout title='My-Coaching Management App : Dashboard'>
        <div className='dashboard_container d-flex flex-column'>
          <div className='d-flex flex-wrap dashboard_total_counts'>
            <div className='d-flex flex-column students_count count_create'>
            <TotalCounts heading="Total Students" count={totalStudents} type="students" />
            <CreateNewEntryButton type="Student" />
            </div>
            <div className='d-flex flex-column teachers_count count_create'>
            <TotalCounts heading="Total Teachers" count={totalTeachers} type="teachers" />
            <CreateNewEntryButton type="Teacher" />
            </div>
          </div>
          <div className='d-flex add_new_entries'>

          </div>
        </div>
      </Layout>
    </div>
  )
}

export default Dashboard
