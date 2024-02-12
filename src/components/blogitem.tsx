
import Image from "next/image"
import Link from "next/link"
import { Blog } from "@/types/blog";
import { AiFillTags } from 'react-icons/ai'
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

dayjs.extend(utc);
dayjs.extend(timezone);

const BlogItem = (blog: Blog) => {
    return(
        <div className="rounded  overflow-hidden shadow-lg hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-600" >
            <Link href={`/blog/${blog.id}`} passHref>

            <LazyLoadImage
                className="w-full"
                alt={blog.title}
                src={blog.eyecatch.url}
                style={{
                width: '100%',
                height: 'auto',
                }}
                sizes="100vw"
                effect="blur"
                placeholder={<Image src={blog.eyecatch.url} width={300} height = {200} alt="Loading..." />}
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