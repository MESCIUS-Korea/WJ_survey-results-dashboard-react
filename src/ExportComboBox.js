import ReactDOM from 'react-dom/client';
import React, { useEffect, useRef, useState } from 'react';
import useEvent from 'react-use-event-hook';
import * as wjcCore from '@mescius/wijmo';
import * as wjGrid from '@mescius/wijmo.grid';
import * as wjInput from '@mescius/wijmo.react.input';
import * as wjGridXlsx from '@mescius/wijmo.grid.xlsx';
import './style.css';
import { FlexGridPdfConverter } from '@mescius/wijmo.grid.pdf';

export default function ExportCombo(props) {
  const combo = useRef(null);

  const initializedCombo = useEvent((s) => {
    combo.current = s;
  });

  const gridExport = (s, e) => {
    if (s.selectedIndex === 0) {
      // 엑셀 내보내기
      wjGridXlsx.FlexGridXlsxConverter.saveAsync(
        props.grid,
        {
          includeColumnHeaders: true,
          includeStyles: false,
        },
        'FlexGrid.xlsx' // filename
      );
    } else if (s.selectedIndex === 1) {
      // PDF 내보내기
      FlexGridPdfConverter.export(props.grid, 'FlexGrid.pdf', {
        documentOptions: {
          header: {
            declarative: {
              text: '\t&[Page]\\&[Pages]',
            },
          },
          footer: {
            declarative: {
              text: '\t&[Page]\\&[Pages]',
            },
          },
        },
        embeddedFonts: [
          {
            source: 'https://assets.codepen.io/975719/BMHANNAPro.ttf',
            name: 'BMHANNAPro',
            style: 'normal',
            weight: 'normal',
            sansSerif: true,
          },
        ],
        styles: {
          cellStyle: {
            backgroundColor: '#ffffff',
            borderColor: '#c6c6c6',
            font: {
              family: 'BMHANNAPro',
            },
          },
          altCellStyle: {
            backgroundColor: '#f9f9f9',
          },
          groupCellStyle: {
            backgroundColor: '#dddddd',
          },
          headerCellStyle: {
            backgroundColor: '#eaeaea',
          },
        },
      });
    } else if (s.selectedIndex === 2) {
      // 프린팅하기
      let doc = new wjcCore.PrintDocument({
        title: 'PrintDocument Test',
        copyCss: false, // prevent cross-origin issues in jsfiddle
      });
      // add CSS explicitly (since we can't use copyCss in jsfiddle)
      doc.append(
        '<link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" rel="stylesheet">'
      );
      doc.append(
        '<link href="https://cdn.mescius.com/wijmo/5.20241.19/styles/wijmo.min.css" rel="stylesheet">'
      );
      // add some simple text
      doc.append('<h1>Printing Example</h1>');
      let tbl = renderTable();
      doc.append(tbl);
      // print the document
      doc.print();
    }
    if (combo.current) {
      combo.current.selectedIndex = -1;
    }
  };

  // renders grid as a table
  const renderTable = () => {
    // start table
    let tbl = '<table>';
    // headers
    if (props.grid.headersVisibility & wjGrid.HeadersVisibility.Column) {
      tbl += '<thead>';
      for (let r = 0; r < props.grid.columnHeaders.rows.length; r++) {
        tbl += renderRow(props.grid.columnHeaders, r);
      }
      tbl += '</thead>';
    }
    // body
    tbl += '<tbody>';
    for (let r = 0; r < props.grid.rows.length; r++) {
      tbl += renderRow(props.grid.cells, r);
    }
    tbl += '</tbody>';
    // done
    tbl += '</table>';
    return tbl;
  };
  const renderRow = (panel, r) => {
    let tr = '',
      row = panel.rows[r];
    if (row.renderSize > 0) {
      tr += '<tr>';
      for (let c = 0; c < panel.columns.length; c++) {
        let col = panel.columns[c];
        if (col.renderSize > 0) {
          // get cell style, content
          let style =
            'width:' +
            col.renderSize +
            'px;' +
            'text-align:' +
            col.getAlignment() +
            ';' +
            'padding-right: 6px';
          let content = panel.getCellData(r, c, true);
          if (!row.isContentHtml && !col.isContentHtml) {
            content = wjcCore.escapeHtml(content);
          }
          // add cell to row
          if (panel.cellType == wjGrid.CellType.ColumnHeader) {
            tr += '<th style="' + style + '">' + content + '</th>';
          } else {
            // show boolean values as checkboxes
            let raw = panel.getCellData(r, c, false);
            if (raw === true) {
              content = '&#9745;';
            } else if (raw === false) {
              content = '&#9744;';
            }
            tr += '<td style="' + style + '">' + content + '</td>';
          }
        }
      }
      tr += '</tr>';
    }
    return tr;
  };

  return (
    <wjInput.ComboBox
      className="export-comboBox"
      isEditable={false}
      isRequired={false}
      selectedIndex={-1}
      displayMemberPath="text"
      selectedValuePath="index"
      placeholder="그리드 내보내기 옵션"
      itemsSource={exportComboData()}
      initialized={initializedCombo}
      selectedIndexChanged={gridExport}
    />
  );
}

function exportComboData() {
  return [
    { index: 0, value: 'excel', text: '엑셀로 내보내기' },
    { index: 1, value: 'pdf', text: 'PDF로 내보내기' },
    { index: 2, value: 'print', text: '프린트하기' },
  ];
}
