let config = require("./config");
let axios = require('axios')

axios.post(config.url.api + '/api/passport/login`', {
    loginName: 'test',
    password: 123456
}).then(data => {
    console.log(data)
})