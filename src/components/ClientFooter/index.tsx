import webLogoFooter from "../../assets/logo-footer.svg";

export const ClientFooter = () => {
  return (
    <footer className="bg-color-primary">
      <div className="container mx-auto flex justify-between gap-[100px] py-20 text-sm">
        <div className="w-1/3">
          <img src={webLogoFooter} alt="" className="mb-4" />
          <p className="text-text-thirdary">
            Tăng cường khả năng học tập thông qua giáo dục trực tuyến dễ tiếp
            cận và hấp dẫn.
          </p>
          <p className="text-text-thirdary">
            Byway là một nền tảng học trực tuyến hàng đầu, chuyên cung cấp trải
            nghiệm giáo dục chất lượng cao, linh hoạt và giá cả phải chăng.
          </p>
        </div>
        <div className="">
          <div className="mb-2 text-white">Hỗ trợ</div>
          <ul className="text-text-thirdary flex flex-col gap-2">
            <li>Liên hệ</li>
            <li>Bài viết mới nhất</li>
            <li>FAQ</li>
          </ul>
        </div>
        <div>
          <div className="mb-2 text-white">Chương trình học</div>
          <ul className="text-text-thirdary flex flex-col gap-2">
            <li>Thiết kế & Nghệ thuật</li>
            <li>Kinh doanh</li>
            <li>CNTT & Phần mềm</li>
            <li>Ngoại ngữ</li>
            <li>Lập trình</li>
          </ul>
        </div>
        <div>
          <div className="mb-2 text-white">Thông tin liên hệ</div>
          <ul className="text-text-thirdary flex flex-col gap-2">
            <li>Địa chỉ: 123 Main Street, Anytown, CA 12345</li>
            <li>Số điện thoại: +(123) 456-7890</li>
            <li>bywayedu@webkul.in</li>
          </ul>
          {/* <ul className="text-text-thirdary mt-2">
            <li>
              <Facebook />
            </li>
            <li>
              <Github />
            </li>
            <li><Google></li>
            <li>X</li>
            <li>Microsoft</li>
          </ul> */}
        </div>
      </div>
    </footer>
  );
};
