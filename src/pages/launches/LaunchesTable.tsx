import React from "react";
import { IconType } from "react-icons";
import { FaVideo, FaWikipediaW } from "react-icons/fa";
import { MdOutlineArticle } from "react-icons/md";
import { Launch } from "../../api/models/Launch";
import { Modal } from "../../components/modal/Modal";
import { Table } from "../../components/table/Table";
import { DateUtils } from "../../utils/DateUtils";
import { LaunchCard } from "./LaunchCard";
import "./LaunchesTable.css";

interface Props {
  launches: Launch[],
}

interface State {
  showingLaunch?: Launch;
}

export class LaunchesTable extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);
    this.state = {
      showingLaunch: undefined,
    };
  }

  openModal(launch: Launch) {
    this.setState({ showingLaunch: launch });
  }

  closeModal() {
    this.setState({ showingLaunch: undefined });
  }

  renderLaunchName(launch: Launch) {
    return <button onClick={() => this.openModal(launch)}>{launch.name}</button>;
  }

  renderMediaLink(Icon: IconType, href: string | undefined) {
    return <a target="_blank" rel="noreferrer" 
      style={{ visibility: !!href ? "visible" : "hidden" }}
      href={href} 
    >
      <Icon />
    </a>;
  }

  renderMediaLinks(launch: Launch) {
    return [
      this.renderMediaLink(MdOutlineArticle, launch.articleLink),
      this.renderMediaLink(FaVideo, launch.webcastLink),
      this.renderMediaLink(FaWikipediaW, launch.wikipediaLink),
    ];
  }

  render() {
    const { launches } = this.props;
    const { showingLaunch } = this.state;
    return (
      <>
        <Table headers={["Nome", "Data", "Links"]}
          rows={launches.map(launch => [
            () => this.renderLaunchName(launch),
            DateUtils.dateToString(launch.date),
            () => this.renderMediaLinks(launch),
          ])}
        ></Table>

        <Modal show={!!showingLaunch} onClose={() => this.closeModal()}>
          <LaunchCard launch={showingLaunch!}></LaunchCard>
        </Modal>
      </>
    );
  }

}