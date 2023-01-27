[![Netlify Status](https://api.netlify.com/api/v1/badges/11b5107c-ed7f-4cd9-b3a8-c4a3049127a0/deploy-status)](https://app.netlify.com/sites/hacookie-webeditor/deploys)
# Web Editor
react-quill을 이용한 웹 에디터 만들기
```tsx
<ReactQuill modules={{
  toolbar: [
    ['image'],
    ['bold', 'italic', 'underline', 'strike'],
    ['blockquote', 'code-block'],
    [{ 'header': 1 }, { 'header': 2 }],
    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
    [{ 'script': 'sub'}, { 'script': 'super' }],
    [{ 'indent': '-1'}, { 'indent': '+1' }],
    [{ 'direction': 'rtl' }],
    [{ 'size': ['small', false, 'large', 'huge'] }],
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
    [{ 'color': [] }, { 'background': [] }],
    [{ 'font': [] }],
    [{ 'align': [] }],
    ['clean']
  ]
}}/>
```

- 포스팅 발행하기
- 전체 삭제 기능
- localStoreage를 이용한 데이터 저장
```tsx
const [post, setPost] = useState<string[]>(() => {
  const data = localStorage.getItem('data')
  try {
    if(data)
      return JSON.parse(data)
    return []
  }
  
  catch(e) { // JSON으로 parse이 안될 경우
    localStorage.removeItem('data');
    return []
  }
})
```
```tsx
<button onClick={() => {
  if(content.length === 0) {
    alert('아무것도 입력되지 않았습니다.')
    return;
  }
  setPost(prev => {
    const rs = [...prev, content]
    localStorage.setItem('data', JSON.stringify(post))
    return rs
  })
  setContent('')
}}>발행</button>
```
