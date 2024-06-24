import TodoForm from "../components/TodoForm";
import TodoList from "../components/TodoList";


export default function Home() {
  // TODO: useQuery 로 리팩터링 하세요.
  // TodoList로 이동

  return (
    <>
      <h2>서버통신 투두리스트 by useState</h2>
      <TodoForm />
      <TodoList />
    </>
  );
}
