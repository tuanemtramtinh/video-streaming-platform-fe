export const AuthForm = () => {
  return (
    <div className="flex flex-1 items-center justify-center">
      <form className="card border-border border shadow-sm">
        <div className="card-body">
          <h2 className="card-title flex justify-center text-2xl font-bold">
            Chào mừng quay trở lại
          </h2>
          <p className="mb-6 flex justify-center text-lg">
            Chào mừng trở lại! Hãy điền thông tin của bạn
          </p>
          <div className="flex flex-col gap-6">
            <input type="text" className="input w-full" placeholder="Email" />
            <input
              type="password"
              className="input w-full"
              placeholder="Mật khẩu"
            />
            <button className="btn btn-neutral btn-lg">Đăng Nhập</button>
          </div>
        </div>
      </form>
    </div>
  );
};
