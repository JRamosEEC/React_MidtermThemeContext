// Display a list of posts
const Loading = () => {
    return (
        <div style={{ display:'flex', justifyContent:'center' }}>
            <div className="semipolar-spinner">
                <div className="ring"></div>
                <div className="ring"></div>
                <div className="ring"></div>
                <div className="ring"></div>
                <div className="ring"></div>
            </div>
        </div>
    );
};
  
export default Loading;