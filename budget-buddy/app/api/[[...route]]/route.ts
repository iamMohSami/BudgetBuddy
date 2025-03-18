import { Hono } from 'hono'
import { handle } from 'hono/vercel'
// import { z } from 'zod'
// import { zValidator } from '@hono/zod-validator'
import { clerkMiddleware , getAuth } from '@hono/clerk-auth'

export const runtime = 'edge'

const app = new Hono().basePath('/api')

app   // ADDING clerk middleware to give JSON error if user is not authenicated
.get('/hello', 
    clerkMiddleware(),
    (c) => {
        const auth = getAuth(c) ; 
        if(!auth?.userId) {
            return c.json({
                message: 'Unauthorized',
            })
        } 
        return c.json({
            message: 'Hello Next.js!',
            userId: auth.userId,
        })
    }) ;
// .get( 
//     "/hello/:test",    // adding zod Validations to the params
//     zValidator("param" , 
//         z.object({
//             test: z.string()
//         })
//     ),
//     (c) => {  
//   return c.json({
//     message: 'Hello Next.js!',
//     test: c.req.valid('param')
//   })
// })

export const GET = handle(app)
export const POST = handle(app)