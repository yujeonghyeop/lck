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

const Reservation = () => {
    const [userid, setuserid] = useState('');
    const [pw, setpw] = useState('');
    const [name, setname] = useState('');
    const [phone, setphone] = useState('');
    const [userinf, setuserinf] = useState([]);
    const [matchid, setmatchid] = useState('');
    const [seat, setseat] = useState('');
    const [paymethod, setpaymethod] = useState('');
    const [payoption, setpayoption] = useState('');
    const [ticketinf, setticketinf] = useState([]);

    const useridchange = (e) => {
        setuserid(e.target.value);
      }
      const userpwchange = (e) => {
        setpw(e.target.value);
      }
      const usernamechange = (e) =>{
        setname(e.target.value);
      }
      const phonenumchange = (e) =>{
        setphone(e.target.value);
      }
      const mathidchange = (e) =>{
        setmatchid(e.target.value);
      }
      const seatchange = (e) =>{
        setseat(e.target.value);
      }
      const paymethodchange = (e) =>{
        setpaymethod(e.target.value);
      }
      const payoptionchange = (e) =>{
        setpayoption(e.target.value);
      }

      const userform = (e) =>{
        e.preventDefault();
        createuser()
      }
      const usershow = (e) =>{
        e.preventDefault();
        showuser()
      }
      const ticketshow = (e) =>{
        e.preventDefault();
        showticket()
      }
      const ticketform = (e) =>{
        e.preventDefault();
        createticket()
      }
      const createuser = async() => {
        const response = await axios.post("http://localhost:5000/api/createuser",{user_id:userid, user_passwd:pw,user_name:name, phonenumber:phone });
      }
      const showuser = async() => {
        const response = await axios.get("http://localhost:5000/api/showuser",{params:{user_id:userid}});
        const inputdata = await response.data.map((rowData)=>({
            user_id : rowData.user_id,
            user_name : rowData.user_name,
            phonenumber : rowData.phonenumber,
            user_rank : rowData.user_rank,
            ticket_cnt : rowData.ticket_cnt
          }))
          setuserinf(inputdata);
      }
      const userdelete = async() => {
        const response = await axios.delete("http://localhost:5000/api/userdelete",{params:{user_id:userid}});

      }
      const createticket = async() => {
        const response = await axios.post("http://localhost:5000/api/createticket",{user_id:userid, match_id:matchid,seat_grade:seat, pay_method:paymethod,pay_option:payoption });
        if(seat === 'S'){
            const response1 = await axios.post("http://localhost:5000/api/updates", {match_id:matchid});
        }
        else{
            const response2 = await axios.post("http://localhost:5000/api/updatea",{match_id:matchid});
        }
        const response3 = await axios.post("http://localhost:5000/api/ticketplus", {user_id:userid});
        const response4 = await axios.post("http://localhost:5000/api/userrank");

    }
    const showticket = async() => {
        const response = await axios.get("http://localhost:5000/api/showticket",{params:{user_id:userid}});
        const inputdata = await response.data.map((rowData)=>({
            user_id : rowData.user_id,
            match_id : rowData.match_id,
            seat_grade : rowData.seat_grade,
            pay_method : rowData.pay_method,
            pay_option : rowData.pay_option
          }))
          setticketinf(inputdata);
      }
      const ticketdelete = async() => {
        const response = await axios.delete("http://localhost:5000/api/ticketdelete",{params:{user_id:userid, match_id:matchid}});
        const response1 = await axios.post("http://localhost:5000/api/ticketminus",{user_id:userid});

      }
      const styled ={
        back:{
          backgroundImage: `url(${background})`,
          backgroundRepeat:"no-repeat",
          backgroundSize:'cover',
        }
      }
    return (
        <div style={styled.back}>
        <div style = {{display : 'flex'}}>
          <div style={{margin : 30,color:'white'}}>
            <h1>회원 가입</h1>
      <form>
              <div className="first_input">
                  <span>ID</span>
                  <input
                    name="user_id"
                    placeholder="ID"
                    style = {{float :'right'},{marginBottom:10}}
                    onChange={useridchange}
                  ></input>
                </div>
                <div className="second_input">
                  <span>PW</span>
                    <input
                      name="user_passwd"
                      placeholder="Password"
                      style = {{float :'right'},{marginBottom:10}}
                      onChange={userpwchange}
                    ></input>
                </div>
                <div className="second_input">
                  <span>Name</span>
                    <input
                      name="user_name"
                      placeholder="name"
                      style = {{float :'right'},{marginBottom:10}}
                      onChange={usernamechange}
                    ></input>
                </div>
                <div className="second_input">
                  <span>Phonenumber</span>
                    <input
                      name="phonenumber"
                      placeholder="phonenumber"
                      style = {{float :'right'},{marginBottom:10}}
                      onChange={phonenumchange}
                    ></input>
                </div>
                <button type = 'button' style = {{float :'center'}} onClick = {userform} >등록</button>
              </form>
              
    </div>
    <div style={{margin : 30,color:'white'}}>
            <h1>회원 조회</h1>
      <form>
              <div className="first_input">
                  <span>ID</span>
                  <input
                    name="user_id"
                    placeholder="ID"
                    style = {{float :'right'},{marginBottom:10}}
                    onChange={useridchange}
                  ></input>
                </div>
                <button type = 'button' style = {{float :'center'}} onClick = {usershow} >조회</button>
              </form>
              <h1>회원 삭제</h1>
      <form>
              <div className="first_input">
                  <span>ID</span>
                  <input
                    name="user_id"
                    placeholder="ID"
                    style = {{float :'right'},{marginBottom:10}}
                    onChange={useridchange}
                  ></input>
                </div>
                <button type = 'button' style = {{float :'center'}} onClick = {userdelete} >삭제</button>
              </form>
    </div>
    <div>
    <TableContainer component={Paper}  >
      <Table sx={{ maxWidth: 600 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell component="th" scope="row" width="20%"align="center">ID</TableCell>
            <TableCell align="center">Name</TableCell>
            <TableCell align="center">Phonenumber</TableCell>
            <TableCell align="center">user_rank</TableCell>
            <TableCell align="center">ticket_cnt</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {userinf.map((row) => (
            <TableRow
              key={row.user_id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
              <TableCell align="center">{row.user_id}</TableCell>
              <TableCell align="center">{row.user_name}</TableCell>
              <TableCell align="center">{row.phonenumber}</TableCell>
              <TableCell align="center">{row.user_rank}</TableCell>
              <TableCell align="center">{row.ticket_cnt}</TableCell>
              <TableCell component="th" scope="row" align="center">{row.nickname}</TableCell>
            </TableRow>
          ))}
        </TableBody>   
        </Table>
    </TableContainer>
    </div>
    </div>
    <h1>------------------------------------------------------</h1>

    <div style = {{display : 'flex'}}>
          <div style={{margin : 30,color:'white'}}>
            <h1>티켓 예약</h1>
      <form>
              <div className="first_input">
                  <span>User_id</span>
                  <input
                    name="user_id"
                    placeholder="User ID"
                    style = {{float :'right'},{marginBottom:10}}
                    onChange={useridchange}
                  ></input>
                </div>
                <div className="second_input">
                  <span>Match_id</span>
                    <input
                      name="Match_id"
                      placeholder="Match_id"
                      style = {{float :'right'},{marginBottom:10}}
                      onChange={mathidchange}
                    ></input>
                </div>
                <div className="second_input">
                  <span>좌석</span>
                    <input
                      name="seat_grade"
                      placeholder="A or S"
                      style = {{float :'right'},{marginBottom:10}}
                      onChange={seatchange}
                    ></input>
                </div>
                <div className="second_input">
                  <span>결제 방식</span>
                    <input
                      name="pay_method"
                      placeholder="card or cash"
                      style = {{float :'right'},{marginBottom:10}}
                      onChange={paymethodchange}
                    ></input>
                </div>
                <div className="second_input">
                  <span>티켓 수령 방식</span>
                    <input
                      name="pay_option"
                      placeholder="online or offline"
                      style = {{float :'right'},{marginBottom:10}}
                      onChange={payoptionchange}
                    ></input>
                </div>
                <button type = 'button' style = {{float :'center'}} onClick = {ticketform} >등록</button>
              </form>
              
    </div>
    <div style={{margin : 30,color:'white'}}>
            <h1>티켓 조회</h1>
      <form>
              <div className="first_input">
                  <span>User_id</span>
                  <input
                    name="user_id"
                    placeholder="ID"
                    style = {{float :'right'},{marginBottom:10}}
                    onChange={useridchange}
                  ></input>
                </div>
                <button type = 'button' style = {{float :'center'}} onClick = {ticketshow} >조회</button>
              </form>
              <h1>예매 취소</h1>
      <form>
              <div className="first_input">
                  <span>User_id</span>
                  <input
                    name="user_id"
                    placeholder="ID"
                    style = {{float :'right'},{marginBottom:10}}
                    onChange={useridchange}
                  ></input>
                </div>
                <div className="first_input">
                  <span>Match_id</span>
                  <input
                    name="user_id"
                    placeholder="ID"
                    style = {{float :'right'},{marginBottom:10}}
                    onChange={mathidchange}
                  ></input>
                </div>
                <button type = 'button' style = {{float :'center'}} onClick = {ticketdelete} >삭제</button>
              </form>
    </div><div>
    <TableContainer component={Paper}  >
      <Table sx={{ maxWidth: 600 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell component="th" scope="row" width="20%"align="center">ID</TableCell>
            <TableCell align="center">Match_id</TableCell>
            <TableCell align="center">Seat_grade</TableCell>
            <TableCell align="center">Pay_method</TableCell>
            <TableCell align="center">Pay_option</TableCell>

          </TableRow>
        </TableHead>
        <TableBody>
        {ticketinf.map((row) => (
            <TableRow
              key={row.user_id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
              <TableCell align="center">{row.user_id}</TableCell>
              <TableCell align="center">{row.match_id}</TableCell>
              <TableCell align="center">{row.seat_grade}</TableCell>
              <TableCell align="center">{row.pay_method}</TableCell>
              <TableCell align="center">{row.pay_option}</TableCell>
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

export default Reservation;