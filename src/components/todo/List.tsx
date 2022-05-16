import { Todo } from "@/types/Todo"

type Props = {
  todos: Todo[]
}

export default function List(props: Props) {
  const {todos} = props
  return (
    <>
      { console.log(todos) }
      {todos.map((todo: Todo, i: number) => (
        <div key={todo.id}>
          {console.log(i + 1 + '番目')}
          <p>{i + 1}番目</p>
          <p>title: {todo.name}</p>
        </div>
      ))}
    </>
  )
}
