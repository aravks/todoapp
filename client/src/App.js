import { useEffect, useState } from 'react';
import axios from 'axios';

export default function App() {
  const [text, setText] = useState('');
  const [text1, setText1] = useState('');
  const [todos, setTodos] = useState([]);
  const [edit, setEdit] = useState([]);
  const [currIndex, setCurrIndex] = useState(0);

  const handleAdd = (text) => {
    setTodos([...todos, text]);
    setEdit([...edit, false]);
    createTodos(text);
    setText('');
  };

  const handleEdit = (index) => {
    setCurrIndex(index);
    edit[index - 1] = true;
    setEdit([...edit]);
    setText1('');
  };

  const handleDelete = (index, id) => {
    deleteTodos(id);
    todos.splice(index - 1, 1);
    edit.splice(index - 1, 1);
    setTodos([...todos]);
    setEdit([...edit]);
  };

  const handleSave = (cIndex, txt, id) => {
    updateTodos(id, txt);
    todos[cIndex] = txt;
    edit[cIndex] = false;
    setTodos([...todos]);
    setEdit([...edit]);
    setText1('');
  };

  const handleCancel = (cIndex) => {
    edit[cIndex] = false;
    setEdit([...edit]);
  };

  const createTodos = async (it) => {
    try {
      await axios
        .post('/todos', { title: it })
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
    } catch (err) {
      console.log(err);
    }
    showTodos();
  };

  const showTodos = () => {
    axios
      .get('/todos')
      .then((res) => {
        setTodos([...res.data]);
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  };

  const updateTodos = async (id, txt) => {
    try {
      await axios
        .put(`/todo/${id}`, { title: txt })
        .then((res) => console.log(res.data))
        .catch((err) => console.log(err));
    } catch (err) {
      console.log(err);
    }
    showTodos();
  };

  const deleteTodos = (id) => {
    axios
      .delete(`/todo/${id}`)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
    showTodos();
  };

  useEffect(() => {
    showTodos();
  }, []);

  return (
    <div className='App bg-dark'>
      {/* ---------------------------------------------------------
                          Input and Add
      --------------------------------------------------------- */}

      <div className='container text-center'>
        <div className='row justify-content-center'>
          <h1 className='m-4 text-white'>Hey mate! Let's add something cool</h1>
          <div className='col-8 m-2'>
            <input
              className='form-control'
              type='text'
              value={text}
              onChange={(e) => setText(e.target.value)}
            ></input>
          </div>
          <div className='col-2 m-2'>
            <button className='btn btn-success' onClick={() => handleAdd(text)}>
              Add
            </button>
          </div>
        </div>
        {
          // ---------------------------------------------------------
          //                     Todo Items List
          // ---------------------------------------------------------
          todos.map((ele, ind) => (
            <div
              className='row rounded-3 justify-content-center bg-light m-2'
              key={ele._id}
            >
              <div className='col-6  m-2 p-2'>
                <label>{ele.title}</label>
              </div>

              {/* Edit Button */}
              <div className='col-2 m-2'>
                <button
                  className='btn btn-warning'
                  value={ind + 1}
                  onClick={(e) => handleEdit(parseInt(e.target.value))}
                >
                  Edit
                </button>
              </div>

              {/* Delete Button */}
              <div className='col-2 m-2'>
                <button
                  className='btn btn-danger'
                  value={ind + 1}
                  onClick={(e) =>
                    handleDelete(parseInt(e.target.value), ele._id)
                  }
                >
                  Delete
                </button>
              </div>

              {/* Edit form - Opens onClick Edit Button */}
              {
                // Edit - Input Box

                edit[currIndex - 1] && currIndex === ind + 1 && (
                  <div className='row justify-content-center'>
                    <div className='col-6 m-2'>
                      <input
                        className='form-control'
                        value={text1}
                        onChange={(e) => setText1(e.target.value)}
                      ></input>
                    </div>

                    {/* Edit - Save Button */}

                    <div className='col-2 m-2'>
                      <button
                        className='btn btn-primary'
                        onClick={() =>
                          handleSave(currIndex - 1, text1, ele._id)
                        }
                      >
                        Save
                      </button>
                    </div>

                    {/* Edit - Cancel Button */}

                    <div className='col-2 m-2'>
                      <button
                        className='btn btn-secondary'
                        onClick={() => handleCancel(currIndex - 1)}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )
              }
            </div>
          ))
        }
      </div>
    </div>
  );
}
