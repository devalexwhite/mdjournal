"use client";

import { useState } from "react";
import Dropzone from "react-dropzone"

function formatBytes(a: number, b = 2) { if (!+a) return "0 Bytes"; const c = 0 > b ? 0 : b, d = Math.floor(Math.log(a) / Math.log(1024)); return `${parseFloat((a / Math.pow(1024, d)).toFixed(c))} ${["Bytes", "KiB", "MiB", "GiB", "TiB", "PiB", "EiB", "ZiB", "YiB"][d]}` }

const FileEntry = ({ file, onDelete }: { file: File, onDelete: () => void }) => {
    return (
        <div className="flex items-center justify-between w-full">
            <div className="flex flex-col">
                <h4 className="font-semibold text-lg text-black dark:text-white">
                    {file.name}
                </h4>
                <span className="block text-sm text-gray-700 dark:text-gray-100">
                    {formatBytes(file.size)}
                </span>
            </div>
            <button onClick={onDelete} className="text-red-600 underline">Remove</button>
        </div>
    )
}

export default function MdDropzone({ extensions, isLoggedIn, onDropFiles }: { extensions: Object, isLoggedIn: boolean, onDropFiles: (files: Array<File>) => void }) {
    const [dragging, setDragging] = useState(false) as [boolean, Function]
    const [files, setFiles] = useState([]) as [Array<File>, Function]

    const onDrop = (acceptedFiles: Array<File>) => {
        setDragging(false)
        if (acceptedFiles.length === 0) {
            alert("Please drop a markdown file (.md, .markdown).")
            return
        }
        setFiles(acceptedFiles);
        onDropFiles(acceptedFiles);
    }

    const onRemoveFile = (name: string) => {
        setFiles(files.filter(file => file.name != name))
    }

    return (
        <div>
            {
                files.length == 0 && (
                    <Dropzone onDrop={onDrop} accept={extensions as any} onDragEnter={(_) => setDragging(true)} onDragLeave={(_) => setDragging(false)}>
                        {({ getRootProps, getInputProps }) => (
                            <div className={`w-full py-16 border border-dashed border-gray-700 dark:border-gray-100 px-6 ${dragging ? "bg-blue-100" : ""}`} {...getRootProps()}>
                                <input {...getInputProps()} className="w-full h-full" />
                                <div className="flex flex-row items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 mr-3">
                                        <path fillRule="evenodd" d="M5.5 17a4.5 4.5 0 0 1-1.44-8.765 4.5 4.5 0 0 1 8.302-3.046 3.5 3.5 0 0 1 4.504 4.272A4 4 0 0 1 15 17H5.5Zm3.75-2.75a.75.75 0 0 0 1.5 0V9.66l1.95 2.1a.75.75 0 1 0 1.1-1.02l-3.25-3.5a.75.75 0 0 0-1.1 0l-3.25 3.5a.75.75 0 1 0 1.1 1.02l1.95-2.1v4.59Z" clipRule="evenodd" />
                                    </svg>

                                    <h3 className="font-medium text-lg text-black dark:text-white">
                                        {dragging ? "now drop it!" : `drop an .md file to ${isLoggedIn ? 'update' : 'start'} your blog.`}
                                    </h3>
                                </div>
                            </div>
                        )}
                    </Dropzone>
                )
            }
            {
                files.length > 0 && (
                    <div className="w-full py-4 border border-solid border-gray-400 dark:border-gray-300">
                        <ul className="space-y-4 px-6">
                            {
                                files.map(file =>
                                    <FileEntry file={file} onDelete={() => onRemoveFile(file.name)} />
                                )
                            }
                        </ul>
                    </div>
                )
            }
        </div>
    )
}