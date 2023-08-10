'use client';
import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { getSignature, saveToDatabase } from '@/lib/utils';
import { toast } from 'react-hot-toast';
import { ArrowUpTrayIcon, XMarkIcon } from '@heroicons/react/24/solid';

export default function MyDropZone() {
    const [files, setFiles] = useState([]);
    const [rejected, setRejected] = useState([]);

    const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
        if (acceptedFiles?.length) {
            setFiles(previousFiles => [
                // If allowing multiple files
                // ...previousFiles,
                ...acceptedFiles.map(file =>
                    Object.assign(file, { preview: URL.createObjectURL(file) })
                )
            ])
        }

        if (rejectedFiles?.length) {
            setRejected(previousFiles => [...previousFiles, ...rejectedFiles])
        }
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        accept: {
            'image/*': []
        },
        maxSize: 1024 * 1000,
        maxFiles: 1,
        onDrop
    });

    useEffect(() => {
        // Revoke the data uris to avoid memory leaks
        return () => files.forEach(file => URL.revokeObjectURL(file.preview));
    }, [files]);

    function removeFile(name) {
        setFiles(files => files.filter(file => file.name !== name));
    }

    function removeAll() {
        setFiles([]);
        setRejected([]);
    }

    function removeRejected(name) {
        setRejected(files => files.filter(({ file }) => file.name !== name));
    }

    async function action(e) {
        e.preventDefault();
        const file = files[0];
        if (!file) return;
        
        // get a signature using server action
        const { timestamp, signature } = await getSignature();

        // upload to cloudinary using the signature
        const formData = new FormData();

        formData.append('file', file);
        formData.append('api_key', process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY);
        formData.append('signature', signature);
        formData.append('timestamp', timestamp);
        formData.append('folder', 'next');

        const endpoint = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_URL;

        const data = await fetch(endpoint, {
            method: 'POST',
            body: formData
        })
        .then(res => res.json())
        .catch(error => {
            toast.error(error);
        })
        .then(cb => {
            toast.success(`Image has uploaded successfully.`);
            setFiles([]);
        });

        // write to database using server actions
        await saveToDatabase({
            version: data?.version,
            signature: data?.signature,
            public_id: data?.public_id
        });
    }

    return (
        <form onSubmit={action}>
            <div {...getRootProps()} className="border rounded-md border-gray-300 p-16">
                <input {...getInputProps({ name: 'file' })} />
                <div className='flex flex-col items-center justify-center gap-4'>
                    <ArrowUpTrayIcon className='h-5 w-5 fill-current' />
                    {isDragActive ? (
                        <p>Drop the image here.</p>
                    ) : (
                        <p>Drag & drop image here, or click to select image.</p>
                    )}
                </div>
            </div>
            {files.length > 0 && (
            <div className="dropzone-preview mt-3">
                <div className="flex gap-4">
                    <button
                        type="button"
                        onClick={removeAll}
                        className="mt-1 rounded-md border border-rose-400 px-3 text-[12px] font-bold uppercase 
                            tracking-wider text-stone-500 transition-colors hover:bg-rose-400 hover:text-white">
                        Remove all files
                    </button>
                    <button
                        type="submit"
                        className="ml-auto inline-flex justify-center rounded-md border 
                            py-[calc(theme(spacing.2)-1px)] px-[calc(theme(spacing.3)-1px)] text-sm 
                            bg-gray-100 hover:bg-gray-200 border-gray-300
                            transition-colors duration-200">
                        Upload to Cloudinary
                    </button>
                </div>

                {/* Accepted files */}
                <div>
                    <label className="mt-6 border-b border-gray-300 pb-3 block font-bold mb-1">
                        Accepted Files
                    </label>
                    <ul className="mt-1 grid grid-cols-1 gap-10 sm:grid-cols-2 
                        md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
                        {files.map(file => (
                            <li key={file.name} className="marker:relative h-32 rounded-md shadow-lg mb-12">
                                <Image
                                    src={file.preview}
                                    alt={file.name}
                                    width={100}
                                    height={100}
                                    onLoad={() => {
                                        URL.revokeObjectURL(file.preview)
                                    }}
                                    className="h-full w-full rounded-md object-contain"
                                />
                                <button
                                    type="button"
                                    className="absolute -right-3 -top-3 flex h-7 w-7 items-center justify-center 
                                        rounded-full border border-rose-400 bg-rose-400 transition-colors hover:bg-white"
                                    onClick={() => removeFile(file.name)}>
                                    <XMarkIcon className="h-5 w-5 fill-white transition-colors hover:fill-rose-400" />
                                </button>
                                <p className="mt-2 text-[12px] 
                                    font-medium text-stone-500">
                                    {file.name}
                                </p>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Rejected Files */}
                {rejected?.length > 0 && (
                    <div>
                        <label className="mt-16 border-b border-gray-300 pb-3 block font-bold mb-1">
                        Rejected Files
                        </label>
                        <ul className="mt-1 flex flex-col">
                            {rejected.map(({ file, errors }) => (
                                <li key={file.name} className="flex items-start justify-between">
                                    <div>
                                        <p className="mt-2 text-sm font-medium text-stone-500">
                                            {file.name}
                                        </p>
                                        <ul className="text-[12px] text-red-400">
                                            {errors.map(error => (
                                                <li key={error.code}>{error.message}</li>
                                            ))}
                                        </ul>
                                    </div>
                                    <button
                                        type="button"
                                        className="mt-2 rounded-md border border-rose-400 px-3 py-1 text-[12px] font-bold uppercase 
                                        tracking-wider text-stone-500 transition-colors hover:bg-rose-400 hover:text-white"
                                        onClick={() => removeRejected(file.name)}>
                                        remove
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

            </div>
            )}
        </form>
    )
}