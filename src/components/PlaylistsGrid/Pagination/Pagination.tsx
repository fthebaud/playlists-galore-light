import React, { useCallback } from 'react';
import ReactPaginate from 'react-paginate';
import { useNavigate, useParams } from 'react-router-dom';
import { useTabsInfo } from '@/hooks/useTabsInfo';
import { Tab } from '@/types';
import styled from 'styled-components';

const PaginationPlaceholder = styled.div`
  height: 2rem;
`;

function Pagination() {
  const tabsInfo = useTabsInfo();
  const { tab, page } = useParams();
  const navigate = useNavigate();

  const currentPage = page ? parseInt(page) - 1 : 0;

  const handlePageClick = useCallback(
    ({ selected }: { selected: number }) => {
      const nextPage = selected + 1;
      navigate(`/${tab}/${nextPage}`);
    },
    [navigate, tab]
  );

  const { pageCount } = tabsInfo[tab as Tab];

  if (pageCount < 2) {
    return <PaginationPlaceholder />;
  }
  return (
    <ReactPaginate
      forcePage={currentPage}
      pageCount={pageCount} // Total number of pages
      onPageChange={handlePageClick}
      pageRangeDisplayed={3} // How many pages around selected, more or less
      marginPagesDisplayed={2} // How many pages before / after the break(s)
      containerClassName="pagination"
      activeClassName="active"
      pageClassName="page-item"
      pageLinkClassName="page-link"
      previousLabel="<"
      previousClassName="page-item"
      previousLinkClassName="page-link"
      breakLabel="..."
      breakClassName="page-item"
      breakLinkClassName="page-link"
      nextLabel=">"
      nextClassName="page-item"
      nextLinkClassName="page-link"
    />
  );
}

export default Pagination;
