const jwt = require("jsonwebtoken")

exports.login = (req,res)=>{

const {email,password} = req.body

if(email !== "admin@myura.com" || password !== "123456"){
return res.status(401).json({message:"Invalid credentials"})
}

const token = jwt.sign(
{email},
"mysecretkey",
{expiresIn:"1h"}
)

res.json({
message:"Login successful",
token
})

}