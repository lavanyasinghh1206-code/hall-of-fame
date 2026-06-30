import "./Frame.css";

function Frame({ onClick }) {
  return (
    <div className="frame" onClick={onClick}>
      <div className="stage-light"></div>
      <div className="photo"></div>
      <h3>Founder</h3>
    </div>
  );
}

export default Frame;