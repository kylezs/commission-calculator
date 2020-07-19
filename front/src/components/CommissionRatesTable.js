import React, { useEffect, useState } from "react";
import MaterialTable from "material-table";
import axios from "axios";
import { COMMISSION_RATE_API_URL } from "../apiconfig";
import ErrorSnackbar from "./ErrorSnackbar";

import { forwardRef } from "react";

// Required for material-table
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
  const [columns] = useState([
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
  const [error, setError] = useState("");

  const sortByLower = (data) => {
    const sortedData = data.sort(
      (a, b) => a.lowerBoundAchievement - b.lowerBoundAchievement
    );
    return sortedData;
  };

  const sortAndReturnLowestUpperBound = (data) => {
    const sortedData = sortByLower(data);
    const last = sortedData[sortedData.length - 1];
    return last.upperBoundAchievement;
  };

  // Get the list of commission rates currently stored, to populate the table
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(COMMISSION_RATE_API_URL);
      const data = result.data;
      const sortedData = sortByLower(data);
      setData(sortedData);
    };

    fetchData();
  }, []);

  const allFieldsPresent = (newData) => {
    const fields = [
      "rateName",
      "lowerBoundAchievement",
      "upperBoundAchievement",
      "commissionBase",
      "commissionRate",
    ];
    let validObject = true;
    fields.forEach((field) => {
      if (!(field in newData)) {
        validObject = false;
      }
    });
    return validObject;
  };

  const validateNewRow = (newData) => {
    // All fields must be present

    if (!allFieldsPresent(newData)) {
      setError("All fields are required");
      return false;
    }
    const lowestUpperBound = sortAndReturnLowestUpperBound(data);
    if (newData.lowerBoundAchievement !== lowestUpperBound) {
      setError(`The lower bound must be equal to ${lowestUpperBound}`);
      return false;
    } else if (newData.upperBoundAchievement < newData.lowerBoundAchievement) {
      setError("The upper bound must be greater than the lower bound");
      return false;
    } else if (newData.upperBoundAchievement > 99.99) {
      setError("The upper bound cannot be greater than 99.99");
      return false;
    }
    return true;
  };

  const addRow = (newData) => {
    return new Promise((resolve, reject) => {
      if (!validateNewRow(newData)) {
        // Errors captured in the function itself
        reject();
        return;
      }
      axios
        .post(COMMISSION_RATE_API_URL, newData)
        .then((resp) => {
          console.log(resp.data.id);
          newData.id = resp.data.id;
          setData([...data, newData]);
          resolve();
        })
        .catch((err) => {
          setError(err);
          reject();
        });
    });
  };

  // Find the fields that have been changed
  const getChangedFields = (newData, oldData) => {
    let changedFields = [];
    for (let key in newData) {
      if (newData[key] !== oldData[key]) {
        changedFields.push(key);
      }
    }
    return changedFields;
  };

  const updateRow = (newData, oldData) => {
    const changedFields = getChangedFields(newData, oldData);

    return new Promise((resolve, reject) => {
      const index = oldData.tableData.id;

      // If it's not the last element, only allow editing of non-range fields
      if (index !== data.length - 1) {
        if (
          changedFields.includes("lowerBoundAchievement") ||
          changedFields.includes("upperBoundAchievement")
        ) {
          setError(
            "You can only edit the ranges of the last entry. To keep continuity."
          );
          reject();
          return;
        }
      }
      const rateId = oldData.id;
      axios
        .put(`${COMMISSION_RATE_API_URL}/${rateId}`, newData)
        .then((resp) => {
          const dataUpdate = [...data];
          const index = oldData.tableData.id;
          dataUpdate[index] = newData;
          setData([...dataUpdate]);
          resolve();
        })
        .catch((err) => {
          setError(err);
          reject();
        });
    });
  };

  const deleteRow = (oldData) => {
    const rateId = oldData.id;
    return new Promise((resolve, reject) => {
      const index = oldData.tableData.id;
      if (index !== data.length - 1) {
        setError("You can only delete the last entry. To keep continuity.");
        reject();
        return;
      }
      axios
        .delete(`${COMMISSION_RATE_API_URL}/${rateId}`)
        .then((resp) => {
          const dataDelete = [...data];
          dataDelete.splice(index, 1);
          setData([...dataDelete]);
          resolve();
        })
        .catch((err) => {
          setError(`Error: ${err}`);
          reject();
        });
    });
  };

  return (
    <>
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
      <ErrorSnackbar error={error} setError={setError} />
    </>
  );
};

export default CommissionRatesTable;
