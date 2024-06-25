import { InboxOutlined } from '@ant-design/icons'
import type { UploadFile } from 'antd'
import { message, Upload } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import { UploadChangeParam } from 'antd/es/upload'
import { useState } from 'react'

const UPLOAD_URL = 'http://localhost:3000/pdf/upload'

export const App = () => {
    const [text, setText] = useState<string>('')

    const handleOnChange = (info: UploadChangeParam<UploadFile<any>>) => {
        const { status } = info.file

        if (status !== 'uploading' && status !== 'error') {
            setText(info.file.response)
        }

        if (status === 'done') {
            message.success(`${info.file.name} file uploaded successfully.`)
            return
        }

        if (status === 'error') {
            message.error(`${info.file.name} file upload failed.`)
            return
        }
    }

    return (
        <>
            <h3>Upload your PDF file:</h3>
            <Upload.Dragger onChange={handleOnChange} action={UPLOAD_URL}>
                <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                </p>
                <p className="ant-upload-text">Click or drag file to this area to upload</p>
            </Upload.Dragger>
            <h3>Output:</h3>
            <TextArea rows={50} value={text} />
        </>
    )
}
