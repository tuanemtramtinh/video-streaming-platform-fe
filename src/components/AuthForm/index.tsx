import { useLogin } from "@/hooks/useLogin";
import { useRegister } from "@/hooks/useRegister";
import { Eye, EyeClosed, LogIn } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";

export const AuthForm = ({ type }: { type: "login" | "register" }) => {
  const { mutate: login } = useLogin();
  const { mutate: register } = useRegister();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(true);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showConfirmPassword, setShowConfirmPassword] = useState(true);

  const handleLogin = () => {
    if (!email || !password) {
      toast.error("Vui lòng điền đầy đủ các trường");
      return;
    }

    login({ email, password });
  };

  const handleRegister = () => {
    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      toast.error("Vui lòng điền đầy đủ các trường");
      return;
    }

    register({ firstName, lastName, email, password, confirmPassword });
  };

  return (
    <div className="flex flex-1 items-center justify-center p-20">
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
            <label className="input w-full">
              <input
                type={showPassword ? "password" : "text"}
                placeholder="Mật khẩu"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div
                onClick={() => setShowPassword(!showPassword)}
                className="cursor-pointer"
              >
                {showPassword ? <Eye /> : <EyeClosed />}
              </div>
            </label>
            {type === "register" && (
              <label className="input w-full">
                <input
                  type={showConfirmPassword ? "password" : "text"}
                  placeholder="Xác nhận mật khẩu"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <div
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="cursor-pointer"
                >
                  {showConfirmPassword ? <Eye /> : <EyeClosed />}
                </div>
              </label>
            )}
            <button
              className="btn btn-neutral btn-lg"
              onClick={(e) => {
                e.preventDefault();
                if (type === "login") handleLogin();
                else handleRegister();
              }}
            >
              {type === "login" ? "Đăng Nhập" : "Đăng Ký"}
              <LogIn />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
