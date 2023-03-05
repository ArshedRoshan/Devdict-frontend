import "./sidebarLink.css";

function SidebarLink({ text }) {
  return(
    <div className="link" >
        <h5>{text}</h5>
    </div>
  );
}
export default SidebarLink;