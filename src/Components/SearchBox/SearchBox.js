import React from "react";
import { Form } from "react-bootstrap";

import { useNavigate } from "react-router-dom";

const SearchBox = () => {
  const navigate = useNavigate();
  //const [keyword, setKeyword] = useState("");

  function onChangeHandler(e) {
    if (e.target.value.trim()) {
      navigate(`/search/${e.target.value}`);
    } else {
      navigate("/");
    }
  }

  // function onSubmitHandler(e) {
  //   e.preventDefault();

  //   if (keyword.trim()) {
  //     navigate(`/search/${keyword}`);
  //   } else {
  //     navigate("/");
  //   }
  // }

  return (
    <Form className="d-flex">
      <Form.Control
        className="rounded px-5 border border-light"
        required
        name="keyward"
        placeholder="Search here to find.."
        onChange={onChangeHandler}
      />
    </Form>
  );
};

export default SearchBox;
