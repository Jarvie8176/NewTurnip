import { PriceRecord } from "@turnip-market/dtos";
import React, { PureComponent } from "react";
import PriceRecordsRepository from "./priceRecords.repository";
import PriceRecordsTable from "./table.component";

interface IState {
  priceRecords: PriceRecord.Type[];
}

export default class PriceRecords extends PureComponent<{}, IState> {
  priceRecordsRepository = new PriceRecordsRepository();

  state = {
    priceRecords: [],
  };
  componentDidMount(): void {
    const { priceRecordsRepository } = this;
    // load data

    console.log("loading data");

    (async () => {
      const { priceRecords } = await priceRecordsRepository.fetchAll();
      this.setState({ priceRecords });
    })().catch(console.error);

    //  .catch(NotificationManager.ShowError);
  }

  render() {
    const { priceRecords } = this.state;

    return (
      <div>
        <PriceRecordsTable priceRecords={priceRecords} />
      </div>
    );
  }
}
