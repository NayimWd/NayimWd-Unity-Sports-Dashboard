import { MoveRight } from "lucide-react";
import { fontStyle } from "../../../utils/ClassUtils";
import Buttons from "../Buttons";
import { Card } from "./Card";
import { Link } from "react-router-dom";
import { formatDate } from "../../../utils/timeFormat";



interface BlogCardProps {
    _id: string;
    title: string;
    photo: string | string[];
    author: string;
    tags: string;
    createdAt: string;
}

const BlogCard = ({_id, title, photo, author, tags, createdAt}: BlogCardProps) => {
  return (
    <Card size="sm" variant="Blog" className="text-font overflow-hidden flex flex-col gap-4">
      <div>
        <img src={photo[0]} alt="Blog" className="w-full h-56 object-cover rounded-md" loading="lazy"/>
      </div>
      <div>
        <div className="flex justify-between items-center mb-5">
          <p className={fontStyle.cardDesc}>{formatDate(createdAt)}</p>
          <Link to={`dashboard/blogs/:${_id}`}>
          <Buttons variant="primary" size="sm" className="rounded-sm" iconRight={<MoveRight size={8}/>}> Details </Buttons>
          </Link>
      </div>
      <h3 className={`${fontStyle.cardTitle} `}> {title.slice(0, 130)}... </h3>
      <div className="flex justify-between flex-wrap items-center w-full mt-5">
          <p className={`${fontStyle.secondaryText}`}>{author}</p>
          <p className={fontStyle.secondaryText}>{tags}</p>
      </div>
      </div>
      </Card>
  )
}

export default BlogCard