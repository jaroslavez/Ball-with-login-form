import "../../styles/globals.scss";
import MainLayout from "../components/MainLayout";
import { Provider } from "react-redux";
import { store } from "../store/store";

export default function App({ Component, pageProps }) {
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <Provider store={store}>
      <MainLayout>
        {getLayout(<Component {...pageProps} />)}
      </MainLayout>
    </Provider>

  );
}
