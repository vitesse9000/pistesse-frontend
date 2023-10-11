const Spinner = ({ className = '' }: { className?: string }) => (
  <div className={`d-flex justify-content-center ${className}`}>
    <div className="spinner-border" role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
  </div>
);

export default Spinner;
