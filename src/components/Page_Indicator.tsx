const PageIndicator = ({
  pageCount,
  currentPage,
  className,
}: {
  pageCount: number;
  currentPage: number;
  className: string;
}) => {
  return (
    <ul
      className={`mb-4 flex items-center justify-end gap-1 pr-4 ${className}`}
    >
      {Array(pageCount)
        .fill(0)
        .map((page, index) => (
          <li
            key={index}
            className={`h-[2px] w-3 ${
              currentPage === index ? "bg-gray-100" : "bg-gray-600"
            }`}
          ></li>
        ))}
    </ul>
  );
};

export default PageIndicator;
