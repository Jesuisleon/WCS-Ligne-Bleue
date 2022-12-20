import NavigationBlock from "@components/NavigationBlock";
import { useNavigate } from "react-router-dom";

function CreateTutorial() {
  const navigate = useNavigate();
  return (
    <div>
      <NavigationBlock
        navigate={() => navigate(-1)}
        title="Création d'un tutoriel"
      />
    </div>
  );
}

export default CreateTutorial;
