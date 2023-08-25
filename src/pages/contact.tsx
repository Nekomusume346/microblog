import Image from 'next/image'
import Link from 'next/link'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })


//問い合わせ
export default function Contact() {

  return (
    <>
     <section className="text-gray-600 w-full flex flex-col items-center px-2">
      <h1 className="text-3xl font-bold mt-10">CONTACT</h1>
      <p className="m-10">
        お問い合わせは下記のフォームからお願いいたします。<br />
      </p>
      <form className="shadow-md rounded-md bg-white w-full max-w-2xl p-10">
        <div className="flex sm:items-center mb-6 flex-col sm:flex-row">
          <label
            className="block sm:w-1/3 font-bold sm:text-right mb-1 pr-4"
            >お問い合わせの種類 <span className="text-red-600"> * </span>
          </label>
          <select
            className="block w-full sm:w-2/3 bg-gray-200 py-2 px-3 text-gray-700 border border-gray-200 rounded focus:outline-none focus:bg-white"
          >
            <option>ブログについて</option>
            <option>その他</option>
          </select>
        </div>
        <div className="flex sm:items-center mb-6 flex-col sm:flex-row">
          <label
            className="block sm:w-1/3 font-bold sm:text-right mb-1 pr-4"
            >名前 <span className="text-red-600"> * </span>
          </label>
          <input
            className="block w-full sm:w-2/3 bg-gray-200 py-2 px-3 text-gray-700 border border-gray-200 rounded focus:outline-none focus:bg-white"
            id="name"
            type="text"
            placeholder="山田太郎"
          />
        </div>
        <div className="flex sm:items-center mb-6 flex-col sm:flex-row">
          <label
            className="block sm:w-1/3 font-bold sm:text-right mb-1 pr-4"
            >フリガナ
          </label>
          <input
            className="block w-full sm:w-2/3 bg-gray-200 py-2 px-3 text-gray-700 border border-gray-200 rounded focus:outline-none focus:bg-white"
            type="text"
            id="furigana"
            placeholder="ヤマダタロウ"
          />
        </div>
        <div className="flex sm:items-center mb-6 flex-col sm:flex-row">
          <label
            className="block sm:w-1/3 font-bold sm:text-right mb-1 pr-4"
          >
            メールアドレス 
            <span className="text-red-600"> * </span>
          </label>
          <input
            className="block w-full sm:w-2/3 bg-gray-200 py-2 px-3 text-gray-700 border border-gray-200 rounded focus:outline-none focus:bg-white"
            type="email"
            id="email"
            placeholder="yamada@example.com"
          />
        </div>
        <div className="flex sm:items-center mb-6 flex-col sm:flex-row">
          <label
            className="block sm:w-1/3 font-bold sm:text-right mb-1 pr-4">電話番号</label>
            <input
            className="block w-36 bg-gray-200 py-2 px-3 text-gray-700 border border-gray-200 rounded focus:outline-none focus:bg-white"
            type="text"
            id="tel"
            placeholder="00000000000"
          />
        </div>
 
        <div className="flex sm:items-center mb-6 flex-col sm:flex-row">
          <label
            className="block sm:w-1/3 font-bold sm:text-right mb-1 pr-4"
            >お問い合わせ内容 <span className="text-red-600"> * </span>
          </label>
          <textarea
            className="block w-full sm:w-2/3 bg-gray-200 py-2 px-3 text-gray-700 border border-gray-200 rounded focus:outline-none focus:bg-white"
            name="body"
            id="body"
          ></textarea>
        </div>
        <div className="flex justify-center">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded fucus:outline-none focus:shadow-outline mt-3"
          >
            確認
          </button>
        </div>
      </form>
    </section>

    </>

  )
}





