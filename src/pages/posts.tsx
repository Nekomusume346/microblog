import Link from "next/link";
import { client } from "@/libs/client";
import { Blog } from "@/types/blog";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
dayjs.extend(utc);
dayjs.extend(timezone);
//import styles from "@/styles/Post.module.css";
import Image from "next/image";
import Head from "next/head";

type Props = {
  blog: Blog[];
};

const Posts: React.FC<Props> = ({ blog }) => {

  return (
<>
    <div>
      <div className="">
        <ul className="">
          {blog.map((blog) => (
            <li key={blog.id}>
              <Link href={`/blog/${blog.id}`}>

                <h5 className="">{blog.title}</h5>
                <p className="">
                  投稿日：
                  {dayjs
                    .utc(blog.publishedAt)
                    .tz("Asia/Tokyo")
                    .format(
                      "YYYY" +
                        "年" +
                        "MM" +
                        "月" +
                        "DD" +
                        "日" +
                        "hh" +
                        ":" +
                        "mm"
                    )}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
</>
  );
};

export default Posts;

// データをテンプレートに受け渡す部分の処理を記述します
export const getStaticProps = async () => {
  const data = await client.get({ endpoint: "blogs" });

  return {
    props: {
      blog: data.contents,
    },
  };
};
