import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import Link from "next/link"
import { useEffect, useState } from "react"

export default function Posts({ uid, username }: { uid: string, username: string }) {
    const [posts, setPosts] = useState([]) as [any[], Function]
    const [loading, setLoading] = useState(true) as [boolean, Function]

    const supabase = createClientComponentClient()

    const getPosts = async () => {
        const { data, error } = await supabase.from('posts').select('*').eq('user_id', uid).order('updated_at', { ascending: true })

        if (error) {
            console.error(error)
        } else {
            setPosts(data)
        }

        setLoading(false)
    }

    useEffect(() => {
        getPosts()
    }, [])

    return (
        <div>
            {
                loading && (
                    <div className="w-full h-full flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-3 h-16 w-16" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                    </div>
                )
            }
            {
                !loading && posts.length > 0 && (
                    <ul className="flex flex-col space-y-4 w-full">
                        {
                            posts.map(post => (
                                <li key={post.id} className="w-full block animate-in">
                                    <Link href={`/posts/${username}/${post.id}`} className="block w-full border border-solid border-gray-700 px-4 py-2 dark:border-gray-100 hover:bg-blue-100 flex justify-between items-center">
                                        <div className="flex flex-col">
                                            {post.original_file_name}
                                            <span className="text-sm text-gray-600 dark:text-gray-200">{new Date(post.updated_at).toDateString()}</span>

                                        </div>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
                                        </svg>

                                    </Link>
                                </li>
                            ))
                        }
                    </ul>
                )
            }

        </div>
    )
}