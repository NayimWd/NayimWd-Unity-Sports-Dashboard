import { useState } from "react";
import Buttons from "../../component/common/Buttons";
import InfoModal from "../../component/ui/modal/InfoModal";




const MyProfile = () => {

  const [open, setOpen] = useState(false);

  const handleClick1 = () => {
    setOpen((prev)=> !prev)
  }

  return (
    <div>
      <InfoModal
      infoOpen={open}
      onOpenChange={handleClick1}
      title="Modal test"
      description="Modal test desc"
      onConfirm={() => {
        // handle confirm action here
        setOpen(false);
      }}
      />


      <Buttons onClick={handleClick1} variant="primary"> Modal 1 </Buttons>
      <Buttons variant="secondary"> Modal 2 </Buttons>
      <Buttons variant="danger"> Modal 3 </Buttons>
    </div>
  )
}

export default MyProfile;