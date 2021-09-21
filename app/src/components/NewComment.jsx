import axios from "axios";
import { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { toast } from "react-toastify";
import Form from "./Form";
import { useParams } from "react-router";

const airtableBase = process.env.REACT_APP_AIRTABLE_BASE;
const airtableKey = process.env.REACT_APP_AIRTABLE_KEY;
const URL = `https://api.airtable.com/v0/${airtableBase}/nameless`;

const config = {
  headers: {
    Authorization: `Bearer ${airtableKey}`,
  },
};

export default function NewComment() {
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const [category, setCategory] = useState("");

  // History
  const history = useHistory();
  const { id } = useParams();

  useEffect(() => {
    const newComment = async () => {
      const res = await axios.get(`${URL}/${id}`, config);
      const { fields } = res.data;
      setName(fields.name);
      setComment(fields.comment);
      setCategory(fields.category);
    };
  newComment();
    // eslint-disable-next-line
  }, []);


  const handleSubmit = async (e) => {
    e.preventDefault();
    const fields = {
      name,
      comment,
      category,
    
    };

    const res = await axios.post(URL, { fields }, config);
    toast("Created Info");
    history.push(`/names/${res.data.id}`);
  };

  return (
    <div>
      <h3>Create a new Post </h3>
      <Form
        name={name}
        setName={setName}
        comment={comment}
        setComment={setComment}
        category={category}
        setCategory={setCategory}
        handleSubmit={handleSubmit}
        type={"Create"}
      />
    </div>
  );
}