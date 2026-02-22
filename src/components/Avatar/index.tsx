export const Avatar = ({
  url = "https://img.daisyui.com/images/profile/demo/yellingcat@192.webp",
  width = "w-15",
}: {
  url?: string;
  width?: string;
}) => {
  return (
    <div className="avatar">
      <div className={`${width} rounded-full`}>
        <img src={url} />
      </div>
    </div>
  );
};
