import React, { useContext, useState } from "react";
import {
  Row,
  Col,
  CardBody,
  Card,
  Container,
  Form,
  Input,
  FormFeedback,
  Label,
  Button,
} from "reactstrap";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import userData from "../userData.json";
import * as Yup from "yup";
import { useFormik } from "formik";
import { AuthContext } from "../Authentication/AuthContext";

const Login = () => {
  const { setAuthenticated } = useContext(AuthContext);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const LoginSchema = Yup.object().shape({
    email: Yup.string().test(
      "email",
      "Invalid email",
      function (value) {
        if (value) {
          const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
          return isEmail
        }
        return false;
      }
    ),
    password: Yup.string().required("Password is required"),
  });

  const validation = useFormik({
    initialValues: {
      email: "",
      password: ""
    },
    validationSchema: LoginSchema,
    onSubmit: (values) => {
      const foundUser = userData.users.find(
        (user) => user.email === values.email && user.password === values.password
      );

      if (foundUser) {
        localStorage.setItem("isAuth", "true");
        setAuthenticated(true);
        navigate("/dashboard", {
          replace: true,
        });
        toast.success("Login Successfully")
      } else {
        setError('Invalid username or password');
        toast.warning("User is not Authenticated.")
      }
    },
  });


  return (
    <React.Fragment>
      <div className="my-5 pt-sm-5">
        <Container>
          <Row className="justify-content-center">
            <Col md={7} lg={5} xl={4}>
              <Card className="overflow-hidden border-0">
                <CardBody className="pt-0 mt-4">
                  <div className="p-2">
                    <Form className="form-horizontal" onSubmit={(e) => {
                      e.preventDefault();
                      validation.handleSubmit();
                      return false;
                    }}>
                      <div>
                        <h6>Login </h6>
                      </div>
                      <div className="mt-3">
                        <Label className="small">Email</Label>
                        <Input
                          name="email"
                          className="form-control border-0 border-bottom outline-0 "
                          placeholder="Enter your Email ID"
                          type="text"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.email}
                          invalid={validation.touched.email && !!validation.errors.email}
                        />
                        {validation.touched.email && (
                          <FormFeedback type="invalid">
                            {validation.errors.email}
                          </FormFeedback>
                        )}
                      </div>
                      <div className="mt-3">
                        <Label className="small">Password</Label>
                        <Input
                          name="password"
                          className="form-control border-0 border-bottom outline-0 "
                          placeholder="Enter your password"
                          type="password"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.password}
                          invalid={validation.touched.password && !!validation.errors.password}
                        />
                        {validation.touched.password && (
                          <FormFeedback type="invalid">
                            {validation.errors.password}
                          </FormFeedback>
                        )}
                      </div>

                      {error && (
                        <div className="mt-3 text-center text-danger"><p>{"Invalid Login Credentials"}</p></div>

                      )}
                      <div className="mt-4 d-grid">
                        <Button
                          color="primary"
                          type="submit"
                          className="border-0"
                          disabled={!validation.values.email || !validation.values.password}
                        >
                          Login
                        </Button>
                      </div>
                    </Form>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Login;
