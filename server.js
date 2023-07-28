import express from 'express'
import { notesRouter } from './Routers/notesRouter.js'

const app = express()
app.use(express.json())
app.use('/notes',notesRouter)



app.listen(3000, ()=>console.log("app running at http://localhost:3000"))




