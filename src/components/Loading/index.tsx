import * as React from "react";
import { Spinner } from "reactstrap";

const Loading: React.FC = () => (
  <Spinner style={{ width: "3rem", height: "3rem" }} />
);

export default Loading;
