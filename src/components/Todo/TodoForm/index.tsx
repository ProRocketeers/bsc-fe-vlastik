import * as React from "react";
import { Todo } from "../TodosList";
import { Formik, Field, Form } from "formik";
import { useTranslation } from "react-i18next";

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

const { t } = useTranslation();

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
          {t("save")}
        </button>
        {onCancel && (
          <button type="button" onClick={onCancel}>
            {t("cancel")}
          </button>
        )}
      </Form>
    )}
  />
);

export default TodoForm;
