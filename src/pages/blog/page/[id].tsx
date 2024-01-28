import Image from 'next/image'
import Link from 'next/link';
import Pagination from '@/components/pagination';
import { client } from "@/libs/client";
import { Blog } from "@/types/blog";
import BlogItem from '@/components/blogitem';
import Meta from '@/components/meta'; 

const PER_PAGE = 3; 
const pageTitle = "記事一覧";

type Props = {
    blogs: Blog[];
    totalCount: number;
  };

// pages/blog/[id].js
export default function BlogPageId({ blogs, totalCount }: Props) {

  const pageTitle = "投稿記事";
  const pageDesc ="";
  const pageImg = "";
  const pageImgW = 0;
  const pageImgH = 0;
  
  return (
    <>
    <Meta pageTitle={pageTitle}  pageDesc={pageDesc} pageImg={pageImg} pageImgW={pageImgW} pageImgH={pageImgH}  />
    <div className="container mx-auto p-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-5">
        {blogs.map((blog, index) => (
          <BlogItem key={index} {...blog} /> 
        ))}      
    </div>

    <div className='flex justify-center items-center mx-auto w-full'>
      <Pagination totalCount={totalCount} />      
    </div>     

    </>

  );
}

// 動的なページを作成
export const getStaticPaths = async () => {
  const repos = await client.get({ endpoint: "blogs" });

  const range = (start: number, end: number) => [...Array(end - start + 1)].map((_, i) => start + i);

  const paths = range(1, Math.ceil(repos.totalCount / PER_PAGE)).map((repo) => `/blog/page/${repo}`);

  return { paths, fallback: false };
};

// データを取得
export const getStaticProps = async (context: { params: { id: number } }) => {
  const id = context.params.id;

  const data = await client.get({ endpoint: "blogs", queries: { offset: (id - 1) * 3, limit: 3 } });

  return {
    props: {
      blogs: data.contents,
      totalCount: data.totalCount,
    },
  };
};