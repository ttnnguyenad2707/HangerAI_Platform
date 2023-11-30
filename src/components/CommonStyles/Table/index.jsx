import React, { useCallback, useMemo } from "react"
import CommonStyles from ".."
import CommonIcons from "../../CommonIcons"
import { Checkbox } from "@mui/material"

const columns = [
  {
    id: "title",
    title: "Title",
    width: 300,
  },
  {
    id: "type",
    title: "Type",
    renderContent: (props) => {
      return (
        <CommonStyles.Box
          sx={{
            padding: "5px 15px",
            borderRadius: "8px",
            border: "solid .5px #ccc",
          }}
        >
          {props.type}
        </CommonStyles.Box>
      )
    },
  },
  {
    id: "dateCreated",
    renderTitle: (props) => {
      return <CommonStyles.Box>Date created</CommonStyles.Box>
    },
    isTextOverFlow: true,
    sortable: true,
  },
  {
    id: "lastEdited",
    title: "Last edited",
    isTextOverFlow: true,
    sortable: true,
  },
  {
    id: "wordCount",
    title: "Word count",
    renderContent: (props) => {
      return (
        <CommonStyles.Box
          centered
          sx={{ gap: "10px", justifyContent: "start" }}
        >
          <CommonIcons.Stats />

          <CommonStyles.Typography>{props.wordCount}</CommonStyles.Typography>
        </CommonStyles.Box>
      )
    },
    sortable: true,
  },
]

const data = [
  {
    id: Math.random() * 1000000,
    title: "Welcome to HangerAI",
    type: "Document",
    dateCreated: new Date().toString(),
    lastEdited: new Date().toString(),
    wordCount: 435,
  },
  {
    id: Math.random() * 1000000,
    title: "Welcome to HangerAI",
    type: "Document",
    dateCreated: new Date().toString(),
    lastEdited: new Date().toString(),
    wordCount: 435,
  },
  {
    id: Math.random() * 1000000,
    title: "Welcome to HangerAI",
    type: "Document",
    dateCreated: new Date().toString(),
    lastEdited: new Date().toString(),
    wordCount: 435,
  },
  {
    id: Math.random() * 1000000,
    title: "Welcome to HangerAI",
    type: "Document",
    dateCreated: new Date().toString(),
    lastEdited: new Date().toString(),
    wordCount: 435,
  },
]

const TableContent = ({
  rowData,
  calculateTemplate,
  columns,
  hasCheckbox,
  isOdd,
}) => {
  //! State

  //! Function

  //! Render
  return (
    <CommonStyles.Box
      sx={{
        display: "grid",
        gridTemplateColumns: calculateTemplate,
        background: isOdd ? "#f2f4f7" : "#fff",
        cursor: "pointer",
      }}
    >
      {hasCheckbox && (
        <CommonStyles.Box centered sx={{ padding: "16px" }}>
          <Checkbox sx={{ padding: "0" }} />
        </CommonStyles.Box>
      )}
      {columns.map((column) => {
        if (column?.renderContent)
          return (
            <CommonStyles.Box
              key={column.id}
              sx={{
                padding: "16px",
                alignItems: "center",
                display: "flex",
                maxHeight: "64px",
              }}
            >
              {column.renderContent(rowData)}
            </CommonStyles.Box>
          )

        return (
          <CommonStyles.Box
            key={column.id}
            sx={{
              padding: "16px",
              maxHeight: "64px",
              alignItems: "center",
              display: column?.isTextOverFlow ? "unset" : "flex",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {rowData[column.id]}
          </CommonStyles.Box>
        )
      })}
    </CommonStyles.Box>
  )
}

const Table = ({ hasCheckbox, filters, handleChangeSort }) => {
  //! State
  const { sortBy, sortDirection, page } = filters || {}
  const calculateTemplate = useMemo(() => {
    let template = hasCheckbox ? "80px" : ""

    columns.forEach((item) => {
      if (item.width && item.width > 0) {
        template += " " + item.width + "px"
      } else {
        template += " 1fr"
      }
    })

    return template
  }, [columns, hasCheckbox])

  //! Function

  //! Render
  const renderSort = useCallback(() => {
    if (!sortBy || !sortDirection) return null

    return (
      <CommonIcons.Up
        style={{
          transform:
            sortDirection.toLowerCase() === "desc"
              ? "rotate(180deg)"
              : "rotate(0deg)",
          transition: "all .15s ease-in",
        }}
      />
    )
  }, [sortBy, sortDirection])

  return (
    <CommonStyles.Box
      sx={{
        width: "100%",
      }}
    >
      <CommonStyles.Box
        sx={{
          display: "grid",
          gridTemplateColumns: calculateTemplate,
          borderRadius: "8px",
          background: "#fff",
          marginBottom: "15px",
          boxShadow: "0px 2px 6px rgba(100, 116, 139, 0.12)",
          border: "1px solid #EAECF0",
        }}
      >
        {hasCheckbox && (
          <CommonStyles.Box centered sx={{ padding: "16px" }}>
            <Checkbox sx={{ padding: "0" }} />
          </CommonStyles.Box>
        )}
        {columns.map((item) => {
          return (
            <CommonStyles.Box
              key={item.id}
              sx={{
                padding: "16px",
                gap: "10px",
                display: "flex",
                alignItems: "center",
                cursor: item?.sortable ? "pointer" : "",
              }}
              onClick={() => {
                if (item?.sortable) {
                  handleChangeSort(item.id)
                }
              }}
            >
              {item?.renderTitle ? item.renderTitle(item, data) : item.title}

              {sortBy === item.id && renderSort()}
            </CommonStyles.Box>
          )
        })}
      </CommonStyles.Box>

      <CommonStyles.Box
        sx={{
          display: "flex",
          flexDirection: "column",
          boxShadow: "0px 2px 6px rgba(100, 116, 139, 0.12)",
          border: "1px solid #EAECF0",
        }}
      >
        {data.map((rowData, index) => {
          return (
            <TableContent
              rowData={rowData}
              calculateTemplate={calculateTemplate}
              key={rowData.id}
              columns={columns}
              hasCheckbox={hasCheckbox}
              isOdd={index % 2 === 1}
            />
          )
        })}
      </CommonStyles.Box>
    </CommonStyles.Box>
  )
}

export default Table