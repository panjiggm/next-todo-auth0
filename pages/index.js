import { useContext, useEffect } from "react";
import Head from "next/head";
import { getSession, useUser } from "@auth0/nextjs-auth0";

import Navbar from "../components/Navbar";
import Todo from "../components/Todo";
import { table, minifyRecords } from "./api/utils/Airtable";
import { TodosContext } from "../contexts/TodosContext";
import TodoForm from "../components/TodoForm";

export default function Home({ initialTodos }) {
  const { todos, setTodos } = useContext(TodosContext);
  const { user, isLoading } = useUser();

  useEffect(() => {
    setTodos(initialTodos);
  }, []);

  return (
    <div>
      <Head>
        <title>Todo Airtable</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <main>
        <h1 className="text-2xl text-center mb-4">My Todos</h1>
        {user ? (
          <>
            <TodoForm />
            <ul>
              {todos && todos.map((todo) => <Todo key={todo.id} todo={todo} />)}
            </ul>
          </>
        ) : (
          <p className="text-center mt-4">Please login to save todos!</p>
        )}
      </main>
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context.req, context.res);
  let todos = [];

  if (session?.user) {
    todos = await table
      .select({
        filterByFormula: `userId = '${session.user.sub}'`,
      })
      .firstPage();
  }

  return {
    props: {
      initialTodos: minifyRecords(todos),
      user: session?.user || null,
    },
  };
}
