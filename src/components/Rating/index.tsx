export const Rating = ({ rating = 5 }: { rating: number }) => {
  return (
    <div className="rating">
      {Array.from({ length: 5 }, (_, index) => (
        <div
          key={index}
          className="mask mask-star bg-orange-400"
          aria-label={`${index + 1} star`}
          aria-current={index + 1 === rating}
        ></div>
      ))}
    </div>
  );
};
