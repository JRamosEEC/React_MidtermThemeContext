const Button = ({ label, onClick, style }) => {
  return (
    <div id="btn" style={{backgroundColor: style}} className="btn btn-primary" onClick={onClick}>
      {label}
    </div>
  );
};

export default Button;
