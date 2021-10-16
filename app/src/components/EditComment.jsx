import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { useHistory } from "react-router";
import Form from "./Form";
import axios from "axios";

const airtableBase = process.env.REACT_APP_AIRTABLE_BASE;
const airtableKey = process.env.REACT_APP_AIRTABLE_KEY;
const URL = `https://api.airtable.com/v0/${airtableBase}/nameless`;

const config = {
  headers: {
    Authorization: `Bearer ${airtableKey}`,
  },
};

export default function EditComment() {
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const [category, setCategory] = useState("");


  const { id } = useParams();
  const history = useHistory();

  useEffect(() => {
    const editComment = async () => {
      const res = await axios.get(`${URL}/${id}`, config);
      const { fields } = res.data;
      setName(fields.name);
      setComment(fields.comment);
      setCategory(fields.category);
    };

    editComment();
    // eslint-disable-next-line
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fields = {
      name,
      comment,
      category,
    
    };

    const res = await axios.put(`${URL}/${id}`, { fields }, config);
    history.push(`/nameless/${res.data.id}`);
  };

  return (
    <div>
      <h3>Edit Comment </h3>
      <Form
        name={name}
        setName={setName}
        comment={comment}
        setComment={setComment}
        category={category}
        setCategory={setCategory}
        handleSubmit={handleSubmit}
        type={"Edit"}
      />
    </div>
  );
}