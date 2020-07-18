import React, { useEffect, useState } from "react";
import MaterialTable from "material-table";
import axios from "axios";
import { COMMISSION_RATE_API_URL } from "../apiconfig";

import { forwardRef } from "react";

import AddBox from "@material-ui/icons/AddBox";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Edit from "@material-ui/icons/Edit";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => (
    <ChevronRight {...props} ref={ref} />
  )),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => (
    <ChevronLeft {...props} ref={ref} />
  )),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
};

const CommissionRatesTable = () => {
  const { useState } = React;

  const [columns, setColumns] = useState([
    {
      title: "Rate name",
      field: "rateName",
    },
    {
      title: "Lower bound",
      field: "lowerBoundAchievement",
      type: "numeric",
    },
    { title: "Upper bound", field: "upperBoundAchievement", type: "numeric" },
    {
      title: "Base rate",
      field: "commissionBase",
      type: "numeric",
    },
    {
      title: "Commission rate",
      field: "commissionRate",
      type: "numeric",
    },
  ]);
  const [data, setData] = useState([]);

  // Get the list of commission rates currently stored
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(COMMISSION_RATE_API_URL);
      const data = result.data;
      const sortedData = data.sort(
        (a, b) => a.lowerBoundAchievement - b.lowerBoundAchievement
      );

      setData(sortedData);
    };

    fetchData();
  }, []);

  const addRow = (newData) => {
    console.log("Add row, new data:");
    console.log(newData);
    return new Promise(async (resolve, reject) => {
      const resp = await axios.post(COMMISSION_RATE_API_URL, newData);
      if (resp.status === 200) {
        setData([...data, newData]);
        resolve();
      } else {
        // CREATE SNACKBAR ERROR
        console.log("ERROR HERE SAVING");
        reject();
      }
    });
  };

  const updateRow = (newData, oldData) => {
    console.log("Update row");
    console.log(newData);
    console.log(oldData);

    return new Promise(async (resolve, reject) => {
      const rateId = oldData.id;
      const resp = await axios.put(
        `${COMMISSION_RATE_API_URL}/${rateId}`,
        newData
      );
      if (resp.status === 200) {
        const dataUpdate = [...data];
        const index = oldData.tableData.id;
        dataUpdate[index] = newData;
        setData([...dataUpdate]);

        resolve();
      } else {
        reject();
      }
    });
  };

  const deleteRow = (oldData) => {
    const rateId = oldData.id;
    return new Promise(async (resolve, reject) => {
      const resp = await axios.delete(`${COMMISSION_RATE_API_URL}/${rateId}`);
      if (resp.status === 200) {
        const dataDelete = [...data];
        const index = oldData.tableData.id;
        dataDelete.splice(index, 1);
        setData([...dataDelete]);
        resolve();
      } else {
        reject();
      }
    });
  };

  return (
    <MaterialTable
      title="Commission Rates"
      columns={columns}
      icons={tableIcons}
      data={data}
      editable={{
        onRowAdd: (newData) => addRow(newData),
        onRowUpdate: (newData, oldData) => updateRow(newData, oldData),
        onRowDelete: (oldData) => deleteRow(oldData),
      }}
    />
  );
};

export default CommissionRatesTable;
