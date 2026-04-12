import { useGoBack } from "../../hooks/useGoBack";
import PageLayout from "../../component/layout/PageLayout";
import BackButton from "../../utils/BackButton";
import SectionLayout from "../../component/layout/SectionLayout";
import FormContainer from "../../component/common/Form/FormContainer";
import { zodResolver } from "@hookform/resolvers/zod";
import { createTournamentSchema } from "../../utils/schema/tournamentSchema";
import DropdownInput from "../../component/common/input/DropdownInput";



const Switch = () => {
    const goBack = useGoBack();

    const method = ({
        resolver: zodResolver(createTournamentSchema),
            mode: "onSubmit",
      });

    return (
        <PageLayout>
            <BackButton onClick={goBack}>Back</BackButton>
            <SectionLayout>
                <FormContainer
                    methods={method}
                    onSubmit={()=>{}}
                    className="max-w-5xl mx-auto space-y-10"
                >
                    <DropdownInput
                    
                    />
                </FormContainer>
            </SectionLayout>
        </PageLayout>
    )
}

export default Switch