import React, { useContext, useState } from "react";
import { Card, CardHeader, CardBody, Collapse } from "reactstrap";
import { AuthContext } from "../../Authentication/AuthContext";
import { toast } from "react-toastify";

interface AccordionProps {
  title: string;
  isOpenDefault?: boolean;
  children?: React.ReactNode;

}

const Accordion: React.FC<AccordionProps> = ({
  title,
  isOpenDefault = true,
  children,
}) => {

  const { setAuthenticated } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(isOpenDefault);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };
  const logout = (e: React.MouseEvent) => {
    e.stopPropagation();
    localStorage.removeItem("isAuth");
    toast.success("Logout")
    setAuthenticated(false)
  };
  
  return (
    <Card>
      <CardHeader onClick={toggleAccordion} className="cursor-pointer ">
        <span className="fw-bold me-5">  {title} </span> <span role="button" aria-label="Logout" onClick={logout}>
          Logout
        </span>
      </CardHeader>
      <Collapse isOpen={isOpen}>
        <CardBody>{children}</CardBody>
      </Collapse>
    </Card>
  );
};

export default Accordion;
