import React from "react";
import { Launch } from "../../api/models/Launch";
import { LaunchService } from "../../api/services/LaunchService";
import { Section } from "../../components/section/Section";
import { GlobalContext } from "../../context/global";
import { LaunchesTable } from "./LaunchesTable";
import "./UpcomingLaunches.css";

interface Props {
}

interface State {
  upcomingLaunches: Launch[],
  loading?: boolean,
}

export class UpcomingLaunches extends React.Component<Props, State> {
  
  service = new LaunchService(); // TODO injeção
  firstClick?: boolean;
  
  static contextType = GlobalContext;
  context!: React.ContextType<typeof GlobalContext>

  constructor(props: Props) {
    super(props);
    this.state = {
      upcomingLaunches: [],
      loading: undefined,
    };
  }

  async loadLaunches() {
    this.setState({ loading: true });
    const upcomingLaunches = await this.service.getUpcomingLaunches();
    upcomingLaunches.sort((a,b) => a.date!.getTime() - b.date!.getTime());
    this.setState({ upcomingLaunches, loading: false });
  }

  async handleOnClick() {
    const { setState: setContextState } = this.context;
    if (!this.firstClick) {
      this.firstClick = true;
      await this.loadLaunches();
    }
    setContextState({ expandedSection: "upcoming-launches" });
  }

  render() {
    const { loading } = this.state;
    const { state: { expandedSection } } = this.context;
    const expanded = (expandedSection === "upcoming-launches");
    return (
      <Section title="Lançamentos futuros"
        loading={loading}
        expanded={expanded}
        onClick={() => this.handleOnClick()}
      >
        <LaunchesTable launches={this.state.upcomingLaunches}></LaunchesTable>
      </Section>
    );
  }
}