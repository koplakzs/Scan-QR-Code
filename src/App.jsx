import { useRef } from 'react'
import './App.css'

function App() {
  const fileInputRef = useRef(null);

  const handleSubmit = () => {
    fileInputRef.current.click();
  };

  const fetchReq = (file, formData) => {
    const qrCode = document.querySelector('.qr-code')
    const textArea = document.querySelector('textarea');
    fetch('http://api.qrserver.com/v1/read-qr-code/', {
      method: 'POST',
       body:formData
    })
    .then(res => res.json())
    .then(result => {
      result = result[0].symbol[0].data;
      console.log(result)
      textArea.innerText = result
      document.querySelector('img').src = URL.createObjectURL(file)
      qrCode.classList.add('active')
    })
    .catch(() => {
      textArea.innerText = 'Tidak Bisa Scan QR Code'
    })
  }

   const onChange = (e) => {
    let file = e.target.files[0];
    if(!file) return;
    let formData = new FormData;
    formData.append('file', file);
    console.log(formData)
    fetchReq(file, formData)
  }

  const copy = () => {
    const text = document.querySelector('textarea').textContent;
    navigator.clipboard.writeText(text)
    alert('Text Berhasil Disalin')
  }
  return (
    <>
    <div className="qr-code">
      <form onClick={handleSubmit}>
        <input type="file" onChange={onChange} ref={fileInputRef} hidden/>
        <img src="" alt="" />
        <div className="content">
        <i className="fa-solid fa-cloud-arrow-up" style={{color: '#49c41c'}}></i>
        <p>Upload QR Code</p>
        </div>
        </form>
      <div className="details">
        <textarea spellCheck='false' rows="7"disabled></textarea>
        <button onClick={copy}>Copy Text</button>
      </div>
    </div>
    </>
  )
}

export default App
