import Image from "next/image";
import Link from "next/link";
import { FaInstagram, FaYoutube } from "react-icons/fa";
import { IoLogoFacebook } from "react-icons/io5";

export default function BeOurSponsor() {
  return (
    <div className="px-[5%] py-16" id="be-sponsors">
      <div className="max-w-screen-xl mx-auto">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-montserrat text-ink-black text-center mb-10">
          Ready to Be More Than Just a Sponsor? <br /> Call Us
        </h1>
        <div className="max-w-3xl mx-auto h-px bg-[#C4C4C4] my-5" />
        <div className="flex flex-col sm:flex-row justify-center items-center gap-5 sm:gap-8">
          <h1 className="flex justify-center items-center text-slate-gray text-2xl lg:text-3xl font-medium">
            <Image
              width={100}
              height={100}
              src="images/phone.svg"
              alt="phone"
              className="h-8 w-10"
            />
            +8801996-924420
          </h1>
          <h1 className="flex justify-center items-center gap-3 text-slate-gray text-2xl lg:text-3xl font-medium">
            <Image
              width={100}
              height={100}
              src="images/phone.svg"
              alt="phone"
              className="h-8 w-10"
            />
            01639-629931
          </h1>
        </div>
        <div className="max-w-3xl mx-auto h-px bg-[#C4C4C4] my-5" />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mt-20">
          <Link
            href={"https://www.facebook.com/share/1CcsVhnzpr/"}
            target="_blank"
            className="bg-[#0054C0] p-5 flex flex-col justify-center items-center gap-5"
          >
            <IoLogoFacebook
              className="text-white bg-[#1877F2] rounded p-2"
              size={60}
            />
            <p className="text-xl text-white">Facebook</p>
          </Link>
          <Link
            href={
              "https://www.instagram.com/sportsclubmu?igsh=bndydDExenJ1cmI3/"
            }
            target="_blank"
            className="bg-[#AE0053] p-5 flex flex-col justify-center items-center gap-5"
          >
            <FaInstagram
              className="text-white bg-[#F00073] rounded p-2"
              size={60}
            />
            <p className="text-xl text-white">Instagram</p>
          </Link>
          <div className="bg-[#161B32] p-5 flex flex-col justify-center items-center gap-5">
            <Image
              width={100}
              height={100}
              src="images/x.svg"
              alt="x"
              className="h-18 w-fit"
            />
            <p className="text-xl text-white">X</p>
          </div>
          <Link
            href={"https://youtube.com/@musportsclub?si=tQ0G6iqRMtIJFoeW/"}
            target="_blank"
            className="bg-[#C40808] p-5 flex flex-col justify-center items-center gap-5"
          >
            <FaYoutube
              className="text-white bg-[#FF0000] rounded p-2"
              size={60}
            />
            <p className="text-xl text-white">Youtube</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
