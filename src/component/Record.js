import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import background from '../lck.jpeg';
const Record = () => {
    const [matchid, setmatchid] = useState('');
    const [winteam, setwinteam] = useState('');
    const [loseteam, setloseteam] = useState('');
    const [mvp, setmvp] = useState('');
    const [winset, setwinset] = useState('');
    const [loseset, setloseset] = useState('');
    const [recordlist, setrecordlist] = useState([]);
    const [notrecordlist, setnotrecordlist] = useState([]);
    const [nickname, setnickname] = useState('');
    const [kill, setkill] = useState('');
    const [death, setdeath] = useState('');
    const [assist, setassist] = useState('');
    const [team, setteam] = useState('');
    const [team1, setteam1] = useState('');
    const [team2, setteam2] = useState('');
    const [team1detail, setteam1detail] = useState([]);
    const [team2detail, setteam2detail] = useState([]);
    const [team1kill, setteam1kill] = useState('');
    const [team2kill, setteam2kill] = useState('');

    var cntteam1kill = 0;
    var cntteam2kill = 0;
    const matchidchange = (e) => {
        setmatchid(e.target.value);
      }
      const winteamchange = (e) => {
        setwinteam(e.target.value);
      }
      const loseteamchange = (e) =>{
        setloseteam(e.target.value);
      }
      const mvpchange = (e) =>{
        setmvp(e.target.value);
      }
      const winsetchange = (e) =>{
        setwinset(e.target.value);
      }
      const losesetchange = (e) =>{
        setloseset(e.target.value);
      }
      const nicknamechange = (e) =>{
        setnickname(e.target.value);
      }
      const teamchange = (e) =>{
        setteam(e.target.value);
      }
      const killchange = (e) =>{
        setkill(e.target.value);
      }
      const deathchange = (e) =>{
        setdeath(e.target.value);
      }
      const assistchange = (e) =>{
        setassist(e.target.value);
      }
      const team1change = (e) => {
        setteam1(e.target.value);
      }
      const team2change = (e) =>{
        setteam2(e.target.value);
      }
      const recordform = (e) =>{
        e.preventDefault();
        createrecord()
      }
      const kdaform = (e) =>{
        e.preventDefault();
        createkda()
      }
      const searchform = (e) =>{
        e.preventDefault();
        searchresult()
      }
      const createrecord = async() => {
        const response = await axios.post("http://localhost:5000/api/createrecord",{match_id:matchid, winteam:winteam,loseteam:loseteam, mvp:mvp, winset:winset, loseset:loseset});
        const response1 = await axios.post("http://localhost:5000/api/updatemvp", {mvp:mvp})
        const response2 = await axios.post("http://localhost:5000/api/updatedone", {match_id:matchid})
        const response3 = await axios.post("http://localhost:5000/api/updatewinteam", {winteam:winteam})
        const response4 = await axios.post("http://localhost:5000/api/updateloseteam", {loseteam:loseteam})
        const response5 = await axios.post("http://localhost:5000/api/updatewinteamloseset", {winteam:winteam, loseset:loseset})
        const response6 = await axios.post("http://localhost:5000/api/updateloseteamloseset", {loseteam:loseteam})
        showrecord()
        showcalendernotrecord()
      }
      const createkda = async() => {
        const response = await axios.post("http://localhost:5000/api/createkda",{match_id:matchid, nickname:nickname,kill:kill, death:death, assist:assist,team : team});
        const response1 = await axios.post("http://localhost:5000/api/createplayerkda",{match_id:matchid, nickname:nickname,kill:kill, death:death, assist:assist});
      }
      const searchresult = async() => {
        const response = await axios.post("http://localhost:5000/api/searchresult1",{match_id:matchid, team1:team1});
        const response1 = await axios.post("http://localhost:5000/api/searchresult2",{match_id:matchid, team2:team2});
        const inputdata = await response.data.map((rowData)=>({
          nickname : rowData.nickname,
          k : rowData.k,
          d : rowData.d,
          a : rowData.a,
        }))
        const inputdata1 = await response1.data.map((rowData)=>({
          nickname : rowData.nickname,
          k : rowData.k,
          d : rowData.d,
          a : rowData.a,
        }))
        setteam1detail(inputdata)
        setteam2detail(inputdata1)
        for(var i = 0; i<5; i++){
          cntteam1kill += team1detail[i]['k'];
          cntteam2kill += team1detail[i]['d'];
          console.log(team1detail[i])
        }
        setteam1kill(cntteam1kill)
        setteam2kill(cntteam2kill)
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
    const showcalendernotrecord = async() =>{
        const response = await axios.get("http://localhost:5000/api/shownotrecord");
        const inputdata = await response.data.map((rowData)=>({
            match_id : rowData.match_id,
            match_day : rowData.match_day,
            team1 : rowData.team1,
            team2 : rowData.team2
            }))
            setnotrecordlist(inputdata)
        }
        useEffect(() => {
            showrecord()
            showcalendernotrecord()
        },[]);

        const styled ={
          back:{
            backgroundImage: `url(${background})`,
            backgroundRepeat:"no-repeat",
            backgroundSize:'cover',
          }
        }
    return (
        <div style = {styled.back}>
        <div style = {{display : 'flex'}}>
          <div style={{margin : 30,color:'white'}}>
            <h1> 결과 등록</h1>
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
                  <span>Win Team</span>
                    <input
                      name="WinTeam"
                      placeholder="이긴 팀"
                      style = {{float :'right'},{marginBottom:10}}
                      onChange={winteamchange}
                    ></input>
                </div>
                <div className="second_input">
                  <span>Lose Team</span>
                    <input
                      name="LoseTeam"
                      placeholder="진 팀"
                      style = {{float :'right'},{marginBottom:10}}
                      onChange={loseteamchange}
                    ></input>
                </div>
                <div className="second_input">
                  <span>MVP</span>
                    <input
                      name="MVP"
                      placeholder="선수 이름"
                      style = {{float :'right'},{marginBottom:10}}
                      onChange={mvpchange}
                    ></input>
                </div>
                <div className="second_input">
                  <span>Win Set</span>
                    <input
                      name="WinSet"
                      placeholder="세트 수"
                      style = {{float :'right'},{marginBottom:10}}
                      onChange={winsetchange}
                    ></input>
                </div>
                <div className="second_input">
                  <span>Lose Set</span>
                    <input
                      name="LoseSet"
                      placeholder="세트 수"
                      style = {{float :'right'},{marginBottom:10}}
                      onChange={losesetchange}
                    ></input>
                </div>
                <button type = 'button' style = {{float :'center'}} onClick = {recordform} >등록</button>
              </form>
    </div>
    <div style={{margin : 30,color:'white'}}>
            <h1> KDA 등록</h1>
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
                  <span>Nickname</span>
                    <input
                      name="Nickname"
                      placeholder="Nickname"
                      style = {{float :'right'},{marginBottom:10}}
                      onChange={nicknamechange}
                    ></input>
                </div>
                <div className="second_input">
                  <span>teamname</span>
                    <input
                      name="teamname"
                      placeholder="teamname"
                      style = {{float :'right'},{marginBottom:10}}
                      onChange={teamchange}
                    ></input>
                </div>
                <div className="second_input">
                  <span>Kill</span>
                    <input
                      name="Kill"
                      placeholder="Kill"
                      style = {{float :'right'},{marginBottom:10}}
                      onChange={killchange}
                    ></input>
                </div>
                <div className="second_input">
                  <span>Death</span>
                    <input
                      name="Death"
                      placeholder="Death"
                      style = {{float :'right'},{marginBottom:10}}
                      onChange={deathchange}
                    ></input>
                </div>
                <div className="second_input">
                  <span>Assist</span>
                    <input
                      name="Assist"
                      placeholder="Assist"
                      style = {{float :'right'},{marginBottom:10}}
                      onChange={assistchange}
                    ></input>
                </div>
                <button type = 'button' style = {{float :'center'}} onClick = {kdaform} >등록</button>
              </form>
    </div>
    <div style={{margin : 30,color:'white'}}>
            <h1> 상세 경기 결과 조회</h1>
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
                  <span>team1</span>
                    <input
                      name="team1"
                      placeholder="team1"
                      style = {{float :'right'},{marginBottom:10}}
                      onChange={team1change}
                    ></input>
                </div>
                <div className="second_input">
                  <span>team2</span>
                    <input
                      name="team2"
                      placeholder="team2"
                      style = {{float :'right'},{marginBottom:10}}
                      onChange={team2change}
                    ></input>
                </div>
                <button type = 'button' style = {{float :'center'}} onClick = {searchform} >등록</button>
              </form>
    </div>
    </div>
    <div style = {{display : 'flex'}} >
 
    <h1 align ="left" style = {{color:'white'}}>{team1}</h1>
    <h1 align ="center" style = {{color:'white'}}>{team1kill}</h1>
    <TableContainer>
      <Table sx={{ maxWidth: 600 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell component="th" scope="row" width="20%"align="center" style = {{color:'white'}}>Nickname</TableCell>
            <TableCell align="center" style = {{color:'white'}}>Kill</TableCell>
            <TableCell align="center" style = {{color:'white'}}>Death</TableCell>
            <TableCell align="center" style = {{color:'white'}}>Assist</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {team1detail.map((row) => (
            <TableRow
              key={row.match_id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
              <TableCell component="th" scope="row" align="center" style = {{color:'white'}}>{row.nickname}</TableCell>
              <TableCell align="center" style = {{color:'white'}}>{row.k}</TableCell>
              <TableCell align="center" style = {{color:'white'}}>{row.d}</TableCell>
              <TableCell align="center" style = {{color:'white'}}>{row.a}</TableCell>
            </TableRow>
          ))}
        </TableBody>   
        </Table>
        </TableContainer>
      <div>
    <h1 align ="right">{team2}</h1>
    <h1 align ="center">{team2kill}</h1>
    </div>
      <Table sx={{ maxWidth: 600 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell component="th" scope="row" width="20%"align="center" style = {{color:'white'}}>Kill</TableCell>
            <TableCell align="center" style = {{color:'white'}}>Death</TableCell>
            <TableCell align="center" style = {{color:'white'}}>Assist</TableCell>
            <TableCell align="center" style = {{color:'white'}}>Nickname</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {team2detail.map((row) => (
            <TableRow
              key={row.match_id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
              <TableCell align="center">{row.k}</TableCell>
              <TableCell align="center">{row.d}</TableCell>
              <TableCell align="center">{row.a}</TableCell>
              <TableCell component="th" scope="row" align="center">{row.nickname}</TableCell>
            </TableRow>
          ))}
        </TableBody>   
        </Table>

    </div>
    <h1 style = {{color:'white'}}>경기 결과 </h1>
    <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell component="th" scope="row" width="20%"align="center">Match_day</TableCell>
            <TableCell align="right" >team1</TableCell>
            <TableCell align="right" ></TableCell>
            <TableCell align="left" ></TableCell>
            <TableCell align="left" >team2</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {recordlist.map((row) => (
            <TableRow
              key={row.match_id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
              <TableCell component="th" scope="row" align="center" >{row.match_day.substr(0,10)}</TableCell>
              <TableCell align="right" >{row.winteam}</TableCell>
              <TableCell align="right" >{row.winteam_winset}</TableCell>
              <TableCell align="left" >{row.winteam_loseset}</TableCell>
              <TableCell align="left" >{row.loseteam}</TableCell>
            </TableRow>
          ))}
        {notrecordlist.map((row) => (
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

export default Record;