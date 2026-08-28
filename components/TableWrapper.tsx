const TableWrapper = ({ children }) => {
  return (
    <div
      className="w-full overflow-x-auto focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
      role="region"
      aria-label="Scrollable table"
      tabIndex={0}
    >
      <table>{children}</table>
    </div>
  )
}

export default TableWrapper
