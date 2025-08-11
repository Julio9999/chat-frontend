import { Link } from "react-router"
import { ButtonPrimary } from "./components/common/button-primary"
import { useMainStore } from "./stores/main-store";

function App() {


  const userData = useMainStore(store => store.userData);

  return (
    <div className="flex flex-col gap-4 p-4">
      <p>Bievenido {userData?.username}</p>
      <Link to={"/chat"}>
        <ButtonPrimary>
          Ir al chat
        </ButtonPrimary>
      </Link>
    </div>
  )
}

export default App
