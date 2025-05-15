import { MoveRight } from "lucide-react";
import { fontStyle } from "../../../utils/ClassUtils";
import Buttons from "../Buttons";
import { Card } from "./Card";
import { Link } from "react-router-dom";
import { formatDate } from "../../../utils/timeFormat";
import CopyButton from "../../ui/CopyButton";
import { useCurrentUrl } from "../../../utils/Url";



interface BlogCardProps {
  _id: string;
  title: string;
  photo: string | string[];
  author: string;
  tags: string;
  createdAt: string;
}

const BlogCard = ({ _id, title, photo, author, tags, createdAt }: BlogCardProps) => {

  const currentUrl = useCurrentUrl();
  const urlPath = `${currentUrl}/details/${_id}`;
  const handleShare = () => {
    navigator.clipboard.writeText(urlPath);
  }

  return (
    <Card size="md" variant="Blog" className="relative text-font overflow-hidden flex flex-col gap-4 ">
      <div>
        <img src={photo[0]} alt="Blog" className="w-full h-56 object-cover rounded" loading="lazy" />
      </div>
      <div>
        <div className="flex justify-between items-center mb-5">
          <p className={`${fontStyle.cardDesc} text-secondary`}>{formatDate(createdAt)}</p>
          <Link to={`/dashboard/blogs/details/${_id}`}>
            <Buttons variant="primary" size="sm" className="rounded-sm" iconRight={<MoveRight size={8} />}> Details </Buttons>
          </Link>
        </div>
        <h3 className={`${fontStyle.cardTitle} text-font`}> {title.slice(0, 130)}... </h3>
        <div className="flex justify-between flex-wrap items-center w-full mt-5 text-subtext">
          <p className={`${fontStyle.secondaryText} `}>{author}</p>
          <p className={fontStyle.secondaryText}>{tags}</p>
        </div>
      </div>
      <div onClick={handleShare} className="absolute top-6 right-6 z-50">
        <CopyButton textCopy="Share" />
      </div>
    </Card>
  )
}

export default BlogCard