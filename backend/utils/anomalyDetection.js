function detectAnomaly(logins){

let suspicious = []

logins.forEach(login=>{

if(login.ip !== logins[0].ip){

suspicious.push(login)

}

})

return suspicious

}

module.exports = detectAnomaly