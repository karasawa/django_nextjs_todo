type TodoModel = {
  id: string;
  title: string;
  created_at: Date;
};

export const getAllTodos = async () => {
  const res = await fetch(
    new URL(`${process.env.NEXT_PUBLIC_RESTAPI_URL}list-todo/`)
  );
  const todos = await res.json();
  const sortedTodos = todos.sort((a: TodoModel, b: TodoModel) => {
    if (b.created_at > a.created_at) {
      return 1;
    } else {
      return -1;
    }
  });
  return sortedTodos;
};

export const getAllTodoIds = async () => {
  const res = await fetch(
    new URL(`${process.env.NEXT_PUBLIC_RESTAPI_URL}list-todo/`)
  );
  const todos = await res.json();
  return todos.map((todo: TodoModel) => {
    return {
      params: {
        id: String(todo.id),
      },
    };
  });
};

export const getTodo = async (id: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_RESTAPI_URL}detail-todo/${id}/`
  );
  const todo = await res.json();
  return todo;
};
