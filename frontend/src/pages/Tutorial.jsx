import { useNavigate } from "react-router-dom";
import Header from "@components/Header";
import NavigationBlock from "@components/NavigationBlock";

export default function TutorialTheme() {
  const navigate = useNavigate();

  return (
    <div>
      <Header />
      <NavigationBlock navigate={() => navigate(-1)} />
      <div className="flex flex-col justify-center items-start mx-2" />
    </div>
  );
}
