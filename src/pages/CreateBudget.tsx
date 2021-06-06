import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import { ipcRenderer } from 'electron';

export default function CreateBudgetPage() {
  const history = useHistory();
  return (
    <div>
      <p>Create Budget</p>
      <Link to="/">Home</Link>
      <Formik
        initialValues={{ name: '' }}
        onSubmit={(values) => {
          console.log(values);
          ipcRenderer
            .invoke('create-budget', values.name)
            .then(() => {
              return history.push('/');
            })
            .catch(() => {
              throw new Error('Error creating budget');
            });
        }}
      >
        <Form>
          <Field name="name" />
          <button type="submit">Submit</button>
        </Form>
      </Formik>
    </div>
  );
}
