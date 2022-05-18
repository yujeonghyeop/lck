import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
const Calender = () => {
    const [matchid, setmatchid] = useState('');
    const [matchdate, setmatchdate] = useState('');
    const [team1, setteam1] = useState('');
    const [team2, setteam2] = useState('');
    const [calenderlist, setCalenderlist] = useState([])
    const [searchteamcal, setsearchteamcal] = useState('');
    const [teamcalender, setteamcalender] = useState([]);
    const [day, setday] = useState('');
    const [changeid, setchangeid] = useState();
    const [result, setresult] = useState([]);
    const [recordlist, setrecordlist] = useState([]);


    const matchidchange = (e) =>{
        setmatchid(e.target.value);
      }
    const datechange = (e) =>{
        setmatchdate(e.target.value);
    }
    const team1change = (e) =>{
        setteam1(e.target.value);
    }
    const team2change = (e) =>{
        setteam2(e.target.value);
    }
    const teamcalchange = (e) => {
      setsearchteamcal(e.target.value);
    }
    const idchange = (e) => {
      setchangeid(e.target.value);
    }
    const daychange = (e) => {
      setday(e.target.value);
    }
    const calenderform = (e) =>{
        e.preventDefault();
        createCalender()
    }
    const btnClick = () =>{
      searchCalender()
    }
    const btnClieck2 = () =>{
      daychanged()
    }
    const createCalender = async() => {   //선수 등록 함수
        const response = await axios.post("http://localhost:5000/api/calendercreate",{match_id:matchid, match_day:matchdate,team1:team1, team2:team2});
        showCalender()
      }
    const searchCalender = async() =>{
      const response = await axios.get("http://localhost:5000/api/teamcalender", {params:{teamname:searchteamcal}});
      const inputdata1 = await response.data.map((rowData)=>({
        match_id : rowData.match_id,
        match_day : rowData.match_day,
        team1 : rowData.team1,
        team2 : rowData.team2,
        done : rowData.done
      }))
      setteamcalender(inputdata1)
    }
    const daychanged = async() =>{
      const response = await axios.put("http://localhost:5000/api/calenderchange",{match_id:changeid, match_day:day});
      showCalender()
    }
    const showCalender = async() =>{
        const response = await axios.get("http://localhost:5000/api/shownotrecord");
        const inputdata = await response.data.map((rowData)=>({
            match_id : rowData.match_id,
            match_day : rowData.match_day,
            team1 : rowData.team1,
            team2 : rowData.team2,
            done : rowData.done
          }))
          setCalenderlist(inputdata)
        }
      const showrecord = async() =>{
        const response = await axios.get("http://localhost:5000/api/showrecord");
        const inputdata = await response.data.map((rowData)=>({
            match_id : rowData.match_id,
            match_day : rowData.match_day,
            winteam : rowData.winteam,
            loseteam : rowData.loseteam,
            winteam_winset : rowData.winteam_winset,
            winteam_loseset : rowData.winteam_loseset
          }))
          setrecordlist(inputdata)
        }
    useEffect(() => {
        showCalender()
        showrecord()
    },[]);
    return (
        <div >
          <div style = {{display : 'flex'}}>
          <div style={{margin : 30}}>
            <h1> 일정 등록</h1>
      <form>
              <div className="first_input">
                  <span>Match_ID</span>
                  <input
                    name="match_id"
                    placeholder="매치 번호"
                    style = {{float :'right'},{marginBottom:10}}
                    onChange={matchidchange}
                  ></input>
                </div>

                <div className="second_input">
                  <span>날짜</span>
                    <input
                      name="date"
                      placeholder="2022-03-01"
                      style = {{float :'right'},{marginBottom:10}}
                      onChange={datechange}
                    ></input>
                </div>
                <div className="second_input">
                  <span>팀 1</span>
                    <input
                      name="team1"
                      placeholder="팀 명"
                      style = {{float :'right'},{marginBottom:10}}
                      onChange={team1change}
                    ></input>
                </div>
                <div className="second_input">
                  <span>팀 2</span>
                    <input
                      name="team2"
                      placeholder="팀 명"
                      style = {{float :'right'},{marginBottom:10}}
                      onChange={team2change}
                    ></input>
                </div>
                <button type = 'button' style = {{float :'center'}} onClick = {calenderform} >등록</button>
              </form>
    </div>
    <div style = {{margin : 30}}>
        <h1>일정 수정</h1>
        <form id='form1'>
          <input type='text' value={changeid} onChange={idchange} placeholder = "수정하고 싶은 match_id 를 입력하세요"/>
          <input type='text' value={day} onChange={daychange} placeholder = "수정하려는 날짜를 입력하세요"/>
          <button type='button' onClick={btnClieck2}>수정</button>
      </form>
      </div>
    </div>
      <h1>팀 별 경기 조회</h1>
      <form id='form'>
        <input type='text' value={searchteamcal} onChange={teamcalchange} placeholder = "팀 이름을 입력하세요"/>
        <button type='button' onClick={btnClick}>조회</button>
      </form>
      <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell component="th" scope="row" width="20%"align="center">Match_day</TableCell>
            <TableCell align="right">team1</TableCell>
            <TableCell align="right"></TableCell>
            <TableCell align="left"></TableCell>
            <TableCell align="left">team2</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {teamcalender.map((row) => (
            <TableRow
              key={row.match_id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
              <TableCell component="th" scope="row" align="center">{row.match_day.substr(0,10)}</TableCell>
              <TableCell align="right">{row.team1}</TableCell>
              <TableCell align="right"></TableCell>
              <TableCell align="left"></TableCell>
              <TableCell align="left">{row.team2}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        </Table>
    </TableContainer>
     
      
      <h1>전체 경기 일정 </h1>
      <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell component="th" scope="row" width="20%"align="center">Match_day</TableCell>
            <TableCell align="right">team1</TableCell>
            <TableCell align="right"></TableCell>
            <TableCell align="left"></TableCell>
            <TableCell align="left">team2</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {recordlist.map((row) => (
            <TableRow
              key={row.match_id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
              <TableCell component="th" scope="row" align="center">{row.match_day.substr(0,10)}</TableCell>
              <TableCell align="right">{row.winteam}</TableCell>
              <TableCell align="right">{row.winteam_winset}</TableCell>
              <TableCell align="left">{row.winteam_loseset}</TableCell>
              <TableCell align="left">{row.loseteam}</TableCell>
            </TableRow>
          ))}
          {calenderlist.map((row) => (
            <TableRow
              key={row.match_id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
              <TableCell component="th" scope="row" align="center">{row.match_day.substr(0,10)}</TableCell>
              <TableCell align="right">{row.team1}</TableCell>
              <TableCell align="right"></TableCell>
              <TableCell align="left"></TableCell>
              <TableCell align="left">{row.team2}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        </Table>
    </TableContainer>
    </div>
    )
}

export default Calender;