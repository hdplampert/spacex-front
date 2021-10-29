import React from "react";
import { Launch } from "../../api/models/Launch";
import { LaunchService } from "../../api/services/LaunchService";
import { Section } from "../../components/section/Section";
import { GlobalContext } from "../../context/global";
import { LaunchesTable } from "./LaunchesTable";
import "./PastLaunches.css";

interface Props {
}

interface State {
  pastLaunches: Launch[],
  loading?: boolean,
}

export class PastLaunches extends React.Component<Props, State> {
  
  service = new LaunchService(); // TODO injeção
  firstClick?: boolean;
  
  static contextType = GlobalContext;
  context!: React.ContextType<typeof GlobalContext>

  constructor(props: Props) {
    super(props);
    this.state = {
      pastLaunches: [],
      loading: false,
    };
  }

  async loadPastLaunches() {
    this.setState({ loading: true });
    const pastLaunches = await this.service.getPastLaunches();
    pastLaunches.sort((a,b) => b.date!.getTime() - a.date!.getTime());
    this.setState({ pastLaunches, loading: false });
  }

  async handleOnClick() {
    const { setState: setContextState } = this.context;
    if (!this.firstClick) {
      this.firstClick = true;
      await this.loadPastLaunches();
    }
    setContextState({ expandedSection: "past-launches" });
  }

  render() {
    const { loading } = this.state;
    const { state: { expandedSection } } = this.context;
    const expanded = (expandedSection === "past-launches");
    return (
      <Section title="Lançamentos passados"
        loading={loading}
        expanded={expanded}
        onClick={() => this.handleOnClick()}
      >
        <LaunchesTable launches={this.state.pastLaunches}></LaunchesTable>
      </Section>
    );
  }
}