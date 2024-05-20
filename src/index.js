import express, { json } from "express";
import cors from "cors";
import helmet from "helmet"; 
import dayjs from "dayjs"
import bcrypt, { compareSync } from "bcrypt";
import jwt from "jsonwebtoken";

let users =[
  {
    id:1,
    name:"seulah",
    age:24,
  },
];

const app = express();

//미들웨어(모든요청허용)
app.use(cors()); 
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({extended: true, limit: "700mb"}));

//GET METHOD
//유저 정보 가져오기
//query or path로 받음
//성공 staus : 200 냐냐
app.get("/users",(req,res)=>{
    res.status(200).json({users}); 
})

//POST METHOD
//유저 생성
//요청 -> body
//성공 staus : 201
app.post("/users",(req,res)=>{
    const{name,age}=req.body;
    console.log("body", req.body);
    users.push({
        id: new Date().getTime(),
        name,
        age,
    });
    res.status(201).json({users});
});

//PATCH METHOD
//유저 수정
//요청 -> body
//성공 staus : 204
app.patch("/users/:id",(req,res)=>{
    const {id}=req.params;
    const {name,age} = req.body;

    console.log("params",req.params);
    const targetUserIdx = users.findIndex((user) => user.id===Number(id));

    users[targetUserIdx]={
        id : users[targetUserIdx].id,
        name: name ?? users[targetUserIdx].name, // name이 없으면 뒤에것을 쓰겠다
        age: age ?? users[targetUserIdx].age,
    };
    res.status(204),json({});
});

//DELET METHOD
//유저 삭제
//성공 staus : 204
app.delete("/users/:id",(req,res)=>{
    const {id} =req.params;

    const deleteUsers = users.filter((user)=> user.id !==Number(id));
    users =deleteUsers;

    res.status(204).json({});
});


const today = new Date();  //객체 생성
const todayDayjs = dayjs(today).format("YYYY-MM-DD")
console.log({today,todayDayjs});

const password ="1234";
const hasedPassword = bcrypt.hashSync(password,10); //암호화된 패스워드 만들기
console.log({hasedPassword}); 

const token =jwt.sign("1234","sdfsdfsdfs");
console.log({token});

//req: 요청 => request
//res : 응답 =>response
app.get("/",(req,res)=>{
    res.send("Nodejs 강의 듣는중");
});

app.listen(8000,()=>{
    console.log("서버가 시작되었습니다.");
});