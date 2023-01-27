import React, { useEffect, useRef, useState } from 'react';
import ReactQuill from 'react-quill';
import "react-quill/dist/quill.snow.css"
import './App.css';

function App() {
  const ref = useRef('');
  const changeRef = useRef(false);
  const changeCountRef = useRef(0);

  const [post, setPost] = useState<string[]>(() => {
    const data = localStorage.getItem('data')
    try {
      if(data)
        return JSON.parse(data)
      return []
    }
    catch(e) {
      localStorage.removeItem('data');
      return []
    }
  })

  const [content, setContent] = useState<string>(() => {
    const tmp = localStorage.getItem('tmp')
    return tmp ?? ""
  })

  // content가 바뀔 때 마다 로컬스토리지에 저장
  // useEffect(() => {
  //   if(content.length > 0) {
  //     localStorage.setItem('tmp', content)
  //   }
  // }, [content])

  useEffect(() => {
    changeCountRef.current++;
    ref.current = content;
    changeRef.current = true;

    if(changeCountRef.current > 15) {
      changeCountRef.current = 0
      changeRef.current  = false;
      localStorage.setItem('tmp', ref.current)
      // console.log('너무 많은 변화에 의하여 바로 저장!')
    }
  }, [content])

  useEffect(() => {
    const intv = setInterval(() =>{
      // console.log("인터벌이 일어남")
      // console.log(ref.current)
      if(changeRef.current) {
        // console.log("값이 바뀜", ref.current)
        localStorage.setItem('tmp', ref.current)
        changeRef.current = false;
        changeCountRef.current = 0;
      }
    }, 10000)
    return () => clearInterval(intv)
  },[])

  return (
    <>
      <div className='bg'></div>
      <div className='container'>
        <header className='header'>
          <ul className='dot'>
            <li></li>
            <li></li>
            <li></li>
          </ul>
          <div className='address button'>web.editor.com</div>
          <div className='button'>💌</div>
        </header>
        <div className='nav'>
          <h2>Web Editor</h2>
          <div className='btn'>
            <button onClick={() => {
              if(content.length === 0) {
                alert('아무것도 입력되지 않았습니다.')
                return;
              }
              localStorage.removeItem('tmp')
              setPost(prev => {
                const rs = [...prev, content]
                localStorage.setItem('data', JSON.stringify(post))
                return rs
              })
              setContent('')
            }}>
              발행
            </button>
            <button onClick={() => {
              if(window.confirm("정말 초기화 하겠습니까?")) {
                localStorage.clear();
                setPost([])
              }
            }}>
              초기화
            </button>
          </div>
        </div>

        <div className='editor'>
          <ReactQuill
            style={{
              margin: "20px",
            }}
            value={content}
            onChange={setContent}
            modules={{
              toolbar: [
                ['image'],
                ['bold', 'italic', 'underline', 'strike'],
                ['blockquote', 'code-block'],

                [{ 'header': 1 }, { 'header': 2 }],
                [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                [{ 'script': 'sub'}, { 'script': 'super' }],
                [{ 'indent': '-1'}, { 'indent': '+1' }],
                [{ 'direction': 'rtl' }],
              
                [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
              
                [{ 'color': [] }, { 'background': [] }],
                [{ 'font': [] }],
                [{ 'align': [] }],
              ]
          }}/>
        </div>

        <div className='post'>
          <h4>게시글</h4>
          {
            post.map((post, idx) => <div key={idx} 
              style={{ 
                border: "solid 1px #ccc",
                padding: "20px",
                margin: "20px"
              }}
            >
              <div dangerouslySetInnerHTML={{
                __html: post
              }}/>
            </div>)
          }
        </div>
      </div>
    </>
  );
}

export default App;
