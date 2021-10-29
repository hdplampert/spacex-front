
import "./Section.css";

interface Props {
  onClick: Function;
  expanded?: boolean;
  title: string;
  loading?: boolean;
}

export const Section: React.FunctionComponent<Props> = (props) => {
  const { expanded, onClick, title, loading } = props;
  return (
    <div className={`Section ${ loading ? "" : (expanded ? "expanded" : "") }`}>
      <h1 className="Section-title" 
        onClick={() => onClick()}>
        {title}
        {loading ? <div className="loader"></div> : ""}
      </h1>
      <div className="Section-content">
        {loading ? "" : props.children}
      </div>
    </div>
  );
}