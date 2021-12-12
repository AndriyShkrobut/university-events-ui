import React, { useState } from "react";
import { Modal, Upload, UploadProps } from "antd";
import { InboxOutlined } from "@ant-design/icons";

function getBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.addEventListener("load", (event) => {
      if (!event.target || !event.target.result) return resolve("");
      const result = event.target.result as string;
      return resolve(result);
    });
    reader.addEventListener("error", (error) => reject(error));

    reader.readAsDataURL(file);
  });
}

type FileUploaderProps = UploadProps & { onChange?: (fileList: UploadProps["fileList"]) => void };

const FileUploader: React.FC<FileUploaderProps> = ({ onChange, ...props }) => {
  const [previewImage, setPreviewImage] = useState<string>("");
  const [isPreviewVisible, setIsPreviewVisible] = useState<boolean>(false);
  const [previewTitle, setPreviewTitle] = useState<string>("");

  const handlePreview: UploadProps["onPreview"] = async (file) => {
    const { preview, url, originFileObj } = file;

    if (!preview && originFileObj) {
      file.preview = await getBase64(originFileObj);
      file.url = file.name;
    }

    if (!preview && url) {
      file.preview = url;
    }

    if (!file.preview || !file.url) return;

    setPreviewImage(file.preview);
    setPreviewTitle(file.url);
    setIsPreviewVisible(true);
  };

  const handleBeforeUpload: UploadProps["beforeUpload"] = (...beforeUploadParams) => {
    if (props.beforeUpload) {
      return props.beforeUpload(...beforeUploadParams);
    }

    return false;
  };

  const handleChange: UploadProps["onChange"] = (event) => {
    if (!onChange) return;

    const fileList = event.fileList;

    onChange(fileList);
  };

  return (
    <React.Fragment>
      <Upload.Dragger
        onPreview={handlePreview}
        beforeUpload={handleBeforeUpload}
        onChange={handleChange}
        {...props}
      >
        <p className={"ant-upload-drag-icon"}>
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">Перетягніть файл сюди</p>
        <p className="ant-upload-hint">(або клікніть)</p>
      </Upload.Dragger>
      <Modal
        visible={isPreviewVisible}
        title={previewTitle}
        footer={null}
        onCancel={() => setIsPreviewVisible(false)}
      >
        <img alt="example" style={{ width: "100%" }} src={previewImage} />
      </Modal>
    </React.Fragment>
  );
};

export default FileUploader;
