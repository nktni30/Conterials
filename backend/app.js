const express = require('express')

const app = express()

app.get('/',(req, res)=>{
      res.json({
            Message: 'hello from server'
      })
})

app.listen(3000)