import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addItems, deleteItems, updateItems } from "./store/slice";
import { v4 as uuid } from "uuid";

export const Form = () => {
  const dispatch = useDispatch();

  const item = useSelector(state => state.reduce.items);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [updateForm, setUpdateForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  function handleUpdateChange(e) {
    const { name, value } = e.target;
    setUpdateForm({ ...form, [name]: value });
  }

  const [edit, setEdit] = useState(false);
  const [id, setId] = useState();

  function handleChange(e) {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    const { name, email, password } = form;
    const id = uuid();
    dispatch(addItems({ id: id, name, email, password }));
    console.log(item);
  }
  function handleUpdate(e) {
    e.preventDefault();
    const { name, email, password } = updateForm;
    dispatch(updateItems({ id: id, name, email, password }));
    setEdit(false);
  }

  return (
    <div>
      <form action='' onSubmit={e => handleSubmit(e)}>
        <label htmlFor=''>Name</label>
        <input
          type='text'
          name='name'
          value={form.name}
          onChange={e => handleChange(e)}
        />
        <label htmlFor=''>Email</label>
        <input
          type='text'
          name='email'
          value={form.email}
          onChange={e => handleChange(e)}
        />
        <label htmlFor=''>Password</label>
        <input
          type='text'
          name='password'
          value={form.password}
          onChange={e => handleChange(e)}
        />
        <input type='submit' />
      </form>

      <div className='showItems'>
        {item.map(all => (
          <div key={all.id}>
            <h1>{all.name}</h1>
            <div className=''>
              <button
                onClick={() => {
                  setId(all.id);
                  setEdit(true);
                }}
              >
                Update
              </button>
              <button
                onClick={() => {
                  dispatch(deleteItems({ id: all.id }));
                }}
              >
                Delete
              </button>
            </div>
            {edit && id && (
              <>
                <form action='' onSubmit={e => handleUpdate(e)}>
                  <label htmlFor=''>Name</label>
                  <input
                    type='text'
                    name='name'
                    value={updateForm.name}
                    onChange={e => handleUpdateChange(e)}
                  />
                  <label htmlFor=''>Email</label>
                  <input
                    type='text'
                    name='email'
                    value={updateForm.email}
                    onChange={e => handleUpdateChange(e)}
                  />
                  <label htmlFor=''>Password</label>
                  <input
                    type='text'
                    name='password'
                    value={updateForm.password}
                    onChange={e => handleUpdateChange(e)}
                  />
                  <input type='submit' value='Update' />
                </form>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
