import { Table } from "antd";
import { map } from "lodash";
import moment from "moment";
import React, { PureComponent } from "react";
import { PriceRecordTableDto } from "./priceRecordTable.dto";

export default class PriceRecordsTable extends PureComponent<PriceRecordTableDto> {
  static Columns = [
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "SW Code", dataIndex: "swCode", key: "swCode" },
    { title: "Price", dataIndex: "price", key: "price" },
    { title: "Reported At", dataIndex: "reportedAtTimestamp", key: "reportedAtTimestamp" },
  ];

  render() {
    const { props } = this;
    const { priceRecords } = props;
    const parsedData = map(priceRecords, (item) => ({
      ...item,
      reportedAtTimestamp: moment(item.reportedAt, moment.ISO_8601).fromNow(),
    }));

    return <Table dataSource={parsedData} columns={PriceRecordsTable.Columns} rowKey={"id"} />;
  }
}
