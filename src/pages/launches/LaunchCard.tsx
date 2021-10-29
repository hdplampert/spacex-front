import { IoIosCheckmarkCircle, IoIosCloseCircle } from 'react-icons/io';
import { Launch } from "../../api/models/Launch";
import launchPatchImg from "../../assets/images/launch-patch.png";
import { Card } from "../../components/card/Card";
import { DateUtils } from "../../utils/DateUtils";
import "./LaunchCard.css";

interface Props {
  launch: Launch
}

function renderLaunchStatusIcon(launch: Launch) {
  if (launch.success === true) {
    return <IoIosCheckmarkCircle style={{ color: "#055e05" }} title="Bem-sucedido"/>;
  } else if (launch.success === false) {
    return <IoIosCloseCircle style={{ color: "#d50000" }} title="Malsucedido"/>;
  }
}

function renderLaunchCard(launch: Launch) {
  const patchImgSrc = launch.patchLink || launchPatchImg;
  return (
    <div className="LaunchCard">
      <div className="LaunchCard-patchContainer">
        <img className="LaunchCard-patch" 
          src={patchImgSrc} />
        <span className="LaunchCard-launchStatusIcon">
          {renderLaunchStatusIcon(launch)}
        </span>
      </div>
      <div className="LaunchCard-info">
        <p className="LaunchCard-launchName">{ launch.name }</p>
        <p>{ DateUtils.dateToString(launch.date) }</p>
        <p>{ launch.details }</p>
      </div>
    </div>
  );
}

export function LaunchCard(props: Props) {
  const { launch } = props;
  return (
    <Card>
      {launch ? renderLaunchCard(launch) : undefined}
    </Card>
  )
}
