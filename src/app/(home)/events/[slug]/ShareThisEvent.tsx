import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  WhatsappShareButton,
} from "react-share";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaWhatsapp,
} from "react-icons/fa";

interface ShareThisEventProps {
  title: string;
}

export default function ShareThisEvent({ title }: ShareThisEventProps) {
  const url = "https://example.com/event/123";

  return (
    <div className="border border-[#C4C4C4] p-4">
      <h1 className="sm:text-lg text-ink-black font-normal mb-3">
        Share This Event
      </h1>
      <div className="flex items-center gap-4">
        <FacebookShareButton url={url} title={title}>
          <div className="bg-[#1877F2] p-3 text-white flex items-center justify-center rounded">
            <FaFacebookF size={20} />
          </div>
        </FacebookShareButton>

        <TwitterShareButton url={url} title={title}>
          <div className="bg-[#1DA1F2] p-3 text-white flex items-center justify-center rounded">
            <FaTwitter size={20} />
          </div>
        </TwitterShareButton>

        <LinkedinShareButton url={url} title={title}>
          <div className="bg-[#0077B5] p-3 text-white flex items-center justify-center rounded">
            <FaLinkedinIn size={20} />
          </div>
        </LinkedinShareButton>

        <WhatsappShareButton url={url} title={title}>
          <div className="bg-[#25D366] p-3 text-white flex items-center justify-center rounded">
            <FaWhatsapp size={20} />
          </div>
        </WhatsappShareButton>
      </div>
    </div>
  );
}
