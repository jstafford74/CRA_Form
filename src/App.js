import React from "react";
import { Formik, Field } from "formik";
import { Row, Col, Container, Form } from "react-bootstrap";
import Checkbox from "./components/Checkbox";
import CheckboxGroup from "./components/CheckboxGroup";
import RadioButton from "./components/RadioButton";
import RadioButtonGroup from "./components/RadioButtonGroup";
import CRAtable from "./components/table";
import * as Yup from "yup";
import riskQ from "./components/table/data";

const App = props => {
  const validationSchema = Yup.object().shape({
    radioGroup: Yup.string().required("A radio option is required"),
    checkboxGroup: Yup.array().required("At least one checkbox is required"),
    singleCheckbox: Yup.bool().oneOf([true], "Must agree to something")
  });
  const initialValues = {
    radioGroup: "",
    checkboxGroup: [],
    singleCheckbox: false
  };
  console.log(riskQ);
  return (
    <>
      <Container>
        <Row>
          <Col>
            <div className="app">
              <h1>Radio & checkbox inputs with Formik</h1>
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={(values, actions) => {
                  setTimeout(() => {
                    console.log(JSON.stringify(values, null, 2));
                    actions.setSubmitting(false);
                  }, 500);
                }}
                render={({
                  handleSubmit,
                  setFieldValue,
                  setFieldTouched,
                  values,
                  errors,
                  touched,
                  isSubmitting
                }) => (
                  <Form onSubmit={handleSubmit}>
                    <div style={{ width: "50%", float: "left" }}>
                      <h2>Single checkbox</h2>
                      <Field
                        component={Checkbox}
                        name="singleCheckbox"
                        id="singleCheckbox"
                        label="Agree to something"
                      />
                      <h2>Checkbox group</h2>
                      <Form.Row>
                        <CheckboxGroup
                          id="checkboxGroup"
                          label="Which of these?"
                          value={values.checkboxGroup}
                          error={errors.checkboxGroup}
                          touched={touched.checkboxGroup}
                          onChange={setFieldValue}
                          onBlur={setFieldTouched}
                        >
                          <Row>
                            <Col>
                              <Field
                                component={Checkbox}
                                name="checkboxGroup"
                                id="checkbox1"
                                label="Always burn, never or rarely tan."
                              />
                            </Col>

                            <Col>
                              <h3></h3>
                            </Col>
                          </Row>
                          <Field
                            component={Checkbox}
                            name="checkboxGroup"
                            id="checkbox2"
                            label="Option 2"
                          />
                          <Field
                            component={Checkbox}
                            name="checkboxGroup"
                            id="checkbox3"
                            label="Option 3"
                          />
                        </CheckboxGroup>
                      </Form.Row>
                      <h2>Skin Cancer Risk Assesment</h2>
                      {riskQ.map(data => (
                        <RadioButtonGroup
                          id="radioGroup"
                          label={data.question}
                          value={values.radioGroup}
                          error={errors.radioGroup}
                          touched={touched.radioGroup}
                        >
                          {data.options.map(ea => (
                            <Field
                              component={RadioButton}
                              name="SCRA"
                              id={data.id}
                              label={ea}
                            />
                          ))}
                        </RadioButtonGroup>
                      ))}
                      <RadioButtonGroup
                        id="radioGroup"
                        label="Skin Type Examples"
                        value={values.radioGroup}
                        error={errors.radioGroup}
                        touched={touched.radioGroup}
                      ></RadioButtonGroup>

                      <h2>Single radio</h2>
                      <p>Is that a valid use case?</p>
                      <button type="submit" disabled={isSubmitting}>
                        Submit
                      </button>
                    </div>
                    <div style={{ width: "50%", float: "right" }}>
                      <pre>
                        {JSON.stringify(
                          {
                            handleSubmit,
                            setFieldValue,
                            setFieldTouched,
                            values,
                            errors,
                            touched,
                            isSubmitting
                          },
                          null,
                          2
                        )}
                      </pre>
                    </div>
                  </Form>
                )}
              />
            </div>
          </Col>
        </Row>

        <Row>
          <Col>
            <CRAtable />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default App;
