import { Edit } from "lucide-react"
import Buttons from "../component/common/Buttons"
Edit

const Dashboard = () => {
  return (
    <div className="min-h-screen flex flex-col">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <Buttons variant="primary" iconLeft={<Edit size={16}/>} className="w-28 rounded"> Primary </Buttons>
        <br />
        <Buttons variant="secondary" iconRight={<Edit size={16}/>} className=" rounded"> Primary </Buttons>
        <br/>
        <Buttons variant="warning" iconRight={<Edit size={16}/>} className="w-28 rounded"> Warning </Buttons>
        <br />
        <Buttons variant="danger" size="md" iconRight={<Edit size={16}/>} className="w-28 rounded"> Primary </Buttons>
        <br />
        <Buttons variant="outline" className="w-20 rounded"> Primary </Buttons>
        <br />
        <Buttons variant="ghost" className="w-20 rounded"> Primary </Buttons>
        <br/>
        <Buttons variant="gradient" className="w-20 rounded"> Primary </Buttons>
        <br/>
        <Buttons variant="gradientS" className="w-20 rounded"> Primary </Buttons>
        <br/>
        <Buttons variant="gradientD" className="w-20 rounded"> Primary </Buttons>
      </div>
     
  )
}

export default Dashboard