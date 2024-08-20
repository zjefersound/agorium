import clsx from "clsx";
import React, { forwardRef, LegacyRef, ReactNode, useState } from "react";
import { MdOutlineAttachment, MdOutlineDeleteOutline } from "react-icons/md";
import { printFileSize } from "../../utils/printFileSize";
import { Slot } from "@radix-ui/react-slot";

export interface UploadedFile {
  name: string;
  size: number;
  type: string;
  dataURL: string;
}

interface FileInputRootProps {
  disabled?: boolean;
  className?: string;
  children: ReactNode;
}
// eslint-disable-next-line react-refresh/only-export-components
function FileInputRoot({ disabled, children, className }: FileInputRootProps) {
  return (
    <div
      className={clsx("w-full", className, {
        "opacity-50 pointer-events-none": disabled,
      })}
    >
      {children}
    </div>
  );
}
FileInputRoot.displayName = "FileInput.Root";

interface FileInputDropzoneProps {
  className?: string;
  borderColor?: "danger" | "success";
  children?: ReactNode;
  height?: number;
  width?: number;
}
// eslint-disable-next-line react-refresh/only-export-components
function FileInputDropzone({
  borderColor,
  className,
  height,
  width,
  children,
}: FileInputDropzoneProps) {
  return (
    <div
      style={{
        width, // Will always set width
        height: !width ? height : undefined, // Will set fixed height if there's NO width
        aspectRatio: height && width ? `${width} / ${height}` : undefined, // Will set height if there IS width
      }}
      className={clsx(
        "relative focus-within:ring-2 rounded-md overflow-hidden max-w-full",
        {
          "focus-within:ring-slate-500": !borderColor,
          "[&>*>*]:border-red-600": borderColor === "danger",
          "[&>*>*]:border-emerald-600": borderColor === "success",
        },
        className
      )}
    >
      {children}
    </div>
  );
}
FileInputDropzone.displayName = "FileInput.Dropzone";

interface FileInputInputProps {
  name: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  files: UploadedFile[];
  onFilesChange: (files: UploadedFile[]) => void;
  maxFileSize?: number; // in bytes
  allowedFileTypes?: string[];
}
// eslint-disable-next-line react-refresh/only-export-components
function FileInputInput({
  name,
  placeholder,
  required,
  disabled,
  files,
  onFilesChange,
  allowedFileTypes,
  maxFileSize,
}: FileInputInputProps) {
  const [isDragActive, setIsDragActive] = useState(false);

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
      e.dataTransfer.clearData();
    }
  };

  const handleFiles = (inputFiles: FileList) => {
    const fileArray = Array.from(inputFiles).map((file) => ({
      name: file.name,
      size: file.size,
      type: file.type,
      dataURL: URL.createObjectURL(file),
    }));

    const validatedFiles = fileArray.filter((file) => {
      if (maxFileSize && file.size > maxFileSize) {
        console.error(
          `File ${file.name} exceeds the maximum size of ${maxFileSize} bytes`
        );
        return false;
      }
      return true;
    });

    const updatedFiles = [...files, ...validatedFiles];
    onFilesChange && onFilesChange(updatedFiles);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(e.target.files);
    }
  };

  return (
    <label htmlFor={name} className="h-full w-full">
      <div
        className={clsx(
          "h-full w-full flex items-center justify-center p-4 rounded-md border-2 border-dashed transition-colors",
          {
            "hover:bg-slate-100": !disabled,
            "cursor-not-allowed": disabled,
            "border-slate-500 bg-slate-200": isDragActive,
            "border-slate-300 bg-white": !isDragActive,
          }
        )}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragEnter}
        onDrop={handleDrop}
      >
        <input
          id={name}
          name={name}
          type="file"
          multiple
          className={clsx(
            "w-full h-full left-0 top-0 absolute flex -z-10 outline-0",
            { "opacity-0": disabled }
          )}
          onChange={handleInputChange}
          aria-describedby="selected-files"
          required={required}
          disabled={disabled}
          accept={allowedFileTypes?.join("|") ?? ""}
        />
        <p className="text-center text-slate-500">
          {placeholder || "Drag & drop files here, or click to select files"}
        </p>
      </div>
    </label>
  );
}
FileInputInput.displayName = "FileInput.Input";

interface FileInputListProps {
  files: UploadedFile[];
  disabled?: boolean;
  onFilesChange: (files: UploadedFile[]) => void;
  onFileRemove?: (file: UploadedFile) => void;
}
// eslint-disable-next-line react-refresh/only-export-components
function FileInputList({
  files,
  disabled,
  onFilesChange,
  onFileRemove,
}: FileInputListProps) {
  const handleFileRemove = (file: UploadedFile) => {
    const filteredFiles = files.filter((f) => f !== file);
    onFilesChange(filteredFiles);
    onFileRemove && onFileRemove(file);
  };
  return (
    <ul className="mt-4" id="selected-files">
      {files.map((file, index) => (
        <li
          key={index}
          className="flex p-2 space-x-2 border-b border-slate-200"
        >
          <span className="font-medium text-slate-500">
            <MdOutlineAttachment className="size-5" />
          </span>
          <span className="font-medium flex-1 text-sm text-slate-900">
            {file.name}
          </span>
          <span className="text-sm text-slate-500">
            {printFileSize(file.size)}
          </span>
          <button
            disabled={disabled}
            type="button"
            className={clsx(
              "size-6 rounded-full flex items-center justify-center",
              "text-red-600 hover:bg-red-100 active:text-red-700"
            )}
            aria-label="Remove file"
            onClick={() => handleFileRemove(file)}
          >
            <MdOutlineDeleteOutline className=" size-5" />
          </button>
        </li>
      ))}
    </ul>
  );
}
FileInputList.displayName = "FileInput.List";

interface FileInputPreviewProps {
  visible?: boolean;
  disabled?: boolean;
  children: ReactNode;
  onRemove: () => void;
}
// eslint-disable-next-line react-refresh/only-export-components
function FileInputPreview({
  visible = true,
  disabled,
  onRemove,
  children,
}: FileInputPreviewProps) {
  if (!visible) return null;
  return (
    <>
      <Slot className="h-full w-full absolute left-0 top-0 object-cover">
        {children}
      </Slot>
      <button
        disabled={disabled}
        onClick={onRemove}
        className={clsx(
          "h-full w-full absolute left-0 top-0 flex items-center justify-center opacity-0 hover:opacity-100 z-10",
          "bg-[#0006] text-white"
        )}
      >
        <MdOutlineDeleteOutline className="size-6" />
        <span>Remove</span>
      </button>
    </>
  );
}
FileInputPreview.displayName = "FileInput.Preview";

interface FileInputFilePreviewProps {
  file: UploadedFile;
}

// eslint-disable-next-line react-refresh/only-export-components
const FileInputFilePreview = forwardRef(
  ({ file }: FileInputFilePreviewProps, forwardedRef) => {
    if (file.type.startsWith("image/")) {
      return (
        <img
          className="w-full h-full absolute top-0 left-0 object-cover"
          src={file.dataURL}
          alt={file.name}
          ref={forwardedRef as LegacyRef<HTMLImageElement>}
        />
      );
    }
    if (file.type.startsWith("video/")) {
      return (
        <video
          className="w-full h-full absolute top-0 left-0 object-cover"
          controls
        >
          <source src={file.dataURL} type={file.type} />
          Your browser does not support the video tag.
        </video>
      );
    }
    if (file.type.startsWith("audio/")) {
      return (
        <audio
          className="w-full h-full absolute top-0 left-0 object-cover"
          controls
        >
          <source src={file.dataURL} type={file.type} />
          Your browser does not support the audio element.
        </audio>
      );
    }
    return (
      <div className="w-full h-full absolute top-0 left-0 object-cover flex items-center justify-center bg-slate-100 text-slate-500">
        <span className="text-sm">{file.name}</span>
      </div>
    );
  }
);
FileInputFilePreview.displayName = "FileInput.FilePreview";

export const FileInput = {
  Root: FileInputRoot,
  Dropzone: FileInputDropzone,
  Input: FileInputInput,
  Preview: FileInputPreview,
  FilePreview: FileInputFilePreview,
  List: FileInputList,
};
