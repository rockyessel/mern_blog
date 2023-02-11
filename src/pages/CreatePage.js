import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [files, setFiles] = useState('');
  const [redirect, setRedirect] = useState(false);

  const navigate = useNavigate();

  const createNewPost = async (event) => {
    event.preventDefault();
    const postData = { title, summary, content, files: files[0] };

    console.log(postData);

    const response = await fetch('http://localhost:4000/post', {
      method: 'POST',
      body: JSON.stringify(postData),
      credentials: 'include',
    });

    if (response.ok) {
      setRedirect(true);
    }

    const data = await response.json();

    console.log(data);
  };

  if (redirect) {
    navigate('/');
  }

  return (
    <form onSubmit={createNewPost}>
      <input
        type='title'
        placeholder={'Title'}
        value={title}
        onChange={(ev) => setTitle(ev.target.value)}
      />
      <input
        type='summary'
        placeholder={'Summary'}
        value={summary}
        onChange={(ev) => setSummary(ev.target.value)}
      />
      <input type='file' onChange={(ev) => setFiles(ev.target.files)} />
      <ReactQuill value={content} onChange={setContent} />
      <button style={{ marginTop: '5px' }}>Create post</button>
    </form>
  );
};

export default CreatePost;
