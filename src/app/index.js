import { useEffect } from "react";
import Main from "./main";
import Basket from "./basket";
import useSelector from "../store/use-selector";
import { Route, Routes } from "react-router-dom";
import ProductPage from "./product-page";
import useStore from "../store/use-store";

/**
 * Приложение
 * @returns {React.ReactElement}
 */
function App() {
  const store = useStore();
  const activeModal = useSelector((state) => state.modals.name);

  useEffect(() => {
    store.actions.catalog.load();
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path={`/product-page/:id`} element={<ProductPage />} />
      </Routes>

      {activeModal === "basket" && <Basket />}
    </>
  );
}

export default App;
