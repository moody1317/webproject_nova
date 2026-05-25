import './pagination.css';

function Pagination({page, setPage, totalCount, limit}) {
    const totalPage = Math.ceil(totalCount / limit)

    // << 클릭
    const onFirstPage = () => {
        setPage(1);
    }

    // < 클릭
    const onPrevPage = () => {
        if (page == 1) {
            return;
        }
        setPage((prev) => prev - 1);
    }

    // >> 클릭
    const onLastPage = () => {
        setPage(totalPage);
    }

    // > 클릭
    const onNextPage = () => {
        if (page == totalPage) {
            return;
        }
        setPage((prev) => prev + 1);
    }

    let startPage = Math.max(1, page - 2);
    let lastPage = Math.min(totalPage, startPage + 4);
    if (lastPage - startPage < 4) {
        startPage = Math.max(1, lastPage - 4);
    }

    const pageNumbers = Array.from({ length: lastPage - startPage + 1}, (_, i) => (startPage + i))

    const pageList = pageNumbers.map((pageNum) => (
        <button onClick={() => setPage(pageNum)} className={pageNum === page ? "pageNumber curPage" : "pageNumber"} key={pageNum}>
            {pageNum}
        </button>
    ))
    return (
        <section className="pagination">
            <div className="go" onClick={ onFirstPage }>
                <i className="bi bi-chevron-double-left"></i>
            </div>
            <div className="go" onClick={ onPrevPage }>
                <i className="bi bi-chevron-left"></i>
            </div>
            { pageList }
            <div className="go" onClick={ onNextPage }>
                <i className="bi bi-chevron-right"></i>
            </div>
            <div className="go">
                <i className="bi bi-chevron-double-right" onClick={ onLastPage }></i>
            </div>
        </section>
    )
}

export default Pagination;