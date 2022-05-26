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
    const [deletenickname, setDeletenickname] = useState('');
    const [playerlist, setplayerlist] = useState([])
    const [oneplayer, setoneplayer] = useState([]);
    const [oneplayernickname, setoneplayernickname] = useState('');

    const playernicknamechange = (e) =>{
        setplayernickname(e.target.value);
      }
    const oneplayernicknamechange = (e) =>{
      setoneplayernickname(e.target.value);
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
    }
    const playerchangeform = (e) =>{
      e.preventDefault();
      changeplayer()
  }
    const deletechange = (e) => {
      setDeletenickname(e.target.value);
    }
    const deletebutton = () => {
      deleteplayer();
    }
    const nameasc = async() =>{
      const response = await axios.get("http://localhost:5000/api/nameasc");
      const inputdata = await response.data.map((rowData)=>({
        nickname : rowData.nickname,
        realname : rowData.realname,
        position : rowData.position,
        myteam : rowData.myteam,
        kills : rowData.kills,
        deaths : rowData.deaths,
        assists : rowData.assists,
        game_cnt : rowData.game_cnt,
        mvp_cnt :rowData.mvp_cnt
      }))
      setplayerlist(inputdata)
    }
    const positionasc = async() =>{
      const response = await axios.get("http://localhost:5000/api/positionasc");
      const inputdata = await response.data.map((rowData)=>({
        nickname : rowData.nickname,
        realname : rowData.realname,
        position : rowData.position,
        myteam : rowData.myteam,
        kills : rowData.kills,
        deaths : rowData.deaths,
        assists : rowData.assists,
        game_cnt : rowData.game_cnt,
        mvp_cnt :rowData.mvp_cnt
      }))
      setplayerlist(inputdata)
    }
    const teamnameasc = async() =>{
      const response = await axios.get("http://localhost:5000/api/teamnameasc");
      const inputdata = await response.data.map((rowData)=>({
        nickname : rowData.nickname,
        realname : rowData.realname,
        position : rowData.position,
        myteam : rowData.myteam,
        kills : rowData.kills,
        deaths : rowData.deaths,
        assists : rowData.assists,
        game_cnt : rowData.game_cnt,
        mvp_cnt :rowData.mvp_cnt
      }))
      setplayerlist(inputdata)
    }
    const killasc = async() =>{
      const response = await axios.get("http://localhost:5000/api/killasc");
      const inputdata = await response.data.map((rowData)=>({
        nickname : rowData.nickname,
        realname : rowData.realname,
        position : rowData.position,
        myteam : rowData.myteam,
        kills : rowData.kills,
        deaths : rowData.deaths,
        assists : rowData.assists,
        game_cnt : rowData.game_cnt,
        mvp_cnt :rowData.mvp_cnt
      }))
      setplayerlist(inputdata)
    }
    const deathasc = async() =>{
      const response = await axios.get("http://localhost:5000/api/deathasc");
      const inputdata = await response.data.map((rowData)=>({
        nickname : rowData.nickname,
        realname : rowData.realname,
        position : rowData.position,
        myteam : rowData.myteam,
        kills : rowData.kills,
        deaths : rowData.deaths,
        assists : rowData.assists,
        game_cnt : rowData.game_cnt,
        mvp_cnt :rowData.mvp_cnt
      }))
      setplayerlist(inputdata)
    }
    const assistasc = async() =>{
      const response = await axios.get("http://localhost:5000/api/assistasc");
      const inputdata = await response.data.map((rowData)=>({
        nickname : rowData.nickname,
        realname : rowData.realname,
        position : rowData.position,
        myteam : rowData.myteam,
        kills : rowData.kills,
        deaths : rowData.deaths,
        assists : rowData.assists,
        game_cnt : rowData.game_cnt,
        mvp_cnt :rowData.mvp_cnt
      }))
      setplayerlist(inputdata)
    }
    const gameasc = async() =>{
      const response = await axios.get("http://localhost:5000/api/gameasc");
      const inputdata = await response.data.map((rowData)=>({
        nickname : rowData.nickname,
        realname : rowData.realname,
        position : rowData.position,
        myteam : rowData.myteam,
        kills : rowData.kills,
        deaths : rowData.deaths,
        assists : rowData.assists,
        game_cnt : rowData.game_cnt,
        mvp_cnt :rowData.mvp_cnt
      }))
      setplayerlist(inputdata)
    }
    const mvpasc = async() =>{
      const response = await axios.get("http://localhost:5000/api/mvpasc");
      const inputdata = await response.data.map((rowData)=>({
        nickname : rowData.nickname,
        realname : rowData.realname,
        position : rowData.position,
        myteam : rowData.myteam,
        kills : rowData.kills,
        deaths : rowData.deaths,
        assists : rowData.assists,
        game_cnt : rowData.game_cnt,
        mvp_cnt :rowData.mvp_cnt
      }))
      setplayerlist(inputdata)
    }
    const showoneplayer = async() =>{
      const response = await axios.get("http://localhost:5000/api/showplayer",{params:{nickname:oneplayernickname}});
      const inputdata = await response.data.map((rowData)=>({
        nickname : rowData.nickname,
        realname : rowData.realname,
        position : rowData.position,
        myteam : rowData.myteam,
        kills : rowData.kills,
        deaths : rowData.deaths,
        assists : rowData.assists,
        game_cnt : rowData.game_cnt,
        mvp_cnt :rowData.mvp_cnt
      }))
      setoneplayer(inputdata)
    }
    const createplayer = async() => {   //선수 등록 함수
        const response = await axios.post("http://localhost:5000/api/playercreate",{nickname:playernickname, realname:playername,position:playerposition, myteam:playerteam});
        showplayer();
      }
      const changeplayer = async() => {   //선수 등록 함수
        const response = await axios.post("http://localhost:5000/api/changenickname",{nickname:playernickname,realname:playername});
        const response1 = await axios.post("http://localhost:5000/api/changerealname",{realname:playername,nickname:playernickname});
        const response2 = await axios.post("http://localhost:5000/api/changeposition",{position:playerposition,nickname:playernickname});
        const response3 = await axios.post("http://localhost:5000/api/changeteamname",{myteam:playerteam,nickname:playernickname});
        showplayer();
      }
    const deleteplayer = async() =>{  //선수 삭제 함수
        const response = await axios.delete("http://localhost:5000/api/playerdelete",{params:{nickname:deletenickname}});
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
        assists : rowData.assists,
        game_cnt : rowData.game_cnt,
        mvp_cnt :rowData.mvp_cnt
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
            <h1> 선수 등록</h1>
      <form id='form0'>
              <div>
                  <label>선수 닉네임</label>
                  <input
                    name="nickname"
                    placeholder="닉네임"
                    onChange={playernicknamechange}
                  ></input>
                </div>

                <div>
                  <label>선수 이름</label>
                    <input
                      name="realname"
                      placeholder="이름"
                      onChange={playernamechange}
                    ></input>
                </div>
                <div>
                  <label>선수 포지션</label>
                    <input
                      name="position"
                      placeholder="포지션"
                      onChange={playerpositionchange}
                    ></input>
                </div>
                <div>
                  <label>선수 소속팀</label>
                    <input
                      name="team"
                      placeholder="소속팀"
                      onChange={playerplayerteamchange}
                    ></input>
                </div>
                <button type = 'button' onClick = {playerform} >등록</button>
              </form>
    </div>
    <div style={{margin : 30}}>
        <h1>선수 삭제</h1>
        <form id='form1'>
          <button type='button' onClick={deletebutton}>삭제</button>
          <input type='text' value={deletenickname} onChange={deletechange} placeholder = "선수 이름을 입력하세요"/>
      </form>
      </div>
      <div style={{margin : 30}}>
            <h1> 선수 정보 수정</h1>
      <form>
              <div>
                  <label>선수 닉네임</label>
                  <input
                    name="nickname"
                    placeholder="닉네임"
                    onChange={playernicknamechange}
                  ></input>
                </div>

                <div>
                  <label>선수 이름</label>
                    <input
                      name="realname"
                      placeholder="이름"
                      onChange={playernamechange}
                    ></input>
                </div>
                <div>
                  <label>선수 포지션</label>
                    <input
                      name="position"
                      placeholder="포지션"
                      onChange={playerpositionchange}
                    ></input>
                </div>
                <div>
                  <label>선수 소속팀</label>
                    <input
                      name="team"
                      placeholder="소속팀"
                      onChange={playerplayerteamchange}
                    ></input>
                </div>
                <button type = 'button' onClick = {playerchangeform} >수정</button>
              </form>
    </div>
      </div>
      <div style = {{margin : 30, color :'white'}}>
      <h1>선수 조회</h1>
      <form id='form2'>
      <div style={{display:'flex'}}>
        <input type='text' value={oneplayernickname} onChange={oneplayernicknamechange} placeholder = "선수 닉네임을 입력하세요"/>
        <button type='button' onClick={showoneplayer}>조회</button>
        </div>
      </form>
      <div >
      <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center" >Nickname</TableCell>
            <TableCell align="center" >Realname</TableCell>
            <TableCell align="center" >Position</TableCell>
            <TableCell align="center">Teamname</TableCell>
            <TableCell align="center">Kill</TableCell>
            <TableCell align="center">Death</TableCell>
            <TableCell align="center">Assist</TableCell>
            <TableCell align="center">game</TableCell>
            <TableCell align="center">MVP</TableCell>
            <TableCell align="center" >K/D/A</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {oneplayer.map((row) => (
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
              <TableCell align="center">{row.game_cnt}</TableCell>
              <TableCell align="center" >{row.mvp_cnt}</TableCell>
              <TableCell align="center" >{(String((row.kills + row.assists) /row.deaths)).substr(0,3)}</TableCell>

            </TableRow>
          ))}
        </TableBody>
        </Table>
    </TableContainer>
      </div>
      </div>
      <h1>선수 정보 </h1>
      <div style = {{margin : 30}}>
      <TableContainer component={Paper}  >
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow >
            <TableCell align="center" >Nickname<button type = 'button' onClick ={showplayer}>⇩</button></TableCell>
            <TableCell align="center" >Realname<button type = 'button' onClick ={nameasc}>⇩</button></TableCell>
            <TableCell align="center" >Position<button type = 'button' onClick ={positionasc}>⇩</button></TableCell>
            <TableCell align="center">Teamname<button type = 'button' onClick ={teamnameasc}>⇩</button></TableCell>
            <TableCell align="center">Kill<button type = 'button' onClick ={killasc}>⇩</button></TableCell>
            <TableCell align="center">Death<button type = 'button' onClick ={deathasc}>⇩</button></TableCell>
            <TableCell align="center">Assist<button type = 'button' onClick ={assistasc}>⇩</button></TableCell>
            <TableCell align="center">game<button type = 'button' onClick ={gameasc}>⇩</button></TableCell>
            <TableCell align="center">MVP<button type = 'button' onClick ={mvpasc}>⇩</button></TableCell>
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
              <TableCell align="center">{row.game_cnt}</TableCell>
              <TableCell align="center" >{row.mvp_cnt}</TableCell>
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