
import Image from "next/image"
import Link from "next/link"
import { Blog } from "@/types/blog";
import { AiFillTags } from 'react-icons/ai'
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

const BlogItem = (blog: Blog) => {
    return(
        <div className="rounded  overflow-hidden shadow-lg hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-600" >
            <Link href={`/blog/${blog.id}`} passHref>
            <Image
                className="w-full"
                width={300}
                height={200}
                src={blog.eyecatch.url}
                alt={blog.title}
                priority
            />
            <div className="py-5 mx-1 ">
                <p className='createtime text-left text-gray-500 text-xs'>
                    {dayjs
                    .utc(blog.publishedAt)
                    .tz("Asia/Tokyo")
                    .format(
                        "YYYY" +
                        "/" +
                        "MM" +
                        "/" +
                        "DD" 
                    )
                    }
                </p>   
                <p className='text-left '>
                    {blog.title}
                </p>                     
            </div>
            </Link>
        </div>
    )
}

export default BlogItem