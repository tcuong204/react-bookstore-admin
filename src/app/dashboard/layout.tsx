"use client";
import Link from "next/link";
import { useParams, usePathname, useRouter } from "next/navigation";
import {
  BookOutlined,
  CheckSquareOutlined,
  CreditCardOutlined,
  ExportOutlined,
  LoginOutlined,
  ProductOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Divider, Modal } from "antd";
import { createContext, useContext, useEffect, useState } from "react";
import { getUser, logout, User } from "@/utils/Auth";
import { CustomButton } from "@/utils/CustomButton";
const rightMenuLabel = [
  { name: "Thêm tài khoản", url: "create-user" },
  { name: "Sửa tài khoản", url: "update-user" },
  { name: "Thêm sản phẩm", url: "create-product" },
  { name: "Sửa sản phẩm", url: "update-product" },
  { name: "Thêm banner", url: "create-banner" },
  { name: "Sửa banner", url: "update-banner" },
  { name: "Thêm import", url: "create-import" },
  { name: "Sửa import", url: "update-import" },
];
const listMenuLeft = [
  {
    img: <UserOutlined />,
    name: "Quản lí tài khoản",
    url: "manage-accounts",
  },
  {
    img: <BookOutlined />,
    name: "Quản lí sản phẩm",
    url: "manage-products",
  },
  {
    img: <CheckSquareOutlined />,
    name: "Quản lí banner",
    url: "manage-banners",
  },
  {
    img: <CreditCardOutlined />,
    name: "Đơn hàng",
    url: "manage-orders",
  },
  {
    img: <ExportOutlined />,
    name: "Nhập hàng",
    url: "import-product",
  },
];
export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathnames = usePathname();
  const pathname = pathnames.split("/").pop();
  const [user, setUser] = useState<User | null>(null);

  const [isModalOpen, setIsModalOpen] = useState<true | false>(false);
  const [isAnimating, setIsAnimating] = useState<true | false>(false);
  const router = useRouter();
  const showModal = () => {
    setIsAnimating(true); // Bắt đầu animation mở
    setIsModalOpen(true);
  };
  const getRelevantPathSegment = (path: string) => {
    const segments = path.split("/");
    const lastSegment = segments[segments.length - 1];

    // Kiểm tra nếu đoạn cuối là số, lấy đoạn kế trước
    if (!isNaN(Number(lastSegment))) {
      return segments[segments.length - 2];
    }
    return lastSegment;
  };

  // Hàm tìm giá trị name tương ứng
  const findNameByPath = (path: string) => {
    const relevantSegment = getRelevantPathSegment(path);
    const match = rightMenuLabel.find((item) => item.url === relevantSegment);
    return match?.name || "";
  };

  const getNameMenu = (text: string) => {
    // pathnames.indexOf()
  };
  const closeModal = () => {
    setIsAnimating(false); // Kích hoạt animation đóng
    setTimeout(() => setIsModalOpen(false), 300); // Chờ animation kết thúc (0.3s)
  };
  const getActiveText = (currentPage: string) =>
    pathname.indexOf(currentPage) >= 0 ? true : false;
  const getActiveImg = (currentPage: string) =>
    pathname.indexOf(currentPage) >= 0 ? "-active" : "";
  const onClick = () => (pathname === "/" ? "-active" : "");
  const handleConFirm = () => {
    logout();
    closeModal();
    router.push("/");
  };
  const getDetailUser = async () => {
    const data = await getUser();
    if (data) {
      setUser(data);
    }
  };
  useEffect(() => {
    getDetailUser();
  }, []);
  return (
    <main>
      <div className="flex">
        <div className="w-[20%]">
          <div className="relative flex h-full flex-col justify-between">
            <div className="sideMenu">
              <Link href={"/dashboard"}>
                <div className="logo ml-[26px] mt-[20px] flex items-center font-semibold">
                  <span className="font-manrope leading-[34.50px] text-[px] text-indigo-950">
                    Book Store
                  </span>
                </div>
              </Link>
              <div className="menuList mt-[40px]">
                <Link href="/dashboard">
                  <div className="dashboard">
                    <div
                      className={`text-[#737791] ${
                        pathname === "dashboard" &&
                        "bg-[#C62027] font-semibold !text-white shadow"
                      } inline-flex h-[64px] w-full items-center justify-start px-6 py-4 custom:gap-6`}
                    >
                      <div>
                        <ProductOutlined />
                      </div>
                      <div className="font-manrope text-[1rem] ml-[1rem]">
                        Dashboard
                      </div>
                    </div>
                  </div>
                </Link>
                {listMenuLeft.map((menu, index) => (
                  <div key={index}>
                    <Link href={`/dashboard/${menu.url}`}>
                      <div className="dashbroad font-manrope flex">
                        <div
                          className={`text-[#737791] ${
                            getActiveText(menu.url) &&
                            "bg-[#C62027] font-semibold !text-white shadow"
                          } inline-flex h-[64px] w-full items-center justify-start px-6 py-2 custom:gap-6 flex`}
                        >
                          <div className="">{menu.img}</div>
                          <div className="font-manrope text-[1rem] ml-[1rem]">
                            {menu.name}
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
                <div className="dashbroad">
                  <div className="border-b border-gray-border pb-3"></div>
                  <div
                    className={`mb-3 inline-flex h-[64px] w-full cursor-pointer items-center px-8 py-2 text-[#737791] custom:gap-4`}
                    onClick={showModal}
                  >
                    <div className="relative h-7 w-8">
                      <LoginOutlined />
                    </div>
                    <div className="font-manrope text-[1rem]">Đăng xuất</div>
                  </div>
                </div>
              </div>
            </div>
            <div></div>
          </div>
        </div>
        <div className="w-[80%]">
          <div className="bg-[#fff] flex justify-between">
            <div className="text-[1.5rem] text-indigo-950 p-5">
              {pathname === "dashboard" ? (
                <b>Trang chủ</b>
              ) : (
                (() => {
                  const match = listMenuLeft.find(
                    (menu) => menu.url === pathname
                  );
                  if (match) {
                    return <b>{match.name}</b>; // Nếu tìm thấy trong listMenuLeft
                  } else {
                    const additionalName = findNameByPath(pathnames); // Gọi hàm findNameByPath
                    return <b>{additionalName}</b>; // Kết quả từ hàm findNameByPath
                  }
                })()
              )}
            </div>
            <div className="p-5">
              <div className="flex justify-center">
                <UserOutlined />
              </div>
              {user?.firstName ? user?.firstName : ""}
            </div>
          </div>
          <div className="bg-[#ccc] min-h-[720px] w-full">{children}</div>
        </div>
      </div>
      {isModalOpen && (
        <div
          className={`modal-mask ${isAnimating ? "modal-mask-active" : ""}`}
          onClick={closeModal}
        >
          <div
            className={`modal-content ${
              isAnimating ? "modal-enter-active" : "modal-exit-active"
            }`}
          >
            <div className="flex  justify-center items-center h-full">
              <div className="bg-[#fff] w-[400px]">
                <div className="p-4 flex justify-center">
                  <b className="text-[20px]">Đăng xuất</b>
                </div>
                <Divider style={{ margin: 0 }} />
                <div className="h-[60px] flex justify-center items-center">
                  <p>Bạn có chắc chắn muốn đăng xuất</p>
                </div>
                <div
                  className="p-4"
                  style={{
                    display: "flex",
                    gap: "10px",
                    marginTop: "20px",
                    justifyContent: "center",
                  }}
                >
                  <button className="button-cancel" onClick={closeModal}>
                    Hủy
                  </button>
                  <button className="button-confirm" onClick={handleConFirm}>
                    Xác nhận
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal Content */}
    </main>
  );
}
