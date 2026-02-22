export const CourseDetailSectionList = () => {
  return (
    <div className="join join-vertical w-full">
      <div className="join-item border-border collapse-arrow collapse border">
        <input type="checkbox" name="my-accordion-1" defaultChecked />
        <div className="collapse-title font-semibold">
          <div className="flex items-center justify-between">
            <h3 className="text-color-primary text-lg font-semibold">
              Introduction to UX Design
            </h3>
            <div className="text-text-secondary text-sm font-normal">
              <span className="mr-4">5 Bài học</span>
              <span>1 Giờ</span>
            </div>
          </div>
        </div>
        <div className="collapse-content text-sm">
          Click the "Sign Up" button in the top right corner and follow the
          registration process.
        </div>
      </div>
      <div className="join-item border-border collapse-arrow collapse border">
        <input type="checkbox" name="my-accordion-1" />
        <div className="collapse-title font-semibold">
          <div className="flex items-center justify-between">
            <h3 className="text-color-primary text-lg font-semibold">
              Basics of User-Centered Design
            </h3>
            <div className="text-text-secondary text-sm font-normal">
              <span className="mr-4">5 Bài học</span>
              <span>1 Giờ</span>
            </div>
          </div>
        </div>
        <div className="collapse-content text-sm">
          Click on "Forgot Password" on the login page and follow the
          instructions sent to your email.
        </div>
      </div>
      <div className="join-item border-border collapse-arrow collapse border">
        <input type="checkbox" name="my-accordion-1" />
        <div className="collapse-title font-semibold">
          <div className="flex items-center justify-between">
            <h3 className="text-color-primary text-lg font-semibold">
              Elements of User Experience
            </h3>
            <div className="text-text-secondary text-sm font-normal">
              <span className="mr-4">5 Bài học</span>
              <span>1 Giờ</span>
            </div>
          </div>
        </div>
        <div className="collapse-content text-sm">
          Go to "My Account" settings and select "Edit Profile" to make changes.
        </div>
      </div>
    </div>
  );
};
