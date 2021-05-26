import "../styles/index.css";
import { TodosProvider } from "../contexts/TodosContext";
import { UserProvider } from "@auth0/nextjs-auth0";

function MyApp({ Component, pageProps }) {
  return (
    <TodosProvider>
      <div className="container mx-auto my-10 max-w-xl">
        <UserProvider>
          <Component {...pageProps} />
        </UserProvider>
      </div>
    </TodosProvider>
  );
}

export default MyApp;
