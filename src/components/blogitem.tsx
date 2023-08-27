
import Image from "next/image"
import Link from "next/link"
import { Blog } from "@/types/blog";

const BlogItem = (blog: Blog) => {
    return(
        <div className="rounded overflow-hidden shadow-lg" >
            <Image
                className="w-full"
                width={300}
                height={200}
                src={blog.eyecatch.url}
                alt={blog.title}
                priority
            />
            <div className="py-5  mx-1">
                <p className='text-center text-xl  md:text-base  font-bold leading-5'>
                    {blog.title}
                </p>                      
            </div>
            <div className='flex justify-center items-center mx-auto w-full pt-10 pb-5'>
                <Link href={`/blog/${blog.id}`} passHref>
                    <span className="inline-flex items-center justify-center h-12 px-6 font-medium tracking-wide text-gray-700  hover:bg-gray-300  border border-gray-700">
                    READ MORE                      
                    </span>
                </Link>
            </div>
        </div>
    )
}

export default BlogItem