import React from "react";
import Link from "next/link";

interface Props {
    totalCount: number;
}

export const Pagination: React.FC<Props>  = ({ totalCount }) => {
    const PER_PAGE = 5;
  
    const range = (start: number, end: number) =>
          [...Array(end - start + 1)].map((_, i) => start + i)
  
    return (
        <div className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">

            {range(1, Math.ceil(totalCount / PER_PAGE)).map((number, index) => (

                <Link href={`/blog/page/${number}`} key={index}>
                <span className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">{number}</span>
                </Link>

            ))}


        </div>
    );
  };


export default Pagination