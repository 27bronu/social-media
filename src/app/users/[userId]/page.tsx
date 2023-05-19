import { getUserById } from "../services/get-user-by-id"
import { getPostsByUserId} from "../services/get-post-by-userid"
import { useState } from "react";


export default async function UserDetailsPage({params}: {params: {userId: number}}) {
    const user = await getUserById(params.userId)
    const post = await getPostsByUserId(params.userId)

    return <>
        <div className="flex flex-col items-center pb-5 mt-5">
            <img className="w-24 h-24 mb-3 rounded-full shadow-lg" src="https://apisocialmedia-production.up.railway.app/uploads/transferir.jpg" alt="Default image"/>
            <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">@{user.username}</h5>
            <span className="text-sm text-gray-500 dark:text-gray-400">{user.name}</span>
            <br />
            <div className="flex flex-wrap">
                <span className="text-sm text-gray-500 dark:text-gray-400 p-2">Posts: {user.posts}</span>
                <span className="text-sm text-gray-500 dark:text-gray-400 p-2">Followers: {user.followers}</span>
                <span className="text-sm text-gray-500 dark:text-gray-400 p-2">Following: {user.following}</span>
            </div>
        </div>
            <ul className="flex flex-wrap text-center justify-center text-center mt-3">
            <div className="flex flex-col items-center pb-5 mt-5">Posts
            {post.map((post:any) => (
                <li key={post.id} className="m-2.5 w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 transform transition duration-100 hover:scale-95">
                    <div className="flex justify-end px-4 pt-4">                        
                    </div>
                    <div className="flex flex-col items-center pb-5">
                        <img className="w-24 h-24 mb-3 shadow-lg" src="https://apisocialmedia-production.up.railway.app/uploads/transferir.jpg" alt="Default image"/>
                        <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">{post.post}</h5>
                    </div>
                </li>
            ))
            }
            </div> 
      </ul>  
    </>
}