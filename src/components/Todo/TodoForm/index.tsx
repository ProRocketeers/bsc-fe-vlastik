import * as React from "react";
import { Todo } from "../TodosList";
import { Formik, Field, Form } from "formik";
import { useTranslation } from "react-i18next";
import { Input, Label, FormGroup, Button, Col, Row } from "reactstrap";

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

const TodoForm: React.FC<TodoFormProps> = ({ todo, onSubmit, onCancel }) => {
  const { t } = useTranslation();
  return (
    <Formik
      initialValues={todo || initialValues}
      onSubmit={onSubmit}
      render={props => (
        <Form>
          <FormGroup row>
            <Label>{t("title")}</Label>
            <Input tag={Field} id="id" name="title" type="text" />
          </FormGroup>
          <FormGroup check row>
            <Label check>
              <Input
                tag={Field}
                id="completed"
                name="completed"
                type="checkbox"
                checked={props.values.completed}
              />
              {t("todo_state")}
            </Label>
          </FormGroup>
          <Row className="float-right">
            <Col>
              <Button
                type="submit"
                style={{ display: "block" }}
                color="success"
              >
                {t("save")}
              </Button>
            </Col>
            <Col className="text-right">
              {onCancel && (
                <Button type="button" onClick={onCancel}>
                  {t("cancel")}
                </Button>
              )}
            </Col>
          </Row>
        </Form>
      )}
    />
  );
};

export default TodoForm;
