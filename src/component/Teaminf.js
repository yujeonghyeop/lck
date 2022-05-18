import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Alert } from '@mui/material';
function Teaminf() {
  let i = 0
  const [myid, setmyId] = useState('');
  const [deleteid, setDeleteid] = useState('');
  const [teamrecord, setTeamrecord] = useState([]);
  const [teamname , setTeamname] = useState()
  const [coach, setCoach] = useState()
  const [teaminfor, setTeaminfor] = useState([]);
  const [showteamname, setshowteamname] = useState('');
  const [showteamcoach, setshowteamcoach] = useState('');
  const [showwin, setshowwin] = useState(0);
  const [showlose, setshowlose] = useState(0);

  const appChange = (e) => {
    setmyId(e.target.value);
  }
  const appChange1 = (e) => {
    setDeleteid(e.target.value);
  }
  const teamChange = (e) =>{
    setTeamname(e.target.value);
  }
  const coachChange = (e) =>{
    setCoach(e.target.value);
  }
  const btnClick2 = () => {
    sendRequest();
  }
  const btnClick3 = () => {
    deleteteam();
  }
  const teamform = (e) =>{
    e.preventDefault();
    createteam()
  }
  const deleteteam = async() => {  // 팀 정보 삭제 함수
    const response = await axios.delete("http://localhost:5000/api/deleteteam", {params:{id:deleteid}});
    console.log(response)
    showtable()
  }
  const sendRequest = async() => {  // 팀 정보 조회 함수
    const response = await axios.get("http://localhost:5000/api/teamname", {params:{id:myid}});
    const teaminformation = await response.data.map((rowData)=>({
      teamname : rowData.teamname,
      coach : rowData.coach,
      nickname : rowData.nickname,
      position : rowData.position,
      win : rowData.win,
      lose : rowData.lose,
    }))
    if (teaminformation.length === 0){
      alert("선수를 등록해 주세요!")
    }
    else {
    setTeaminfor(teaminformation);
    setshowteamname(teaminformation[0].teamname)
    setshowteamcoach(teaminformation[0].coach)
    setshowwin(teaminformation[0].win)
    setshowlose(teaminformation[0].lose)
  }
  }
  const showtable = async() =>{ //팀 순위 정리 함수
    const response = await axios.get("http://localhost:5000/api/teamrecord");
    const inputdata = await response.data.map((rowData)=>({
      teamname : rowData.teamname,
      coach : rowData.coach,
      win : rowData.win,
      lose : rowData.lose,
      loseset : rowData.loseset
      
    }))
    setTeamrecord(inputdata)
  }
  useEffect(() => {
    showtable()
  },[]);
  const createteam = async() => {   //팀 등록 함수
    const response = await axios.post("http://localhost:5000/api/teamcreate",{teamname:teamname, coach:coach});
    showtable()
  }
  return (
    <div>
      <div style = {{display : 'flex'}}>
      <div style = {{margin : 30}}>
      <h1> 팀 등록</h1>
      <form>
              <div className="first_input">
                  <span>팀 이름   </span>
                  <input
                    type="text"
                    name="teamname"
                    style = {{float :'right'},{marginBottom:10}}
                    placeholder="팀 이름"
                    onChange={teamChange}
                  ></input>
                </div>

                <div className="second_input">
                  <span>감독 이름</span>
                    <input
                      name="coach"
                      placeholder="감독"
                      style = {{float :'right'},{marginBottom:10}}
                      onChange={coachChange}
                    ></input>
                </div>
                <button type = 'button' style = {{float :'right'}} onClick = {teamform} >등록</button>
              </form>
    
    </div>
    <div style = {{margin : 30}}>
        <h1>팀 삭제</h1>
        <form id='form1'>
          <input type='text' value={deleteid} onChange={appChange1} placeholder = "팀 이름을 입력하세요"/>
          <button type='button' onClick={btnClick3}>삭제</button>
      </form>
      </div>
      </div>
    <div style = {{margin : 30}}>
      <h1>팀 조회</h1>
      <form id='form'>
        <input type='text' value={myid} onChange={appChange} placeholder = "팀 이름을 입력하세요"/>
        <button type='button' onClick={btnClick2}>조회</button>
      </form>
      <div >
        <div>
          <h3>팀 이름 : {showteamname}</h3>
          <h3>감독 : {showteamcoach}</h3>
          <h3>이번시즌 기록 : {showwin} W {showlose} L</h3>
          </div>
          <h2>선수명단</h2>
      <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Player</TableCell>
            <TableCell align="center">Position</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {teaminfor.map((row) => (
            <TableRow
              key={row.nickname}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
              <TableCell align="center">{row.nickname}</TableCell>
              <TableCell align="center">{row.position}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        </Table>
    </TableContainer>
      </div>
      </div>
<div style = {{margin : 30}}>
      <h1> 팀 순위</h1>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Num</TableCell>
            <TableCell align="center">Team name</TableCell>
            <TableCell align="center">Coach</TableCell>
            <TableCell align="center">Win</TableCell>
            <TableCell align="center">Lose</TableCell>
            <TableCell align="center">Winset</TableCell>
            <TableCell align="center">loseset</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {teamrecord.map((row) => (
            <TableRow
              key={row.teamname}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
              <TableCell align="center">{i+=1,i}</TableCell>
              <TableCell align="center">{row.teamname}</TableCell>
              <TableCell align="center">{row.coach}</TableCell>
              <TableCell align="center">{row.win}</TableCell>
              <TableCell align="center">{row.lose}</TableCell>
              <TableCell align="center">{row.win * 2}</TableCell>
              <TableCell align="center">{row.loseset}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        </Table>
    </TableContainer>
    </div>
    </div>
  );
}


export default Teaminf;