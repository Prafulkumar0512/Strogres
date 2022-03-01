import { Button } from 'antd';
import React, { useState } from 'react'
import { FileViewer } from 'react-file-viewer';
import { useDispatch } from 'react-redux';
import { SidePane } from 'react-side-pane';
import { LeftOutlined } from "@ant-design/icons";
import { useLocation } from "react-router";
import "./ParseDetails.css"

function ParseDetails(props) {
    const [option, setOption] = useState(false)
    const [openPanel, setOpenPanel] = useState(false)
    const [data, setData] = useState()
    const location = useLocation()
    const dispatch = useDispatch()
    // const sendMail = async () => {

    // }
    console.log(props.parsedata)
    return (
        <div className='table-container' >
            {location.pathname !== '/admin/parsedata' ? <div style={{ display: 'flex' }} onClick={() => props.onchange(false)} >
                <LeftOutlined style={{ color: '#f8643c', fontSize: 25 }} />
                <p>More Resume Parsing</p>
            </div> : null}
            <div>
                <h2>Parsed Resume Details</h2>
            </div>
            <div className="job-tableContainer">
                <table className='job-table'>
                    {props.parsedata.map(x => {
                        return (
                            <tr>
                                <td>{x.parsedata.NAME}</td>
                                <td onClick={() => { setOpenPanel(true); setData(x) }} >View Details</td>
                                <td>Remove</td>
                                <td>Send Mail</td>
                            </tr>
                        )
                    })}

                </table>
            </div>
            <SidePane open={openPanel} width={50} onClose={() => setOpenPanel(false)}>
                {data ? <div style={{ fontFamily: "Montserrat" }} >
                    <div style={{ backgroundColor: '#F0ECEC', display: 'flex', justifyContent: 'space-between', height: "20vh", padding: 20 }} >
                        <div>
                            <h1>{data.parsedata.NAME}</h1>
                            <p style={{ padding: 0, margin: 0 }} >{data.parsedata.DESIGNATION}</p>
                            <p style={{ padding: 0, margin: 0 }} >{data.parsedata["EMAIL ADDRESS"]}</p>
                        </div>
                        <Button style={{ borderRadius: 10, marginTop: 20, backgroundColor: '#FF6A3D', margin: 5, color: 'white' }} >Send Mail</Button>
                    </div>
                    <div style={{ display: 'flex' }} >
                        <div onClick={() => { setOption(!option) }} style={{ fontFamily: 'Montserrat', textAlign: 'center', width: '50%', color: !option ? '#FFFFFF' : 'black', backgroundColor: !option ? '#FF6A3D' : 'grey', padding: 8 }} >Details</div>
                        <div onClick={() => { setOption(!option) }} style={{ fontFamily: 'Montserrat', textAlign: 'center', width: '50%', color: !option ? 'black' : '#ffffff', backgroundColor: !option ? 'grey' : '#FF6A3D', padding: 8 }} >Resume</div>
                    </div>
                    {option ?
                        <FileViewer
                            filePath={data.url}
                            fileType='pdf'
                            onError={e => {
                                console.log(e, "error in file-viewer");
                            }}
                        /> :
                        <div style={{ backgroundColor: '#F8F3EF', height: '70vh' }} >
                            <div style={{ padding: 20 }} >
                                <h2>Education</h2>
                                <p>{data.parsedata.DEGREE}</p>
                            </div>
                            <div style={{ padding: 20 }} >
                                <h2>Companies Worked At</h2>
                                <p>{data.parsedata["COMPANIES WORKED AT"]}</p>
                            </div>
                        </div>}
                </div> : null}
            </SidePane>
        </div>
    )
}

export default ParseDetails