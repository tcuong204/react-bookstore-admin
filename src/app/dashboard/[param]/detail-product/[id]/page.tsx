"use client";
import axiosInstance from "@/axios/axiosConfig";
import { CustomButton } from "@/utils/CustomButton";
import { InboxOutlined } from "@ant-design/icons";
import { DetailProduct } from "@/utils/ProductUtils";
import {
  Button,
  Checkbox,
  Form,
  FormProps,
  Input,
  message,
  Select,
  Upload,
  UploadProps,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FileUploader } from "react-drag-drop-files";

const onFinishFailed: FormProps<DetailProduct>["onFinishFailed"] = (
  errorInfo
) => {
  console.log("Failed:", errorInfo);
};
const { Dragger } = Upload;

const props: UploadProps = {
  name: "file",
  multiple: true,
  action: "https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload",
  onChange(info) {
    const { status } = info.file;
    if (status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (status === "done") {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
  onDrop(e) {
    console.log("Dropped files", e.dataTransfer.files);
  },
};
export default function UpdateProduct() {
  const router = useRouter();
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm();
  const pathname = usePathname();
  const [product, setProduct] = useState<DetailProduct>();
  const getProduct = async () => {
    const res = await axiosInstance.get(
      "/get-product-details?id=" + pathname.split("/").pop()
    );
    const userData = res.data.product;
    setProduct(userData);
    form.setFieldsValue({
      id: product?.id,
      name: product?.name,
      author: product?.author,
      supplier: product?.supplier,
      publisher: product?.publisher,
      bookLayout: product?.bookLayout,
      price: product?.price,
      originalPrice: product?.originalPrice,
      productCode: product?.productCode,
      publishYear: product?.publishYear,
      language: product?.language,
      weight: product?.weight,
      size: product?.size,
      quantityOfPages: product?.quantityOfPages,
      quantityAvailable: product?.quantityOfPages,
      description: product?.description,
    });
  };
  const onFinish: FormProps<DetailProduct>["onFinish"] = async (values) => {
    try {
      const res = await axiosInstance.post("/update-product", values);
      console.log(res);

      if (res.status === 200) {
        messageApi.success("Sửa sản phẩm thành công");
        form.resetFields();
        setTimeout(() => {
          router.back();
        }, 1000);
      } else {
        messageApi.error("Sửa sản phẩm không thành công");
      }
    } catch {
    } finally {
    }
  };
  useEffect(() => {
    getProduct();
  });
  return (
    <div className="p-4">
      <div className="p-4 bg-[#fff]">
        <div className="flex">
          <Form
            form={form}
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            layout="vertical"
            className="w-[60%]"
          >
            <div className="grid grid-cols-2">
              <Form.Item<DetailProduct>
                label="Tên sản phẩm"
                name="name"
                rules={[{ required: true, message: "Vui lòng nhập tên!" }]}
              >
                <Input disabled />
              </Form.Item>

              <Form.Item<DetailProduct>
                label="Tác giả"
                name="author"
                rules={[{ required: true, message: "Vui lòng nhập tác giả!" }]}
              >
                <Input disabled />
              </Form.Item>
              <Form.Item<DetailProduct> label="Nhà cung cấp" name="supplier">
                <Input disabled />
              </Form.Item>
              <Form.Item<DetailProduct> label="NXB" name="publisher">
                <Input disabled />
              </Form.Item>
              <Form.Item<DetailProduct> label="Giá ban đầu" name="price">
                <Input disabled />
              </Form.Item>
              <Form.Item<DetailProduct>
                label="Giá khuyến mại"
                name="originalPrice"
              >
                <Input disabled />
              </Form.Item>
              <Form.Item<DetailProduct> label="Mã sản phẩm" name="productCode">
                <Input disabled />
              </Form.Item>
              <Form.Item<DetailProduct>
                label="Năm phát hành"
                name="publishYear"
              >
                <Input disabled />
              </Form.Item>

              <Form.Item<DetailProduct> label="Trọng lượng" name="weight">
                <Input disabled />
              </Form.Item>
              <Form.Item<DetailProduct> label="Kích thước" name="size">
                <Input disabled />
              </Form.Item>
              <Form.Item<DetailProduct> label="Số trang" name="quantityOfPages">
                <Input disabled />
              </Form.Item>
              <Form.Item<DetailProduct>
                label="Số lượng"
                name="quantityAvailable"
              >
                <Input disabled />
              </Form.Item>
            </div>
            <Form.Item<DetailProduct> label="Mô tả" name="description">
              <TextArea rows={4} disabled />
            </Form.Item>
            <Form.Item label={null} className="ml-[50%]">
              <CustomButton
                className=""
                onClick={() => router.back()}
                buttonText="Quay lại"
                buttonType="default"
                disabled={false}
                htmlType="button"
              />
            </Form.Item>
          </Form>
          {/* <div>
            <Dragger {...props}>
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">
                Click or drag file to this area to upload
              </p>
              <p className="ant-upload-hint">
                Support for a single or bulk upload. Strictly prohibited from
                uploading company data or other banned files.
              </p>
            </Dragger>
          </div> */}
        </div>
      </div>
      {contextHolder}
    </div>
  );
}
