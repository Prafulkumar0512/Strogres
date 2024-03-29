import React, { useEffect } from 'react'
import TopNavBar from './TopNavBar'
import './MyApplication.css'
import { useDispatch, useSelector } from 'react-redux';
import { FetchAppliedJob } from '../../store/action/applicant'

export default function MyApplication() {
  const data = useSelector(x => x.app.applied)
  const user = useSelector(x => x.auth.userData)
  const dispatch = useDispatch()
  const fetchdata = async () => {
    // const response = await fetch('/extract', {
    //   method: 'POST',
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({
    //     url: user.url
    //   })
    // })
    // const resData = await response.json()
    // console.log(resData)
    await dispatch(FetchAppliedJob())

  }
  console.log(data)
  useEffect(() => {
    fetchdata()
  }, [])
  return (
    <TopNavBar>
      <div className="MyApplication" style={{ fontFamily: 'Montserrat' }} >
        <div
          className="job-tableContainer"
          style={{ backgroundColor: "white" }}
        >
          <h1>My Application</h1>
          {data.length !== 0 ? <table className="job-table">
            <tr>
              <th>Company Name</th>
              <th>Role</th>
              <th>Job Type</th>
              <th>Applied Date</th>
              <th>View Application</th>
              <th>Status</th>
            </tr>
            {data.map(x => {
              var someDate = new Date(x.applieddate);
              var numberOfDaysToAdd = 10;
              var result = someDate.setDate(someDate.getDate() + numberOfDaysToAdd);
              var bool = new Date(result).toLocaleDateString() === new Date().toLocaleDateString() ? true : false
              return (
                <tr>
                  <td>{x.companyname}</td>
                  <td> {x.jobname}</td>
                  <td>{x.jobtype}</td>
                  <td>{x.applieddate}</td>
                  <td><a href={x.url} target="_blank" >Link</a></td>
                  <td style={{ color: bool ? '#2662ff' : x.status === "Hold" ? '#ffcc00' : x.status === "Rejected" ? 'red' : 'green' }} >{!bool ? x.status : "No Response\n Looks like your resume haven't be best for this role. You can change your resume and apply again"}</td>
                </tr>
              )
            })}


          </table> : <div style={{ position: 'absolute', top: '50%', left: '43%' }} >
            <h2>No Job Applied Yet</h2>
          </div>}
        </div>
      </div>
    </TopNavBar>
  );
}
