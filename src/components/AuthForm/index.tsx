import { useLogin } from "@/hooks/useLogin";
import { useRegister } from "@/hooks/useRegister";
import { useState } from "react";
import { useNavigate } from "react-router";

export const AuthForm = ({ type }: { type: "login" | "register" }) => {
  const { mutate: login } = useLogin();
  const { mutate: register } = useRegister();
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    login({ email, password });
  };

  const handleRegister = () => {
    register({ firstName, lastName, email, password });
    setEmail("");
    setPassword("");
    navigate("/login");
  };

  return (
    <div className="flex flex-1 items-center justify-center">
      <form className="card border-border w-1/4 border shadow-lg">
        <div className="card-body">
          <h2 className="card-title flex justify-center text-2xl font-bold">
            {type === "login"
              ? "Chào mừng quay trở lại"
              : "Đăng ký và bắt đầu học"}
          </h2>
          <p className="mb-6 flex justify-center text-center text-lg">
            {type === "login"
              ? "Chào mừng trở lại! Hãy điền thông tin của bạn"
              : "Tạo tài khoản miễn phí của bạn"}
          </p>
          <div className="flex flex-col gap-6">
            {type === "register" && (
              <input
                type="text"
                className="input w-full"
                placeholder="Họ"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            )}
            {type === "register" && (
              <input
                type="text"
                className="input w-full"
                placeholder="Tên và tên đệm"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            )}
            <input
              type="email"
              className="input w-full"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              className="input w-full"
              placeholder="Mật khẩu"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              className="btn btn-neutral btn-lg"
              onClick={(e) => {
                e.preventDefault();
                if (type === "login") handleLogin();
                else handleRegister();
              }}
            >
              {type === "login" ? "Đăng Nhập" : "Đăng Ký"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
