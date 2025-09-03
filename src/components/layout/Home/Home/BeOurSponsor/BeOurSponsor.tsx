import { FaInstagram, FaPhoneAlt, FaYoutube } from "react-icons/fa";
import { IoLogoFacebook } from "react-icons/io5";
import { RiTwitterLine } from "react-icons/ri";

export default function BeOurSponsor() {
  return (
    <div className="px-[5%] py-16" id="be-sponsors">
      <div className="max-w-screen-xl mx-auto">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-montserrat text-ink-black text-center mb-10">
          Want to be our sponsor ? <br /> just call us
        </h1>
        <div className="max-w-3xl mx-auto h-px bg-[#C4C4C4] my-5" />
        <div className="flex flex-col sm:flex-row justify-center items-center gap-5">
          <h1 className="flex justify-center items-center gap-3 text-slate-gray text-2xl lg:text-3xl font-medium">
            <FaPhoneAlt />
            0123 456 789
          </h1>
          <h1 className="flex justify-center items-center gap-3 text-slate-gray text-2xl lg:text-3xl font-medium">
            <FaPhoneAlt />
            0123 456 789
          </h1>
        </div>
        <div className="max-w-3xl mx-auto h-px bg-[#C4C4C4] my-5" />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mt-20">
          <div className="bg-[#0054C0] p-5 flex flex-col justify-center items-center gap-5">
            <IoLogoFacebook
              className="text-white bg-[#1877F2] rounded p-2"
              size={60}
            />
            <p className="text-xl text-white">Facebook</p>
          </div>
          <div className="bg-[#AE0053] p-5 flex flex-col justify-center items-center gap-5">
            <FaInstagram
              className="text-white bg-[#F00073] rounded p-2"
              size={60}
            />
            <p className="text-xl text-white">Instagram</p>
          </div>
          <div className="bg-[#161B32] p-5 flex flex-col justify-center items-center gap-5">
            <RiTwitterLine
              className="text-white bg-black rounded p-2"
              size={60}
            />
            <p className="text-xl text-white">X</p>
          </div>
          <div className="bg-[#C40808] p-5 flex flex-col justify-center items-center gap-5">
            <FaYoutube
              className="text-white bg-[#FF0000] rounded p-2"
              size={60}
            />
            <p className="text-xl text-white">Youtube</p>
          </div>
        </div>
      </div>
    </div>
  );
}
