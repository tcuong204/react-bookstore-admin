"use client";
import { CustomButton } from "@/utils/CustomButton";
import {
  getProductbyPage,
  Product,
  ProductResponse,
} from "@/utils/ProductUtils";
import { UserManager } from "@/utils/UserUtils";
import {
  DeleteOutlined,
  EditOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import { ConfigProvider, Pagination, Space, Table } from "antd";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
const { Column, ColumnGroup } = Table;
export default function ManageProducts() {
  const [product, setProduct] = useState<ProductResponse | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const router = useRouter();
  const getProducts = async () => {
    const data = await getProductbyPage(currentPage);
    if (data) {
      setProduct(data);
    }
  };
  useEffect(() => {
    getProducts();
  }, [currentPage]);
  console.log(product?.products);
  console.log(product?.pagination.totalPages);

  return (
    <div className="p-4 ">
      <div className="m-4 bg-[#fff] rounded-lg">
        <div className="">
          <div className="flex justify-end p-4">
            <CustomButton
              className="w-[20%]"
              onClick={() => router.push("manage-products/create-product")}
              buttonText="Thêm sản phẩm"
              buttonType="primary"
              disabled={false}
              htmlType="button"
            />
          </div>
          <ConfigProvider
            theme={{
              token: { colorPrimary: "#C62027", colorLinkHover: "#C62027" },
              components: { Table: { rowSelectedHoverBg: "#C62027" } },
            }}
          >
            <Table<Product>
              dataSource={product?.products}
              rowKey="id"
              pagination={false}
            >
              <Column title="Id" dataIndex="id" key="id" />
              <Column title="Tên" dataIndex="name" key="name" />
              <Column
                title="Ảnh"
                key="image"
                render={(_: any, record: Product) => (
                  <Space size="middle">
                    <img src={record.image} width={60}></img>
                  </Space>
                )}
              />
              <Column
                title="Giá ban đầu"
                dataIndex="originalPrice"
                key="originalPrice"
                render={(_: any, record: Product) => (
                  <Space size="middle">
                    <p>{record.originalPrice.toLocaleString("en-US")}</p>
                  </Space>
                )}
              />
              <Column
                title="Giá khuyến mại"
                dataIndex="price"
                key="price"
                render={(_: any, record: Product) => (
                  <Space size="middle">
                    <p>{record.price.toLocaleString("en-US")}</p>
                  </Space>
                )}
              />
              <Column
                title="Số lượng còn"
                dataIndex="quantityAvailable"
                key="quantityAvailable"
              />
              <Column
                title=""
                key="action"
                render={(_: any, record: Product) => (
                  <Space size="middle">
                    <a>
                      <DeleteOutlined />
                    </a>
                  </Space>
                )}
              />
              <Column
                title=""
                key="action"
                render={(_: any, record: Product) => (
                  <Space size="middle">
                    <a
                      onClick={() =>
                        router.push(
                          `manage-products/update-product/${record.id}`
                        )
                      }
                    >
                      <EditOutlined />
                    </a>
                  </Space>
                )}
              />
              <Column
                title=""
                key="action"
                render={(_: any, record: Product) => (
                  <Space size="middle">
                    <a
                      onClick={() =>
                        router.push(
                          `manage-products/detail-product/${record.id}`
                        )
                      }
                    >
                      <InfoCircleOutlined />
                    </a>
                  </Space>
                )}
              />
            </Table>
            <div className="p-4">
              <Pagination
                align="end"
                defaultCurrent={1}
                pageSize={product?.pagination.totalPages}
                total={product?.pagination?.totalItems}
                onChange={(e) => setCurrentPage(e)}
              />
            </div>
          </ConfigProvider>
        </div>
      </div>
    </div>
  );
}
