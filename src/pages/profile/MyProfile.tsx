import { User } from "lucide-react";
import Badge from "../../component/ui/Badge";
import CardSkeleton from "../../component/common/card/CardSkeleton";
import Card from "../../component/common/card/Card";

const MyProfile = () => {

  return (
    <div>
      <div className="flex items-center gap-3 flex-wrap">
      <Badge icon={<User size={12} />} variant="default"> default</Badge>
      <Badge variant="success">success</Badge>
      <Badge variant="warning">warning</Badge>
      <Badge variant="error">error</Badge>
      <Badge variant="outline">outline</Badge>
      <Badge variant="outline">ghost</Badge>
      <Badge variant="info">info</Badge>
</div>
      <div className="flex mt-10 flex-wrap justify-center items-center gap-5">
          <CardSkeleton>
            <CardSkeleton.Image/>
            <CardSkeleton.Content/>
            <CardSkeleton.Footer/>
          </CardSkeleton>
         <Card variant="Player" size="sm">
          <Card.Image src="/lightImg.jpeg" alt="Card image">
            <Card.Tags>
              <Card.Tag><Badge variant="success">abc</Badge></Card.Tag>
              <Card.Tag><Badge variant="info">abc</Badge></Card.Tag>
         
            </Card.Tags>
          </Card.Image>
          <Card.Content>
            <Card.Title className="font-merriweather">
             nulla asperiores ipsum odit libero, optio accusantium quidem, explicabo error.
            </Card.Title>
            <Card.Description className="font-inter">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem vel repellendus incidunt id dolores, iure alias consequatur quas molestiae vitae sapiente illo natus hic cum asperiores amet obcaecati et recusandae non maiores quasi est iste. Eos, a obcaecati, odit perspiciatis animi, non rem quasi dignissimos vitae aliquid reiciendis nesciunt numquam!
            </Card.Description>
          </Card.Content>
          <Card.Footer>
            <button>abc</button>
            <button>abc</button>
          </Card.Footer>
         </Card>
      </div>

    </div>
  )
}

export default MyProfile;