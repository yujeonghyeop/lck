import * as React from 'react';
import { useState,useEffect } from 'react';
import axios from 'axios';
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import background from '../lck.jpeg';
const Playerinf = () => {
    const [playernickname, setplayernickname] = useState('');
    const [playername, setplayername] = useState('');
    const [playerposition, setplayerposition] = useState('');
    const [playerteam, setplayerteam] = useState('');
    const [error, setError] = useState(0);
    const [deletenickname, setDeletenickname] = useState('');
    const [playerlist, setplayerlist] = useState([])

    const playernicknamechange = (e) =>{
        setplayernickname(e.target.value);
      }
    const playernamechange = (e) =>{
        setplayername(e.target.value);
    }
    const playerpositionchange = (e) =>{
        setplayerposition(e.target.value);
    }
    const playerplayerteamchange = (e) =>{
        setplayerteam(e.target.value);
    }
    const playerform = (e) =>{
        e.preventDefault();
        createplayer()
      //   if (error===0){
      //       alert("등록되지 않은 팀입니다")
      //   }
      //   else{
      //   alert("선수 등록이 완료되었습니다")
      // }
    }
    const deletechange = (e) => {
      setDeletenickname(e.target.value);
    }
    const deletebutton = () => {
      deleteplayer();
    }

    const createplayer = async() => {   //선수 등록 함수
        const response = await axios.post("http://localhost:5000/api/playercreate",{nickname:playernickname, realname:playername,position:playerposition, myteam:playerteam});
        setError(response.headers['content-length'])
        showplayer();
      }
    const deleteplayer = async() =>{  //선수 삭제 함수
        const response = await axios.delete("http://localhost:5000/api/playerdelete",{params:{nickname:deletenickname}});
        console.log(response)
        showplayer();
    }
    const showplayer = async() =>{ //선수 리스트 보여주는 함수
      const response = await axios.get("http://localhost:5000/api/playerlist");
      const inputdata = await response.data.map((rowData)=>({
        nickname : rowData.nickname,
        realname : rowData.realname,
        position : rowData.position,
        myteam : rowData.myteam,
        kills : rowData.kills,
        deaths : rowData.deaths,
        assists : rowData.assists
      }))
      setplayerlist(inputdata)
    }
    useEffect(() => {
      showplayer()
    },[]);
    const styled ={
      back:{
        backgroundImage: `url(${background})`,
        backgroundRepeat:"no-repeat",
        backgroundSize:'cover',
        
      }
    }
    return (
      <div style = {styled.back} >
        <div style={{color:'white'}}>
          <div style = {{display : 'flex'}}>
          <div style={{margin : 30}}>
            <h1 style={{color:'white'}}> 선수 등록</h1>
      <form>
              <div className="first_input" style={{color:'white'}}>
                  <span>선수 닉네임</span>
                  <input
                    name="nickname"
                    placeholder="닉네임"
                    style = {{float :'right'},{marginBottom:10}}
                    onChange={playernicknamechange}
                  ></input>
                </div>

                <div className="second_input">
                  <span>선수 이름</span>
                    <input
                      name="realname"
                      placeholder="이름"
                      style = {{float :'right'},{marginBottom:10}}
                      onChange={playernamechange}
                    ></input>
                </div>
                <div className="second_input">
                  <span>선수 포지션</span>
                    <input
                      name="position"
                      placeholder="포지션"
                      style = {{float :'right'},{marginBottom:10}}
                      onChange={playerpositionchange}
                    ></input>
                </div>
                <div className="second_input">
                  <span>선수 소속팀</span>
                    <input
                      name="team"
                      placeholder="소속팀"
                      style = {{float :'right'},{marginBottom:10}}
                      onChange={playerplayerteamchange}
                    ></input>
                </div>
                <button type = 'button' style = {{float :'right'}} onClick = {playerform} >등록</button>
              </form>
    </div>
    <div style={{margin : 30}}>
        <h1>선수 삭제</h1>
        <form id='form1'>
          <input type='text' value={deletenickname} onChange={deletechange} placeholder = "선수 이름을 입력하세요"/>
          <button type='button' onClick={deletebutton}>삭제</button>
      </form>
      </div>
      </div>
      <h1>선수 정보 </h1>
      <div style = {{margin : 30}}>
      <TableContainer component={Paper}  >
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow >
            <TableCell align="center">Nickname</TableCell>
            <TableCell align="center" >Realname</TableCell>
            <TableCell align="center" >Position</TableCell>
            <TableCell align="center">Teamname</TableCell>
            <TableCell align="center">Kill</TableCell>
            <TableCell align="center">Death</TableCell>
            <TableCell align="center">Assist</TableCell>
            <TableCell align="center" >K/D/A</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {playerlist.map((row) => (
            <TableRow
              key={row.nickname}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
              <TableCell align="center" >{row.nickname}</TableCell>
              <TableCell align="center" >{row.realname}</TableCell>
              <TableCell align="center">{row.position}</TableCell>
              <TableCell align="center">{row.myteam}</TableCell>
              <TableCell align="center">{row.kills}</TableCell>
              <TableCell align="center">{row.deaths}</TableCell>
              <TableCell align="center" >{row.assists}</TableCell>
              <TableCell align="center" >{(String((row.kills + row.assists) /row.deaths)).substr(0,3)}</TableCell>


            </TableRow>
          ))}
        </TableBody>
        </Table>
    </TableContainer>
    </div>
    </div>
    </div>
    )
}

export default Playerinf;