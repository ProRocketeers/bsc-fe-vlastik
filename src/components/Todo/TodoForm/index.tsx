import * as React from "react";
import { Todo } from "../TodosList";
import { Formik, Field, Form } from "formik";

interface TodoFormProps {
  todo?: Todo;
  onSubmit: (values: ITodoForm) => void;
  onCancel?: () => void;
}

export interface ITodoForm {
  id?: number;
  completed: boolean;
  userId: number;
  title: string;
}

const initialValues: ITodoForm = {
  completed: false,
  title: "",
  userId: 1,
};

const TodoForm: React.FC<TodoFormProps> = ({ todo, onSubmit, onCancel }) => (
  <Formik
    initialValues={todo || initialValues}
    onSubmit={onSubmit}
    render={props => (
      <Form>
        <Field id="title" name="title" placeholder="..." type="text" />
        <Field
          id="completed"
          name="completed"
          type="checkbox"
          checked={props.values.completed}
        />
        <button type="submit" style={{ display: "block" }}>
          Submit
        </button>
        {onCancel && (
          <button type="button" onClick={onCancel}>
            Cancel
          </button>
        )}
      </Form>
    )}
  />
);

export default TodoForm;
