import mssql from 'mssql'
import { sqlConfig } from '../Config/config.js'
import { log } from 'console'
import { v4 } from 'uuid'


export const getPosts = async (req, res) => {
    const pool = await mssql.connect(sqlConfig)
    pool.request().execute('uspGetNotes', (error, record) => {
        console.log(record);
        if (error) {
            res.json({ Error: error })
            console.log("error===> ", error);
        }
        else {
            if (record.rowsAffected[0] == 0)
                return res.json({ "message": "0 items found" })
            res.status(200).json({
                'data': record.recordset
            })
            console.log(record);
        }
    })
}


export const getPost = async (req, res) => {
    const { id } = req.params
    const pool = await mssql.connect(sqlConfig)
    pool.request().input("id", id)
        .execute('uspGetNote', (error, record) => {
            if (error) {
                res.json({ Error: error })
                console.log("error===> ", error);
            }
            else {
                if (record.rowsAffected[0] == 0)
                    return res.json({ "message": "Item can't be found" })
                return res.status(200).json({
                    'data': record.recordset
                })
            }
        })
}


export const createPost = async (req, res) => {
    const { title, content } = req.body
    console.log(new Date().toLocaleDateString());
    const pool = await (await mssql.connect(sqlConfig)).request()
        .input('id', v4())
        .input('title', mssql.VarChar, title)
        .input("content", mssql.VarChar, content)
        .input("createdAt", new Date().toLocaleDateString())
        .execute('uspCreateNote', (error, record) => {
            if (error) {
                res.json({ Error: error })
                console.log("error===> ", error);
            }
            else {
                res.status(200).json({
                    'data': record.recordset,
                    "message": "Note created successifully"
                })
            }
        })
}



export const updatePost = async (req, res) => {
    const { id } = req.params
    const { title, content } = req.body
    const pool = await (await mssql.connect(sqlConfig)).request()
        .input('id', id)
        .input('title', mssql.VarChar, title)
        .input("content", mssql.VarChar, content)
        .execute('uspUpdateNote', (error, record) => {
            if (error) {
                res.json({ Error: error })
                console.log("error===> ", error);
            }
            else {
                res.status(200).json({
                    'data': record.recordset,
                    "message": "Note Updated successifully"
                })
            }
        })
}



export const deletePost = async (req, res) => {
    const { id } = req.params
    const pool = await mssql.connect(sqlConfig)
    pool.request().input("id", id)
        .execute('uspDeleteNote', (error, record) => {
            console.log(record);
            if (error) {
                res.json({ Error: error })
                console.log("error===> ", error);
                return
            }
            else {
                if (record.rowsAffected[0] == 0) {
                    return res.json({
                        "message": "Item you trying to delete can't be found"
                    })
                }

                return res.status(200).json({
                    "message": "record deleted successifuly"
                })
            }
        })
}
