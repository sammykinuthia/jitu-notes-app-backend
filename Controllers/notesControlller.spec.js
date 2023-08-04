import { getPost, createPost, deletePost, getPosts, updatePost } from "./notesController.js";
import mssql from 'mssql'


describe("posts Controller", () => {

    describe("create a post", () => {
        it("should create a post successifully", async () => {
            let post = {
                title: 'Build A bridge',
                content: 'Build the nithi bridge',
            }
            let req = {
                body: post
            }

            let res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn().mockReturnThis()
            }

            jest.spyOn(mssql, "connect").mockResolvedValueOnce({
                request: jest.fn().mockReturnThis(),
                input: jest.fn().mockReturnThis(),
                execute: jest.fn().mockResolvedValueOnce({
                    rowsAffected: [1]
                })
            })

            await createPost(req, res)
            expect(req.body).toHaveBeenCalledWith(post)
            // expect(re.json).
            // expect(res.json).toHaveBeenCalledWith({ message: "Note created successifully" })
            // expect(res.status).toHaveBeenCalledWith(200)
        })


    })

    describe("get a single post", () => {
        it("should return a single post", async () => {
            let postId = "kakabkcakbak"
            let mockedPost = {
                id: '1464dda6-5651-4d3c-8c1c-527d977e15d8',
                title: 'Build A bridge',
                content: 'Build the nithi bridge',
                created_at: '2023-07-24'
            }
            let req = {
                params: {
                    id: postId
                }
            }
            let res = {
                json: jest.fn().mockReturnThis(),
                status: jest.fn().mockReturnThis()
            }

            jest.spyOn(mssql, 'connect').mockResolvedValueOnce({
                request: jest.fn().mockReturnThis(),
                input: jest.fn().mockReturnThis(),
                execute: jest.fn().mockResolvedValueOnce({ recordset: [mockedPost] })
                // execute: jest.fn().mockResolvedValueOnce({ rowsAffected: [1] })
            })

            await getPost(req, res)

            expect(res.json).toHaveBeenCalledWith({ data:[mockedPost]})

        })
    })




    describe("Gets all posts", () => {
        it("should return all posts", async () => {
            let mockposts = [
                {
                    id: '1464dda6-5651-4d3c-8c1c-527d977e15d8',
                    title: 'Build A bridge',
                    content: 'Build the nithi bridge',
                    created_at: '2023-07-24',
                },
                {
                    id: '538cf84d-ab46-44e3-b470-596829723334',
                    title: 'Build Dam',
                    content: 'Build a Dam capable of holding 40000 litres',
                    created_at: '2023-07-24',
                }
            ]

            let req = {}

            jest.spyOn(mssql, "connect").mockResolvedValueOnce({
                request: jest.fn().mockReturnThis(),
                execute: jest.fn().mockResolvedValueOnce({
                    recordset: mockposts
                })
            })

            await getPosts(req, res)

            expect(res.status).toHaveBeenCalledWith(200)
            expect(res.json).toHaveBeenCalledWith({ posts: mockposts })
        })
    })

   


    describe("Deleting a post", () => {
        it("should delete the post successfully", async () => {

            let postID = 'sryiuaraw1234'
            let req = {
                params: {
                    id: postID
                }
            }
            res = {
                json:jest.fn().mockReturnThis(),
                status:jest.fn().mockReturnThis()
            }
            jest.spyOn(mssql, "connect").mockResolvedValueOnce({
                request: jest.fn().mockReturnThis(),
                input: jest.fn().mockReturnThis(),
                execute: jest.fn().mockResolvedValueOnce({rowsAffected: [1]})
            })

            await deletePost(req, res)

            expect(res.json).toHaveBeenCalledWith({message: 'record deleted successifuly'})
        })

        it("should return an error 'post not found'", async () => {
            let postID = 'sryiuaraw1234'
            let req = {
                params: {
                    id: postID
                }
            }

            let res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            }

            jest.spyOn(mssql, "connect").mockResolvedValueOnce({
                request: jest.fn().mockReturnThis(),
                input: jest.fn().mockReturnThis(),
                execute: jest.fn().mockResolvedValueOnce({
                    rowsAffected: [0]
                })
            })

            await deletePost(req, res)


            expect(res.json).toHaveBeenCalledWith({
                message: "Item you trying to delete can't be found"
            })
        })
    })
})