import { useState } from 'react'
import { HashBox } from './components/HashBox'
import { Button, Divider } from 'antd'
import { GithubOutlined } from '@ant-design/icons'

function App() {
  const [hash, setHash] = useState<string>('');
  const [hash1, setHash1] = useState<string>('');

  return (
    <>
      <div className="nav flex justify-between items-center p-2 bg-gray-900 text-white">
        <div className='font-medium text-lg'>
          Hash web - Local SHA-256 Hash Generator
        </div>
        <Button
          icon={<GithubOutlined />}
          href="https://github.com/uditrajput03/hashweb"
          target="_blank"
        >
          Star on GitHub
        </Button>
      </div>
      <div className={hash && (hash == hash1) ? 'bg-green-50' : ''}>
        <HashBox hash={hash} setHash={setHash} />
        <Divider />
        <HashBox hash={hash1} setHash={setHash1} />
      </div>
    </>
  )
}

export default App
