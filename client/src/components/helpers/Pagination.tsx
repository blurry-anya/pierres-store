import React, {useState} from "react";
import { BiLeftArrow, BiRightArrow } from "react-icons/bi";

import { PaginationInfo } from "@customTypes/products";

const Pagination = ({
  controls,
  onPageChange,
  onPerPageChange
}: {
  controls: PaginationInfo;
  onPageChange: (page: number) => void;
  onPerPageChange: (page: number) => void
}) => {
  const { currentPage, totalPages, limit } = controls;
  // const [itemsPerPage, setItemsPerPage] = useState(limit)

  const handlePageChange = (page: number) => {
    if (page !== currentPage) {
      onPageChange(page);
    }
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <li key={i}>
          <button
            onClick={() => handlePageChange(i)}
            className={
              Number(currentPage) === i
                ? "active bg-[#FDC175] border-[#A8824F] border-4 font-bold"
                : ""
            }
          >
            {i}
          </button>
        </li>
      );
    }
    return pageNumbers;
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onPerPageChange(Number(event.target.value))
  };

  return (
    <div>
      <ul className='flex justify-center items-center gap-2 w-full p-4'>
        <li>
          <button
            disabled={Number(currentPage) === 1}
            onClick={() => handlePageChange(Number(currentPage) - 1)}
          >
            <BiLeftArrow />
          </button>
        </li>
        {renderPageNumbers()}
        <li>
          <button
            disabled={Number(currentPage) === totalPages}
            onClick={() => handlePageChange(Number(currentPage) + 1)}
          >
            <BiRightArrow />
          </button>
        </li>
      </ul>
      <div>
        <label htmlFor="limit">Per Page:</label>
        <select
          name='category'
          id='category'
          value={limit}
          onChange={handleSelectChange}
          className='border-b border-zinc-600'
        >
          <option value="30">30</option>
          <option value="20">20</option>
          <option value="10">10</option>
          <option value="5">5</option>
        </select>
      </div>
    </div>
  );
};

export default Pagination;
