import { useCallback, useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudUpload, faFile } from '@fortawesome/free-solid-svg-icons';
import { ArrowUpTrayIcon, XMarkIcon } from '@heroicons/react/24/solid'
import { useForm } from "./utils/useForm2";
import validate from "./utils/validationRules";
import { withTranslation } from "react-i18next";

const Dropzone = ({ className, setFormState, t }) => {
    const [files, setFiles] = useState([])
  const [rejected, setRejected] = useState([])
  // const {setDragFiles} = useForm(validate);

  const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
    if (acceptedFiles?.length) {
      setFiles(previousFiles => [
        ...previousFiles,
        ...acceptedFiles.map(file =>
          Object.assign(file, { preview: URL.createObjectURL(file) })
        )
      ])

      // setDragFiles(previousFiles => [
      //   ...previousFiles,
      //   ...acceptedFiles.map(file =>
      //     Object.assign(file, { preview: URL.createObjectURL(file) })
      //   )
      // ])
    }

    if (rejectedFiles?.length) {
      setRejected(previousFiles => [...previousFiles, ...rejectedFiles])
    }
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
        '*/*': []
    },
    onDrop
  })

  useEffect(() => {

    setFormState((prevState) => ({
      ...prevState,
      values: {
        ...prevState.values,
        ["File"]: files
      },
      errors: {
        ...prevState.errors,
        ["File"]: "",
      },
    }));

    

    console.log(files)
    return () => files.forEach(file => URL.revokeObjectURL(file.preview))

  }, [files])

  const removeFile = name => {
    setFiles(files => files.filter(file => file.name !== name))
  }

//   const removeAll = () => {
//     setFiles([])
//     setRejected([])
//   }

//   const removeRejected = name => {
//     setRejected(files => files.filter(({ file }) => file.name !== name))
//   }

  // const handleSubmit = async e => {
  //   e.preventDefault()

  //   if (!files?.length) return

  //   const formData = new FormData()
  //   files.forEach(file => formData.append('file', file))
  //   formData.append('upload_preset', 'friendsbook')

  //   const URL = process.env.NEXT_PUBLIC_CLOUDINARY_URL
  //   const data = await fetch(URL, {
  //     method: 'POST',
  //     body: formData
  //   }).then(res => res.json())

  //   console.log(data)
  // }
  return (
    <form 
    // onSubmit={handleSubmit}
    >
      <div
        {...getRootProps({
          className: className
        })}
      >
        <input {...getInputProps()} />
        <div className='flex flex-col items-center justify-center '>
          {/* <ArrowUpTrayIcon className='w-5 h-5 fill-current' /> */}
          {isDragActive ? (
            <>
            <FontAwesomeIcon icon={faCloudUpload} size="3x" className="fa-fw " />
            <p>Drop the files here ...</p>
            </>
          ) : (
            <>
                              <FontAwesomeIcon icon={faCloudUpload} size="3x" className="fa-fw " />
                                    <div >
                                        {t("Upload Your files")}
                                    </div >
                                    <div >
                                        Drag a file here or <span className=' text-blue-700'>browse</span> for a file to upload.
                                    </div>
                                    </>
          )}
        </div>
      </div>

      {/* Preview */}
      <section className='mt-10'>
        {/* <div className='flex gap-4'>
          <div className='title text-3xl font-semibold'>Preview</div>
          <button
            type='button'
            onClick={removeAll}
            className='mt-1 text-[12px] uppercase tracking-wider font-bold text-neutral-500 border border-secondary-400 rounded-md px-3 hover:bg-secondary-400 hover:text-white transition-colors'
          >
            Remove all files
          </button>
          <button
            type='submit'
            className='ml-auto mt-1 text-[12px] uppercase tracking-wider font-bold text-neutral-500 border border-purple-400 rounded-md px-3 hover:bg-purple-400 hover:text-white transition-colors'
          >
            Upload to Cloudinary
          </button>
        </div> */}

        {/* Accepted files */}
        {/* <h3 className='title text-lg font-semibold text-neutral-600 mt-10 border-b pb-3'>
          Accepted Files
        </h3> */}
        <ul className='mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 gap-10'>
          {files.map(file => (
            <li key={file.name} className='relative mb-16 h-16 w-16 rounded-md shadow-lg'>
              {file.type.startsWith('image/') &&<img
                src={file.preview}
                alt={file.name}
                width={100}
                height={100}
                onLoad={() => {
                  URL.revokeObjectURL(file.preview)
                }}
                className='h-full w-full object-contain rounded-md'
              />}

            {file.type.startsWith('video/') && 
            // Display video preview if file type is a video
            <video
              src={file.preview}
              alt={file.name}
              width={100}
              height={100}
              autoPlay
              controls
              muted
              className='h-full w-full object-cover rounded-md'
            />}

          {!['image/', 'video/'].some(type => file.type.startsWith(type)) && 
            // Display video preview if file type is a video
            <FontAwesomeIcon icon={faFile} size="3x" className="fa-fw " />
            }
              <button
                type='button'
                className='w-7 h-7 border border-red-400 bg-red-400 rounded-full flex justify-center items-center absolute -top-3 -right-3 hover:bg-white transition-colors'
                onClick={() => removeFile(file.name)}
              >
                <XMarkIcon className='w-5 h-5 fill-white hover:fill-secondary-400 transition-colors' />
              </button>
              <div className='mt-2 text-neutral-500 text-[12px] font-medium'>
                {file.name}
              </div>
            </li>
          ))}
        </ul>

        {/* Rejected Files */}
        {/* <h3 className='title text-lg font-semibold text-neutral-600 mt-24 border-b pb-3'>
          Rejected Files
        </h3>
        <ul className='mt-6 flex flex-col'>
          {rejected.map(({ file, errors }) => (
            <li key={file.name} className='flex items-start justify-between'>
              <div>
                <p className='mt-2 text-neutral-500 text-sm font-medium'>
                  {file.name}
                </p>
                <ul className='text-[12px] text-red-400'>
                  {errors.map(error => (
                    <li key={error.code}>{error.message}</li>
                  ))}
                </ul>
              </div>
              <button
                type='button'
                className='mt-1 py-1 text-[12px] uppercase tracking-wider font-bold text-neutral-500 border border-secondary-400 rounded-md px-3 hover:bg-secondary-400 hover:text-white transition-colors'
                onClick={() => removeRejected(file.name)}
              >
                remove
              </button>
            </li>
          ))}
        </ul> */}
      </section>
    </form>
  )
}

export default withTranslation()(Dropzone)






// import React, { useCallback, useState } from 'react';
// import { useDropzone } from 'react-dropzone';

// function Dropzone ({ className }) {
//   const [acceptedFiles, setAcceptedFiles] = useState([]);

//   const onDrop = useCallback(acceptedFiles => {
//     setAcceptedFiles(acceptedFiles);
//   }, []);

//   console.log(acceptedFiles)

//   const { getRootProps, getInputProps, isDragActive } = useDropzone({
//     accept: '*/*', // Example: Accept all image types
//     onDrop,
//   });

//   return (
//     <div {...getRootProps()}>
//       <input {...getInputProps()} />
//       {isDragActive ? (
//         <p>Drag & drop files here...</p>
//       ) : (
//         <p>
//           Drag & drop some files here, or click to select files (Only images allowed).
//         </p>
//       )}
//       <ul>
//         {acceptedFiles.map(file => (
//           <li key={file.path}>
//             {file.path} - {file.size} bytes
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default Dropzone
