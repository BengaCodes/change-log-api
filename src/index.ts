import * as dotenv from 'dotenv'
dotenv.config()
import app from './server'
import config from './server'

app.listen(config.port, () => {
  console.log(`App is listening on ${config.port}`)
})