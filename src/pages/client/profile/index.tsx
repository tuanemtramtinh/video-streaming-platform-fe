import { useUpdateMyProfile } from "@/hooks/useUpdateMyProfile";
import { useAuthStore } from "@/stores/useAuthStore";
import { useEffect, useState } from "react";

export default function ProfilePage() {
  const user = useAuthStore((state) => state.user);
  const { mutate: updateProfile, isPending } = useUpdateMyProfile();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  useEffect(() => {
    if (user) {
      setFirstName(user.firstName);
      setLastName(user.lastName);
    }
  }, [user]);

  const hasChanges =
    firstName !== user?.firstName || lastName !== user?.lastName;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const payload: { firstName?: string; lastName?: string } = {};
    if (firstName !== user?.firstName) payload.firstName = firstName;
    if (lastName !== user?.lastName) payload.lastName = lastName;

    updateProfile(payload);
  };

  return (
    <div className="container mx-auto py-10">
      <div className="mx-auto max-w-lg">
        <h2 className="mb-1 text-2xl font-bold">Hồ sơ của tôi</h2>
        <p className="text-text-secondary mb-8">
          Cập nhật thông tin cá nhân của bạn
        </p>

        <div className="card border-border border shadow-sm">
          <div className="card-body gap-6">
            <div className="flex items-center gap-4">
              <div className="avatar">
                <div className="w-16 rounded-full">
                  <img
                    src={`https://ui-avatars.com/api/?name=${user?.firstName}+${user?.lastName}&size=64`}
                    alt="avatar"
                  />
                </div>
              </div>
              <div>
                <div className="font-semibold">
                  {user?.firstName} {user?.lastName}
                </div>
                <div className="text-text-secondary text-sm">{user?.email}</div>
              </div>
            </div>

            <div className="divider my-0" />

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="flex gap-4">
                <label className="flex w-full flex-col gap-1">
                  <span className="text-text-secondary text-sm font-medium">
                    Họ <span className="text-error">*</span>
                  </span>
                  <input
                    type="text"
                    className="input input-bordered w-full"
                    placeholder="Họ"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </label>

                <label className="flex w-full flex-col gap-1">
                  <span className="text-text-secondary text-sm font-medium">
                    Tên <span className="text-error">*</span>
                  </span>
                  <input
                    type="text"
                    className="input input-bordered w-full"
                    placeholder="Tên"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </label>
              </div>

              <label className="flex flex-col gap-1">
                <span className="text-text-secondary text-sm font-medium">
                  Email
                </span>
                <input
                  type="email"
                  className="input input-bordered w-full"
                  value={user?.email ?? ""}
                  disabled
                />
              </label>

              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  className="btn btn-neutral"
                  disabled={isPending || !hasChanges}
                >
                  {isPending ? (
                    <span className="loading loading-spinner loading-sm" />
                  ) : (
                    "Lưu thay đổi"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
