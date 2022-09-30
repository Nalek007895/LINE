const line = require('@line/bot-sdk');
const express = require('express');
const axios =  require('axios').default;
const dotenv = require('dotenv')

// create LINE SDK config from env variables
const env = dotenv.config().parsed
const app = express()

const lineConfig = {
  channelAccessToken: env.ACCESS_TOKEN,
  channelSecret: env.SECRET_TOKEN
}
// register a webhook handler with middleware
const client = new line.Client(lineConfig)
// about the middleware, please refer to doc
app.post('/webhook', line.middleware(lineConfig), async (req, res) => {
  try{
    const events = req.body.events
    console.log('event=>>>>',events)
    return events.length > 0 ? await events.map(item => handleEvent(item)) : res.status(200).send("OK")
  }catch (error){
    res.status(500).end()
  }

});

const handleEvent = async (event) =>{
    if(event.type !== 'message' || event.message.type !== 'text'){
      return null;
    }else if(event.message.text === 'Hello'){
      return client.replyMessage(event.replyToken,{type:'text',text:'Hello form KMUTNB'})
    }
    else if (event.type === 'message'){
      return client.replyMessage(event.replyToken,{type:'text',text:"https://liff.line.me/1657516619-YN959npm"})
    }
    
}


// listen on port
app.listen(4000, () => {
  console.log('listening on 4000');
});
