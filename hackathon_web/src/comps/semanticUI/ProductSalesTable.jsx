import React from 'react';
import PropTypes from 'prop-types';
import { Icon, Table } from 'semantic-ui-react';
import ProdSales from '../../data/MOCKDATA_DAYSALE.json';

class ProductSalesTable extends React.Component {
  constructor( props ) {
    super( props );
    this.state = {
      prodSalesData: props.salesData || ProdSales,
      tableStyle: {
        tableTitle: 'Product Sales Revenue',
        columnNum: 4,
        celled: false,
        striped: true
      },
      cellStyle: {
        collapsing: true,
        textAlign: 'center'
      }
    }
    this.eachRow = this.eachRow.bind(this);
    this.clickTableRow = this.clickTableRow.bind(this);
  }

  clickTableRow(e) {
    console.log('Click Table Row: ', e);
  }

  eachRow( row, i ) {
    const rowID = `rowIdex_${i}`;
    return (
    <Table.Row
      key={i}
      id={rowID}
      onClick={this.clickTableRow} >
      <Table.Cell collapsing={this.state.cellStyle.collapsing}>
        <Icon name={row.UNIT_THIS > 100 ? "folder" : 'file outline'}/> {row.ITEM_ID} / {row.ITEM_DESC}
      </Table.Cell>
      <Table.Cell textAlign={this.state.cellStyle.textAlign}>{row.UNIT_THIS}</Table.Cell>
      <Table.Cell textAlign={this.state.cellStyle.textAlign}>$ {row.REVENUE_THIS}</Table.Cell>
      <Table.Cell textAlign={this.state.cellStyle.textAlign}>$ {row.REVENUE_LAST}</Table.Cell>
      {/* <Table.Cell collapsing={this.state.cellStyle.collapsing} textAlign='right'>{row.REVENUE_LAST}</Table.Cell> */}
    </Table.Row> );
  }

  render() {
    return (
    <Table celled={this.state.tableStyle.celled} striped={this.state.tableStyle.striped}>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell colSpan={this.state.tableStyle.columnNum}>{this.state.tableStyle.tableTitle}</Table.HeaderCell>
        </Table.Row>
        <Table.Row>
          <Table.HeaderCell>Product Name</Table.HeaderCell>
          <Table.HeaderCell textAlign={this.state.cellStyle.textAlign}>Unit Sales (2018)</Table.HeaderCell>
          <Table.HeaderCell textAlign={this.state.cellStyle.textAlign}>Sales Revenue(2018)</Table.HeaderCell>
          <Table.HeaderCell textAlign={this.state.cellStyle.textAlign}>Sales Revenue(2017)</Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {this.state.prodSalesData.map( this.eachRow )}
      </Table.Body>
    </Table>);
  }
}

ProductSalesTable.propTypes = {
  salesData: PropTypes.array || []
}

export default ProductSalesTable;
