import { Button, Input, Typography, Upload } from "antd";
import { getFileHash, getHash } from "../lib/hash";
import { useState } from "react";
import { UploadOutlined } from '@ant-design/icons';

const { TextArea } = Input;
const { Text } = Typography;
type Hash = {
    name: string;
    hash: string;
}
export function HashBox({ hash, setHash }: { hash: string; setHash: (hash: string) => void; }) {
    const [text, setText] = useState('');
    const [hashFile, setHashFile] = useState<Hash[]>([]);


    const handleHash = (text: string) => {
        getHash(text).then(hash => {
            setHash(hash);
        });
    }
    return (
        <>
            <div className="hash-box flex justify-evenly w-full gap-10 p-5">
                <div className="w-1/3">
                    <TextArea rows={5} showCount value={text} onChange={e => { setText(e.target.value); handleHash(e.target.value); }} />
                    <div className="flex gap-2 items-start mt-2">
                        <Upload beforeUpload={async (file) => {
                            const hash = await getFileHash(file);
                            const payload: Hash = {
                                name: file.name,
                                hash: hash
                            }
                            setHashFile(prev => [...prev, payload]);
                            console.log('File:', file);
                            console.log('File name:', file.name);
                            console.log('File size:', file.size);
                            console.log('File type:', file.type);
                            console.log('File hash:', hash);
                            return false; // prevent actual upload
                        }} 
                        onRemove={(file) => {
                            setHashFile(prev => prev.filter(f => f.name !== file.name));
                        }}>
                            <Button icon={<UploadOutlined />}>Click to Upload</Button>
                        </Upload>
                        <Button onClick={() => handleHash(text)}>Hash</Button>
                    </div>
                </div>
                {/* <Divider type="vertical" /> */}
                <div className="w-1/2">
                    <Text>Result (SHA-256): {hash}</Text>
                    {hashFile.length > 0 && (
                        <div className="mt-2">
                            <Text>File Hashes:</Text>
                            {hashFile.map((fileHash, index) => (
                                <div key={index}>
                                    <Text>{fileHash.name}: {fileHash.hash}</Text>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
