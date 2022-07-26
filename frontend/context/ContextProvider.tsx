import {
  createContext,
  useState,
  ReactNode,
  FC,
  Dispatch,
  SetStateAction,
} from "react";

type Props = {
  children: ReactNode;
};

type TodoModel = {
  todo: {
    id: string;
    title: string;
    memo: string;
    created_at: Date;
  };
};

export const StateContext = createContext(
  {} as {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
    isCreate: boolean;
    setIsCreate: Dispatch<SetStateAction<boolean>>;
    updateData: TodoModel;
    setUpdateData: Dispatch<SetStateAction<TodoModel>>;
  }
);

export const ContextProvider: FC<Props> = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [isCreate, setIsCreate] = useState(true);

  const date = new Date();
  const todo = { id: "", title: "", memo: "", created_at: date };
  const [updateData, setUpdateData] = useState({ todo });

  return (
    <StateContext.Provider
      value={{
        open,
        setOpen,
        isCreate,
        setIsCreate,
        updateData,
        setUpdateData,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};
