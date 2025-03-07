"use client"

import {useRef} from "react"
import {IKUpload, ImageKitProvider} from "imagekitio-next"

const urlEndpoint = process.env.NEXT_PUBLIC_URL_ENDPOINT
const publicKey = process.env.NEXT_PUBLIC_PUBLIC_KEY

const authenticator = async () => {
  try {
    const response = await fetch("http://localhost:3200/api/upload")

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`Request failed with status ${response.status}: ${errorText}`)
    }

    const data = await response.json()
    const {signature, expire, token} = data
    return {signature, expire, token}
  } catch (error: any) {
    throw new Error(`Authentication request failed: ${error.message}`)
  }
}

export default function Upload({setImg}: any) {
  const ikUploadRef: any = useRef(null)

  const onError = (err: any) => {
    setImg((prev: any) => ({...prev, isLoading: false, error: err.message}))
  }

  const onSuccess = (res: any) => {
    setImg((prev: any) => ({...prev, isLoading: false, dbData: res}))
  }

  const onUploadStart = (res: any) => {
    const file = res.target.files[0]

    const reader: any = new FileReader()
    reader.onloadend = () => {
      setImg((prev: any) => ({
        ...prev,
        isLoading: true,
        aiData: {
          inlineData: {
            data: reader.result.split(",")[1],
            mimeType: file.type,
          },
        },
      }))
    }
    reader.readAsDataURL(file)
  }

  return (
    <>
      <div className='App'>
        <ImageKitProvider publicKey={publicKey} urlEndpoint={urlEndpoint} authenticator={authenticator}>
          <div>
            <IKUpload fileName='test-upload.png' onError={onError} onUploadStart={onUploadStart} onSuccess={onSuccess} style={{display: "none"}} ref={ikUploadRef} />
            {
              <label onClick={() => ikUploadRef.current.click()}>
                <img className={"w-5 h-5 cursor-pointer"} src={"/attachment.png"} alt={"image attachment"} />
              </label>
            }
          </div>
        </ImageKitProvider>
      </div>
    </>
  )
}
