import { Button, Input, Modal } from 'antd';
import React, { useState } from 'react'
import { FileViewer } from 'react-file-viewer';
import { SidePane } from 'react-side-pane';
import { LeftOutlined } from "@ant-design/icons";
import { useLocation } from "react-router";
import "./ParseDetails.css"
import { toast, ToastContainer } from 'react-toastify';
import TextArea from 'antd/lib/input/TextArea';

function ParseDetails(props) {

    const [name, setName] = useState("")
    const mailBody = `Hello ${name} \nWe have processed your resume and we would like to call you for further rounds \n `
    const [option, setOption] = useState(false)
    const [openPanel, setOpenPanel] = useState(false)
    const [data, setData] = useState()
    const [subject, setSubject] = useState("Interview Call")
    const [email, setEmail] = useState()
    const [visible, setVisible] = useState(false)
    const [mail, setMail] = useState()
    const location = useLocation()
    const sendMail = async () => {
        try {
            await fetch('/sendMail', {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    mail: mail,
                    subject: subject,
                    body: mailBody
                })
            })
            setVisible(false)
            toast.success("EMAIL SENT", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            })
        }
        catch (err) {
            setVisible(false)
            toast.error(err.message, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            })
        }
    }
    console.log(props.parsedata)
    return (
        <div className='table-container' >
            <ToastContainer />
            <Modal visible={visible} onOk={sendMail} title={<h3 style={{ fontSize: 15, fontFamily: 'Montserrat' }} >Mail Body</h3>} onCancel={() => setVisible(false)} >
                <div style={{ margin: 8 }} >
                    <label style={{ fontSize: 15, fontFamily: 'Montserrat' }}>Sender Email Id</label>
                    <Input value={email} unselectable />
                </div>
                <div style={{ margin: 8 }} >
                    <label style={{ fontSize: 15, fontFamily: 'Montserrat' }}>Sender Email Id</label>
                    <Input value={subject} onChange={(x) => setSubject(x.target.value)} />
                </div>
                <div style={{ margin: 8 }} >
                    <label style={{ fontSize: 15, fontFamily: 'Montserrat' }} >Email Body</label>
                    <TextArea rows={6} value={mailBody} onChange={(x) => setMail(x.target.value)} />
                </div>
            </Modal>
            {
                location.pathname !== '/admin/parsedata' ? <div style={{ display: 'flex' }} onClick={() => props.onchange(false)} >
                    <LeftOutlined style={{ color: '#f8643c', fontSize: 25 }} />
                    <p>More Resume Parsing</p>
                </div> : null
            }
            <div>
                <h2>Parsed Resume Details</h2>
            </div>
            <div className="job-tableContainer"  >
                <table className='job-table'>
                    {props.parsedata.map(x => {
                        return (
                            <tr>
                                <td>{x.parsedata.NAME}</td>
                                <div style={{ padding: 20, border: "1px solid #ddd" }} ><a onClick={function () { setOpenPanel(true); setData(x); }}  ><td  >View Details</td></a></div>
                                <div style={{ padding: 20, border: "1px solid #ddd" }} ><a onClick={() => { setVisible(true); setEmail(x.parsedata.EMAIL); setName(x.parsedata.NAME) }}  ><td  >Send Mail</td></a></div>
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
                            {/* <p style={{ padding: 0, margin: 0 }} >{data.parsedata.DESIGNATION}</p> */}
                            <p style={{ padding: 0, margin: 0 }} >{data.parsedata.EMAIL}</p>
                            <p style={{ padding: 0, margin: 0 }} >{data.parsedata.MOBILE_NUMBER}</p>
                        </div>
                        <Button onClick={() => { setVisible(true); setEmail(data.parsedata.EMAIL); setName(data.parsedata.NAME) }} style={{ borderRadius: 10, marginTop: 20, backgroundColor: '#FF6A3D', margin: 5, color: 'white' }} >Send Mail</Button>
                    </div>
                    <div style={{ display: 'flex' }} >
                        <div onClick={() => { setOption(!option) }} style={{ fontFamily: 'Montserrat', textAlign: 'center', width: '50%', color: !option ? '#FFFFFF' : 'black', backgroundColor: !option ? '#FF6A3D' : 'grey', padding: 8 }} >Details</div>
                        <div onClick={() => { window.open(data.url, '_blank') }} style={{ fontFamily: 'Montserrat', textAlign: 'center', width: '50%', color: !option ? 'black' : '#ffffff', backgroundColor: !option ? 'grey' : '#FF6A3D', padding: 8 }} >Resume</div>
                    </div>
                    <div className='scroll' style={{ backgroundColor: '#F8F3EF', height: '70vh' }} >
                        <div style={{ padding: 10 }} >
                            <h2>Education</h2>
                            <ul>
                                {data.parsedata.EDUCATION === "" ? null : data.parsedata.EDUCATION.map(x => {
                                    return (
                                        <li>{x}</li>
                                    )
                                })}
                            </ul>
                        </div>
                        <div style={{ padding: 10 }} >
                            <h2>Experience</h2>
                            <ul>
                                {data.parsedata.EXPERIENCE === "" ? null : data.parsedata.EXPERIENCE.map(x => {
                                    return (
                                        <li>{x}</li>
                                    )
                                })}
                            </ul>
                        </div>
                        <div style={{ padding: 10 }} >
                            <h2>Skills</h2>
                            <ul>
                                {data.parsedata.SKILLS.map(x => {
                                    return (
                                        <li>{x}</li>
                                    )
                                })}
                            </ul>
                        </div>
                    </div>
                </div> : <div></div>}
            </SidePane>
        </div >
    )
}

export default ParseDetails